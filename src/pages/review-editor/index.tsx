import { Center, Container, Stack } from "@mantine/core";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { LoginButton } from "../../components/LoginButton";
import Navigation from "../../components/Navigation";
import PieceTitle from "../../components/PieceTitle";
import PieceRating from "../../components/PieceRating";
import PieceTags from "../../components/PieceTags";
import PieceThumbnail from "../../components/PieceThumbnail";
import { string } from "zod";

export type NewReviewFormData = {
  title: string;
  reviewedPieceId: string;
  content: string | null;
  authorRating: number;
  tags: string[];
  thumbnail: string;
};

const ReviewEditor = () => {
  const { data: session } = useSession();

  const [review, setReview] = useState<NewReviewFormData>({
    title: "",
    reviewedPieceId: "",
    content: "",
    authorRating: 5,
    tags: ["bestseller"],
    thumbnail: "",
  });

  if (!session)
    return (
      <Center className="min-h-screen">
        <LoginButton />
      </Center>
    );

  return (
    <>
      <Navigation />
      <Container className="max-w-[70ch]">
        <Stack spacing="xl">
          <PieceTitle review={review} setReview={setReview} />
          <PieceRating review={review} setReview={setReview} />
          <PieceTags review={review} setReview={setReview} />
          <PieceThumbnail review={review} setReview={setReview} />
        </Stack>
      </Container>
    </>
  );
};

export default ReviewEditor;
