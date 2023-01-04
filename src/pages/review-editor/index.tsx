import { Center, Container, LoadingOverlay, Stack } from "@mantine/core";
import { useSession } from "next-auth/react";
import { LoginButton } from "../../components/LoginButton";
import Navigation from "../../components/Navigation";
import PieceTitle from "../../components/PieceTitle";
import PieceRating from "../../components/PieceRating";
import PieceTags from "../../components/PieceTags";
import PieceThumbnail from "../../components/PieceThumbnail";
import PieceTextEditor from "../../components/PieceTextEditor";
import { useCreateReview } from "../../hooks/useCreateReview";
import PieceReviewTitle from "../../components/PieceReviewTitle";
import PieceReviewSubtitle from "../../components/PieceReviewSubtitle";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { dataAtom, initialFormData } from "../../atoms/reviewFormData";
import { useAtom } from "jotai";
import { useEffect } from "react";

const ReviewEditor = () => {
  const { data: session } = useSession();
  const { isLoading } = useCreateReview();

  const [, setFormData] = useAtom(dataAtom);

  useEffect(() => {
    setFormData(initialFormData);
  }, []);

  if (!session)
    return (
      <Center className="min-h-screen">
        <LoginButton />
      </Center>
    );

  return (
    <>
      <Navigation />
      <Container className="relative max-w-[70ch] pb-12">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <Stack spacing="xl">
          <PieceTitle />
          <PieceRating />
          <PieceTags />
          <PieceThumbnail />
          <PieceReviewTitle />
          <PieceReviewSubtitle />
          <PieceTextEditor />
        </Stack>
      </Container>
    </>
  );
};

export default ReviewEditor;
