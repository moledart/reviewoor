import { Rating, Stack, Text } from "@mantine/core";
import React from "react";
import { FormInputProps } from "./PieceTitle";

const PieceRating = ({ review, setReview }: FormInputProps) => {
  return (
    <Stack spacing={8}>
      <Text size="sm">How would you rate it?</Text>
      <Rating
        defaultValue={7}
        size="lg"
        count={10}
        value={review.authorRating}
        onChange={(rating) =>
          setReview((prev) =>
            rating ? { ...prev, authorRating: rating } : prev
          )
        }
      />
    </Stack>
  );
};

export default PieceRating;
