import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import cuid from "cuid";
import { Like } from "@prisma/client";

export const useLike = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const ctx = trpc.useContext();

  const { mutate } = trpc.like.like.useMutation({
    onMutate: async ({ reviewId }) => {
      await ctx.like.getLikes.cancel({ reviewId });
      const oldLikes = ctx.like.getLikes.getData({ reviewId });
      if (oldLikes && userId) {
        const duplicateLike = oldLikes.find((like) => like.userId === userId);
        let newLikes: Like[];
        if (duplicateLike) {
          newLikes = oldLikes.filter((like) => like.userId !== userId);
        } else {
          newLikes = [...oldLikes, { id: cuid(), reviewId: reviewId, userId }];
        }

        ctx.like.getLikes.setData({ reviewId }, newLikes);
      }
      return { oldLikes };
    },
    onSuccess: () => {
      ctx.like.getLikes.invalidate();
    },
  });

  const handleLikeReview = (reviewId: string) => {
    mutate({ reviewId });
  };

  return { handleLikeReview };
};
