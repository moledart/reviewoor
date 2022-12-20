import { HiOutlineHashtag } from "react-icons/hi2";
import { trpc } from "../utils/trpc";
import { useQueryClient } from "@tanstack/react-query";
import { MultiSelect } from "@mantine/core";
import { FormInputProps } from "./PieceTitle";
import { useEffect, useState } from "react";
import { Tag } from "@prisma/client";

const PieceTags = ({ review, setReview }: FormInputProps) => {
  const { data: tags } = trpc.tags.getAll.useQuery();
  const [selectOptions, setSelectOptions] = useState<string[]>([]);

  useEffect(() => {
    if (tags) setSelectOptions(tags.map((tag) => tag.name));
  }, [tags]);

  const handleChange = (value: string | string[]) => {
    setReview((prev) => ({ ...prev, tags: [...value] }));
  };

  const handleCreate = (value: string) => {
    setSelectOptions((prev) => [...prev, value]);
    handleChange(value);
    return value;
  };

  console.log(review.tags);

  return (
    <MultiSelect
      label="Add tags"
      data={selectOptions}
      icon={<HiOutlineHashtag size={12} />}
      placeholder="Add tags"
      limit={20}
      getCreateLabel={(newTag) => `+ Create ${newTag}`}
      onCreate={handleCreate}
      value={review.tags}
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
