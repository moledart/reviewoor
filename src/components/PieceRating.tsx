import { Rating, Stack, Text } from "@mantine/core";
import { useAtom } from "jotai";
import reviewForm from "../atoms/reviewFormData";
import { langSwitcherAtom } from "../atoms/lang";
import formLabels from "../lang/formLabels";

const PieceRating = () => {
  const [authorRating, setAuthorRating] = useAtom(reviewForm.authorRatingAtom);
  const [lang] = useAtom(langSwitcherAtom);

  return (
    <Stack spacing={8}>
      <Text size="sm">{formLabels.rating[lang]}</Text>
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
