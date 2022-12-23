import { trpc } from "../utils/trpc";

export const useLike = () => {
  const ctx = trpc.useContext();

  const { mutate } = trpc.like.like.useMutation({
    onSuccess() {
      ctx.review.invalidate();
    },
  });

  const handleLikeReview = (reviewId: string) => {
    mutate({ reviewId });
  };

  return { handleLikeReview };
};
