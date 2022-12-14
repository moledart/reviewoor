import { Rating, Stack, Text } from "@mantine/core";
import { trpc } from "../utils/trpc";
import { useRate } from "../hooks/useRate";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../atoms/lang";

const ReviewRating = ({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string;
}) => {
  const { data: currentUserRating } =
    trpc.rating.getUserRatingByReview.useQuery(
      { reviewId, userId },
      { enabled: !!reviewId && !!userId }
    );

  const { handleRateReview } = useRate();
  const [lang] = useAtom(langSwitcherAtom);

  return (
    <Stack spacing={8}>
      <Text>
        {lang === "ru"
          ? "Как вы оцените этот обзор?"
          : "How would you rate it?"}
      </Text>
      <Rating
        defaultValue={0}
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
