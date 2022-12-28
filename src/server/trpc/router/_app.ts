import { router } from "../trpc";
import { authRouter } from "./auth";
import { likeRouter } from "./like";
import { reviewRouter } from "./review";
import { tagsRouter } from "./tags";
import { userRatingRouter } from "./userRating";

export const appRouter = router({
  tags: tagsRouter,
  auth: authRouter,
  review: reviewRouter,
  like: likeRouter,
  rating: userRatingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
