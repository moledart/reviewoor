import { useRouter } from "next/router";
import Navigation from "../../../components/Navigation";
import { trpc } from "../../../utils/trpc";
import { Container, Flex, Group, Rating, Stack, Text } from "@mantine/core";
import { ReviewAuthorAndDate } from "../../../components/CardContent";
import Like from "../../../components/Like";
import UserRating from "../../../components/UserRating";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Link } from "@mantine/tiptap";

import TagsCloud from "../../../components/TagsCloud";
import { useSession } from "next-auth/react";
import ReviewRating from "../../../components/ReviewRating";
import { PiecePreview } from "../../../components/PiecePreview";

const ReviewReader = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: review } = trpc.review.getFullContentById.useQuery({
    id: router.query.id as string,
  });

  const editor = useEditor({
    editable: false,
    content: (review?.content as JSONContent) || "",
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (review && editor) {
      editor.commands.setContent(review.content as JSONContent);
    }
  }, [review]);

  return (
    <>
      <Navigation />
      <Container className="max-w-[80ch] pb-12">
        {review && (
          <Stack spacing={24}>
            <Stack spacing={8}>
              <img src={review?.thumbnail} className="max-h-96 object-cover" />

              <Group position="apart">
                <ReviewAuthorAndDate
                  author={review?.author}
                  createdAt={review?.createdAt}
                />
                <Flex className="items-center gap-2">
                  <Like reviewId={review.id} />
                  <UserRating userRating={review.userRating} />
                </Flex>
              </Group>
              <PiecePreview reviewId={review.id} />

              <EditorContent editor={editor} />
            </Stack>
            <TagsCloud tags={review.tags} />
            {session?.user && (
              <ReviewRating reviewId={review.id} userId={session.user.id} />
            )}
          </Stack>
        )}
      </Container>
    </>
  );
};

export default ReviewReader;
