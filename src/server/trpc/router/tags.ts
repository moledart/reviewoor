import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const tagsRouter = router({
  create: publicProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const result = await ctx.prisma.tag.create({
      data: {
        name: input,
      },
    });

    return result;
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
});
