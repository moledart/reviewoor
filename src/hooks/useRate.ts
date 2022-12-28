import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import cuid from "cuid";
import { UserRating } from "@prisma/client";

export const useRate = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const ctx = trpc.useContext();

  const { mutate } = trpc.rating.rate.useMutation({
    onMutate: async ({ reviewId, rating }) => {
      if (userId) {
        await ctx.rating.getUserRatingByReview.cancel({ reviewId, userId });
        const oldRating = ctx.rating.getUserRatingByReview.getData({
          reviewId,
          userId,
        });
        console.log("oldrating", oldRating);
        let newRating: UserRating;
        if (oldRating) {
          newRating = { ...oldRating, rating };
        } else {
          newRating = { rating, reviewId, userId, id: cuid() };
        }
        console.log("newRating", newRating);
        ctx.rating.getUserRatingByReview.setData(
          { reviewId, userId },
          newRating
        );
      }
    },
    onSuccess: () => {
      ctx.rating.getUserRatingByReview.invalidate();
      ctx.review.invalidate();
    },
  });

  const handleRateReview = (
    rating: number,
    reviewId: string,
    ratingId?: string
  ) => {
    mutate({ rating, reviewId, ratingId });
  };

  return { handleRateReview };
};
