import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";
import { initScriptLoader } from "next/script";
import { Role } from "@prisma/client";

export const userRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      include: {
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  updateRole: protectedProcedure
    .input(z.object({ id: z.string(), role: z.enum(["ADMIN", "USER"]) }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: input.role,
        },
      });
    }),
  deleteUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
