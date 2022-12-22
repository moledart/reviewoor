import { HiOutlineHashtag } from "react-icons/hi2";
import { trpc } from "../utils/trpc";
import { MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import reviewForm from "../atoms/reviewFormData";

const PieceTags = () => {
  const { data: tags } = trpc.tags.getAll.useQuery();
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  const [reviewTags, setReviewTags] = useAtom(reviewForm.tagsAtom);

  useEffect(() => {
    if (tags) setSelectOptions(tags.map((tag) => tag.name));
  }, [tags]);

  const handleChange = (value: string | string[]) => {
    setReviewTags([...value]);
  };

  const handleCreate = (value: string) => {
    setSelectOptions((prev) => [...prev, value]);
    handleChange(value);
    return value;
  };

  return (
    <MultiSelect
      label="Add tags"
      data={selectOptions}
      icon={<HiOutlineHashtag size={12} />}
      placeholder="Add tags"
      limit={20}
      getCreateLabel={(newTag) => `+ Create ${newTag}`}
      onCreate={handleCreate}
      value={reviewTags}
      onChange={handleChange}
      styles={{
        label: {
          marginBottom: 8,
          fontSize: 14,
        },
      }}
      searchable
      creatable
      clearable
    />
  );
};

export default PieceTags;
