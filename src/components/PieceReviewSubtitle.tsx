import { Textarea } from "@mantine/core";
import reviewFormData from "../atoms/reviewFormData";
import { useAtom } from "jotai";

const PieceReviewSubtitle = () => {
  const [subtitle, setSubtitle] = useAtom(reviewFormData.subtitleAtom);
  return (
    <Textarea
      value={subtitle}
      onChange={(event) => setSubtitle(event.currentTarget.value)}
      label="Subtitle"
      styles={{
        label: {
          marginBottom: 8,
          fontSize: 14,
        },
      }}
      withAsterisk
    />
  );
};

export default PieceReviewSubtitle;
