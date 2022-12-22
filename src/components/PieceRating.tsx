import { Rating, Stack, Text } from "@mantine/core";
import { useAtom } from "jotai";
import reviewForm from "../atoms/reviewFormData";

const PieceRating = () => {
  const [authorRating, setAuthorRating] = useAtom(reviewForm.authorRatingAtom);
  return (
    <Stack spacing={8}>
      <Text size="sm">How would you rate it?</Text>
      <Rating
        defaultValue={7}
        size="lg"
        count={10}
        value={authorRating}
        onChange={(rating) => setAuthorRating(rating)}
      />
    </Stack>
  );
};

export default PieceRating;
