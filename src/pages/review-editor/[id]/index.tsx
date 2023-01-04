import { Center, Container, LoadingOverlay, Stack } from "@mantine/core";
import { useSession } from "next-auth/react";
import { LoginButton } from "../../../components/LoginButton";
import Navigation from "../../../components/Navigation";
import PieceTitle from "../../../components/PieceTitle";
import PieceRating from "../../../components/PieceRating";
import PieceTags from "../../../components/PieceTags";
import PieceThumbnail from "../../../components/PieceThumbnail";
import PieceTextEditor from "../../../components/PieceTextEditor";
import { useCreateReview } from "../../../hooks/useCreateReview";
import PieceReviewTitle from "../../../components/PieceReviewTitle";
import PieceReviewSubtitle from "../../../components/PieceReviewSubtitle";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { useAtom } from "jotai";
import { dataAtom, initialFormData } from "../../../atoms/reviewFormData";
import { useEffect, useState } from "react";

const ReviewEditor = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: review, isLoading } = trpc.review.getDataForReviewEdit.useQuery(
    {
      id: router.query.id as string,
    }
  );

  const [formData, setFormData] = useAtom(dataAtom);

  useEffect(() => {
    review &&
      setFormData({
        title: review.title,
        authorRating: review.authorRating,
        content: review.content,
        group: review.group.name,
        reviewedPiece: review.reviewedPiece,
        subtitle: review.subtitle,
        tags: review.tags.map((tag) => tag.name),
        thumbnail: review.thumbnail,
      });
    return () => setFormData(initialFormData);
  }, [!isLoading]);

  if (!session)
    return (
      <Center className="min-h-screen">
        <LoginButton />
      </Center>
    );

  console.log(formData);

  return (
    <>
      <Navigation />
      <Container className="max-w-[70ch] pb-12">
        {isLoading ? (
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
        ) : (
          <Stack spacing="xl">
            {formData.title && <PieceTitle />}
            <PieceRating />
            <PieceTags />
            {formData.thumbnail && <PieceThumbnail />}
            <PieceReviewTitle />
            <PieceReviewSubtitle />
            {formData.content && <PieceTextEditor />}
          </Stack>
        )}
      </Container>
    </>
  );
};

export default ReviewEditor;
