import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRatingRouter = router({
  getUserRatingByReview: publicProcedure
    .input(z.object({ reviewId: z.string(), userId: z.string() }))
    .query(({ ctx, input }) => {
      const { reviewId, userId } = input;
      return ctx.prisma.userRating.findFirst({
        where: {
          reviewId,
          userId,
        },
      });
    }),
  rate: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
        ratingId: z.string().optional(),
        rating: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { reviewId, ratingId, rating } = input;
      if (ratingId) {
        return await ctx.prisma.userRating.update({
          where: {
            id: ratingId,
          },
          data: {
            rating,
          },
        });
      }
      return await ctx.prisma.userRating.create({
        data: {
          rating,
          reviewId,
          userId: ctx.session?.user?.id,
        },
      });
    }),
});
