import { Rating, Stack, Text } from "@mantine/core";
import React from "react";
import { trpc } from "../utils/trpc";
import { useRate } from "../hooks/useRate";

const ReviewRating = ({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string;
}) => {
  const { data: currentUserRating } =
    trpc.rating.getUserRatingByReview.useQuery({ reviewId, userId });

  const { handleRateReview } = useRate();

  console.log(currentUserRating?.rating);
  return (
    <Stack spacing={8}>
      <Text>How would you rate it?</Text>
      <Rating
        defaultValue={7}
        size="xl"
        count={5}
        value={currentUserRating?.rating}
        onChange={(rating) =>
          handleRateReview(rating, reviewId, currentUserRating?.id)
        }
      />
    </Stack>
  );
};

export default ReviewRating;
