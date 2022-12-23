import { z } from "zod";
import schema from "../schemas";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const reviewRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.review.findMany({
      include: {
        comments: true,
        like: true,
        reviewedPiece: true,
        tags: true,
        group: true,
        userRating: true,
        author: true,
      },
    });
  }),
  getTop: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.review.findMany({
      include: {
        like: true,
        reviewedPiece: true,
        tags: true,
        group: true,
        userRating: true,
        author: true,
        _count: {
          select: {
            like: true,
          },
        },
      },
      take: 5,
    });
  }),
  create: protectedProcedure
    .input(schema.postSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        title,
        reviewedPiece,
        group,
        tags,
        content,
        authorRating,
        thumbnail,
      } = input;
      const { value, label, authors, published, image } = reviewedPiece;
      const result = await ctx.prisma.review.create({
        data: {
          title,
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          published: true,
          reviewedPiece: {
            connectOrCreate: {
              where: {
                value,
              },
              create: {
                value,
                label,
                authors,
                published,
                image,
              },
            },
          },
          group: {
            connectOrCreate: {
              where: {
                name: group,
              },
              create: {
                name: group,
              },
            },
          },
          tags: {
            connectOrCreate: tags?.map((tag) => {
              return {
                where: {
                  name: tag,
                },
                create: {
                  name: tag,
                },
              };
            }),
          },
          content,
          authorRating,
          thumbnail,
        },
      });

      return result;
    }),
});
