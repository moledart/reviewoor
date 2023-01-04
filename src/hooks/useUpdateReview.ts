import { useAtom } from "jotai";
import reviewFormData from "../atoms/reviewFormData";
import { thumbnailBlobAtom } from "../atoms/thumbnailBlob";
import { trpc } from "../utils/trpc";
import { saveImageToStorage } from "../utils/utils";
import { useRouter } from "next/router";
import { initialFormData } from "../atoms/reviewFormData";
import { useState } from "react";

export const useUpdateReview = () => {
  const ctx = trpc.useContext();
  const router = useRouter();
  const [formData, setFormData] = useAtom(reviewFormData.dataAtom);
  const [thumbnailBlob] = useAtom(thumbnailBlobAtom);

  const {
    mutate: updateReview,
    isError,
    isLoading,
  } = trpc.review.update.useMutation({
    onSuccess: (data) => {
      setFormData(initialFormData);
      ctx.review.invalidate();
      ctx.review.getFullContentById.invalidate({ id: data.id });
      router.push(`/review/${data.id}`);
    },
  });

  const handleUpdateReview = async (id: string) => {
    const {
      authorRating,
      content,
      group,
      reviewedPiece,
      tags,
      title,
      subtitle,
    } = formData;
    let { thumbnail } = formData;

    if (thumbnailBlob[0]) {
      thumbnail = await saveImageToStorage(thumbnailBlob[0], title);
    }

    if (reviewedPiece) {
      updateReview({
        id,
        authorRating,
        subtitle,
        group,
        reviewedPiece,
        title,
        content,
        tags,
        thumbnail,
      });
    }
  };

  return { handleUpdateReview, isLoading, isError };
};
