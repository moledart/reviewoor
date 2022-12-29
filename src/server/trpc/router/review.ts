import { z } from "zod";
import schema from "../schemas";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const reviewRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.review.findMany({
      select: {
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getTop: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.review.findMany({
      select: {
        id: true,
      },
      take: 5,
    });
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.review.findUnique({
        where: {
          id: input.id,
        },
        select: {
          author: true,
          userRating: true,
          group: true,
          reviewedPiece: true,
          tags: true,
          authorRating: true,
          title: true,
          subtitle: true,
          thumbnail: true,
          createdAt: true,
        },
      });
    }),
  getFullContentById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.review.findUnique({
        where: {
          id: input.id,
        },
        include: {
          author: true,
          comments: true,
          group: true,
          tags: true,
          userRating: true,
        },
      });
    }),
  getByTag: publicProcedure
    .input(z.object({ tagId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.review.findMany({
        where: {
          tags: {
            some: {
              id: input.tagId,
            },
          },
        },
        select: {
          id: true,
        },
      });
    }),
  getByAuthor: publicProcedure
    .input(z.object({ authorId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.review.findMany({
        where: {
          authorId: input.authorId,
        },
        select: {
          id: true,
        },
      });
    }),
  create: protectedProcedure
    .input(schema.postSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        title,
        subtitle,
        reviewedPiece,
        group,
        tags,
        content,
        authorRating,
        thumbnail,
      } = input;
      const { value, label, authors, published, image } = reviewedPiece;
      return await ctx.prisma.review.create({
        data: {
          title,
          subtitle,
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
    }),
});
