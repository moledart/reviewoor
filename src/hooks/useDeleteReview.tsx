import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

export const useDeleteReview = () => {
  const ctx = trpc.useContext();
  const { data: session } = useSession();

  const { mutate: handleDeleteReview } = trpc.review.delete.useMutation({
    onMutate: async ({ id }) => {
      await ctx.review.getByAuthor.cancel();
      if (session?.user)
        ctx.review.getByAuthor.setData({ authorId: session.user.id }, (old) =>
          old?.filter((review) => review.id !== id)
        );
    },
    onSuccess: () => {
      ctx.review.getByAuthor.invalidate();
      ctx.review.invalidate();
    },
  });

  return { handleDeleteReview };
};
