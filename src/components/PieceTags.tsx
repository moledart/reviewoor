import { HiOutlineHashtag } from "react-icons/hi2";
import { trpc } from "../utils/trpc";
import { useQueryClient } from "@tanstack/react-query";
import { MultiSelect } from "@mantine/core";
import { FormInputProps } from "./PieceTitle";
import { useState } from "react";

export const PieceTags = ({ review, setReview }: FormInputProps) => {
  const { data: tags } = trpc.tags.getAll.useQuery();
  const [value, setValue] = useState<string[]>([]);
  console.log(review.tags);

  return (
    <MultiSelect
      label="Add tags"
      data={tags ? tags.map((tag) => tag.name) : []}
      icon={<HiOutlineHashtag size={12} />}
      placeholder="Add tags"
      limit={20}
      getCreateLabel={(newTag) => `+ Create ${newTag}`}
      onCreate={(newTag) => {
        setReview((prev) =>
          newTag ? { ...prev, tags: [...prev.tags, newTag] } : prev
        );
        return newTag;
      }}
      // value={review.tags}
      onChange={(newTags) =>
        setReview((prev) => (newTags ? { ...prev, tags: newTags } : prev))
      }
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
