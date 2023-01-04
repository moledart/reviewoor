import { Textarea } from "@mantine/core";
import reviewFormData from "../atoms/reviewFormData";
import { useAtom } from "jotai";
import formLabels from "../lang/formLabels";
import { langSwitcherAtom } from "../atoms/lang";

const PieceReviewSubtitle = () => {
  const [subtitle, setSubtitle] = useAtom(reviewFormData.subtitleAtom);
  const [lang] = useAtom(langSwitcherAtom);

  return (
    <Textarea
      value={subtitle ? subtitle : ""}
      onChange={(event) => setSubtitle(event.currentTarget.value)}
      label={formLabels.subtitle[lang]}
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
