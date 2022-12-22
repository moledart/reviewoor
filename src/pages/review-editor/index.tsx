import { Center, Container, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LoginButton } from "../../components/LoginButton";
import Navigation from "../../components/Navigation";
import PieceTitle, { BookFromGoogle } from "../../components/PieceTitle";
import PieceRating from "../../components/PieceRating";
import PieceTags from "../../components/PieceTags";
import PieceThumbnail from "../../components/PieceThumbnail";
import PieceTextEditor from "../../components/PieceTextEditor";
import { JSONContent } from "@tiptap/react";
import { useAtom } from "jotai";
import { isReadyForPublishingAtom } from "../../atoms/isReadyForPublishing";

export type NewReviewFormData = {
  title: string;
  group: string;
  reviewedPiece: BookFromGoogle | null;
  content: JSONContent | null;
  authorRating: number;
  tags: string[];
  thumbnail: string;
};

const ReviewEditor = () => {
  const { data: session } = useSession();
  const [, setIsReadyForPublishing] = useAtom(isReadyForPublishingAtom);

  const [review, setReview] = useState<NewReviewFormData>({
    title: "This works",
    group: "Books",
    reviewedPiece: {
      group: "Books",
      image:
        "http://books.google.com/books/content?id=mRTCswEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      label: "Night",
      published: "2013-09-10",
      value: "mRTCswEACAAJ",
      authors: "Elie Wiesel",
    },
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: {
            textAlign: "left",
            level: 1,
          },
          content: [
            {
              type: "text",
              text: "This works",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
          content: [
            {
              type: "text",
              text: "this should too",
            },
          ],
        },
      ],
    },
    authorRating: 8,
    tags: ["bestseller"],
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/reviewoor-5c6c1.appspot.com/o/thumbnails?alt=media&token=e8bb8716-a152-4ea8-8746-ed9ce0ee1166",
  });

  useEffect(() => {
    review.title.length > 0 && review.reviewedPiece && review.content
      ? setIsReadyForPublishing(true)
      : setIsReadyForPublishing(false);
  }, [review]);

  if (!session)
    return (
      <Center className="min-h-screen">
        <LoginButton />
      </Center>
    );

  return (
    <>
      <Navigation />
      <Container className="max-w-[70ch] pb-12">
        <Stack spacing="xl">
          <PieceTitle review={review} setReview={setReview} />
          <PieceRating review={review} setReview={setReview} />
          <PieceTags review={review} setReview={setReview} />
          <PieceThumbnail review={review} setReview={setReview} />
          <PieceTextEditor review={review} setReview={setReview} />
        </Stack>
      </Container>
    </>
  );
};

export default ReviewEditor;
