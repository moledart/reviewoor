import { z } from "zod";
import schema from "../schemas";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const reviewRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        group: true,
        tags: true,
        userRating: true,
        reviewedPiece: true,
      },
    });
  }),
  getTop: publicProcedure.query(async ({ ctx }) => {
    const groupByReview = await ctx.prisma.userRating.groupBy({
      by: ["reviewId"],
      _avg: {
        rating: true,
      },
    });

    const topReviewsIds = groupByReview
      .sort((a, b) => {
        if (a._avg.rating === null) {
          return 1;
        }

        if (b._avg.rating === null) {
          return -1;
        }

        if (a._avg.rating === b._avg.rating) {
          return 0;
        }

        return a._avg.rating < b._avg.rating ? 1 : -1;
      })
      .map((review) => review.reviewId);

    const topReviews = await Promise.all(
      topReviewsIds.map(async (id) => {
        const review = await ctx.prisma.review.findUnique({
          where: {
            id,
          },
          include: {
            author: true,
            group: true,
            tags: true,
            userRating: true,
            reviewedPiece: true,
          },
        });
        return review;
      })
    );

    return topReviews;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.review.findUnique({
        where: {
          id: input.id,
        },
        include: {
          author: true,
          group: true,
          tags: true,
          userRating: true,
          reviewedPiece: true,
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
          reviewedPiece: true,
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
        include: {
          author: true,
          group: true,
          tags: true,
          userRating: true,
          reviewedPiece: true,
        },
      });
    }),
  getByPiece: publicProcedure
    .input(z.object({ pieceId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.review.findMany({
        where: {
          reviewedPieceId: input.pieceId,
        },
        include: {
          author: true,
          group: true,
          tags: true,
          userRating: true,
          reviewedPiece: true,
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
        include: {
          author: true,
          group: true,
          tags: true,
          userRating: true,
          reviewedPiece: true,
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
