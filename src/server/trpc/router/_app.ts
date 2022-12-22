import { router } from "../trpc";
import { authRouter } from "./auth";
import { reviewRouter } from "./review";
import { tagsRouter } from "./tags";

export const appRouter = router({
  tags: tagsRouter,
  auth: authRouter,
  review: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
