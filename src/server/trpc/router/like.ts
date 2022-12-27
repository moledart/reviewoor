import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const likeRouter = router({
  getLikes: publicProcedure
    .input(z.object({ reviewId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.like.findMany({
        where: {
          reviewId: input.reviewId,
        },
      });
    }),
  like: protectedProcedure
    .input(z.object({ reviewId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const reviewLikeByUser = await ctx.prisma.like.findFirst({
        where: {
          reviewId: input.reviewId,
          userId: ctx.session.user.id,
        },
      });
      if (reviewLikeByUser) {
        await ctx.prisma.like.delete({
          where: {
            id: reviewLikeByUser.id,
          },
        });
      } else {
        await ctx.prisma.like.create({
          data: {
            reviewId: input.reviewId,
            userId: ctx.session.user.id,
          },
        });
      }
    }),
});
