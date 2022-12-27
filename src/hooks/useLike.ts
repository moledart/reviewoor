import { useSession } from "next-auth/react";
import { ReviewCardProps } from "../pages";
import { trpc } from "../utils/trpc";
import { useQueryClient } from "@tanstack/react-query";
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
    onError: (error, variables, context) => {
      if (context?.oldLikes)
        ctx.like.getLikes.setData(
          { reviewId: variables.reviewId },
          context.oldLikes
        );
    },
    onSettled: () => {
      ctx.like.getLikes.invalidate();
    },

    // onMutate({ reviewId, likeId }) {
    // ctx.review.getTop.cancel();
    // const oldReviews = ctx.review.getTop.getData();
    // const newReviews = oldReviews?.map((review) => {
    //   if (session?.user && review.id === reviewId) {
    //     if (
    //       review.like.findIndex((like) => like.userId === session?.user?.id) >
    //       0
    //     ) {
    //       return {
    //         ...review,
    //         _count: { like: review._count.like - 1 },
    //         like: review.like.filter(
    //           (like) => like.userId !== session?.user?.id
    //         ),
    //       };
    //     } else {
    //       return {
    //         ...review,
    //         _count: { like: review._count.like + 1 },
    //         like: [
    //           ...review.like,
    //           {
    //             userId: session?.user?.id,
    //             reviewId: reviewId,
    //             id: likeId,
    //           },
    //         ],
    //       };
    //     }
    //   } else {
    //     return review;
    //   }
    // });
    // ctx.review.getTop.setData(undefined, newReviews);
    // },

    // onSuccess() {
    //   ctx.like.getLikes.invalidate();
    // },
  });

  const handleLikeReview = (reviewId: string) => {
    mutate({ reviewId });
  };

  return { handleLikeReview };
};
