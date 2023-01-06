import { trpc } from "../utils/trpc";

export const useReviews = () => {
  const ctx = trpc.useContext();

  const {
    data: reviews,
    isLoading,
    isError,
  } = trpc.review.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      data.forEach((review) =>
        ctx.review.getFullContentById.setData(
          { id: review.id },
          { ...review, comments: [] }
        )
      );
    },
    staleTime: Infinity,
  });

  return { reviews, isLoading, isError };
};
