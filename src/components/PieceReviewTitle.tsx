import { TextInput } from "@mantine/core";
import reviewFormData from "../atoms/reviewFormData";
import { useAtom } from "jotai";

const PieceReviewTitle = () => {
  const [title, setTitle] = useAtom(reviewFormData.titleAtom);
  return (
    <TextInput
      value={title}
      onChange={(event) => setTitle(event.currentTarget.value)}
      label="Your review title"
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

export default PieceReviewTitle;
