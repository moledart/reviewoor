import { useAtom } from "jotai";
import reviewFormData from "../atoms/reviewFormData";
import { thumbnailBlobAtom } from "../atoms/thumbnailBlob";
import { trpc } from "../utils/trpc";
import { saveImageToStorage } from "../utils/utils";
import { useRouter } from "next/router";
import { initialFormData } from "../atoms/reviewFormData";
import { useState } from "react";

export const useCreateReview = () => {
  const ctx = trpc.useContext();
  const router = useRouter();
  const [formData, setFormData] = useAtom(reviewFormData.dataAtom);
  const [thumbnailBlob] = useAtom(thumbnailBlobAtom);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: createReview, isError } = trpc.review.create.useMutation({
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      setFormData(initialFormData);
      ctx.review.invalidate();
      setIsLoading(false);
      router.push("/");
    },
  });

  const handleCreateReview = async () => {
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
      createReview({
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

  return { handleCreateReview, isLoading, isError };
};

// Just made a hook for creating post, gotta change it in navigation button
