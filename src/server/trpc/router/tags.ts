import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const tagsRouter = router({
  create: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.tag.create({
        data: {
          name: input,
        },
      });

      return result;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany({
      take: 20,
      orderBy: {
        reviews: {
          _count: "asc",
        },
      },
    });
  }),
});
