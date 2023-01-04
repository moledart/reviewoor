import { TextInput } from "@mantine/core";
import reviewFormData from "../atoms/reviewFormData";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../atoms/lang";
import formLabels from "../lang/formLabels";

const PieceReviewTitle = () => {
  const [title, setTitle] = useAtom(reviewFormData.titleAtom);
  const [lang] = useAtom(langSwitcherAtom);

  return (
    <TextInput
      value={title}
      onChange={(event) => setTitle(event.currentTarget.value)}
      label={formLabels.reviewTitle[lang]}
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
