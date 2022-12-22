import { z } from "zod";
import schema from "../schemas";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const reviewRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.review.findMany();
  }),
  create: protectedProcedure
    .input(schema.postSchema)
    .mutation(async ({ input, ctx }) => {
      const { title, reviewedPiece, group, tags, content, authorRating } =
        input;
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
        },
      });

      return result;
    }),
});
