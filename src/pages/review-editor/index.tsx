import { Center, Container, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { LoginButton } from "../../components/LoginButton";
import Navigation from "../../components/Navigation";
import PieceTitle from "../../components/PieceTitle";
import PieceRating from "../../components/PieceRating";
import PieceTags from "../../components/PieceTags";
import PieceThumbnail from "../../components/PieceThumbnail";
import PieceTextEditor from "../../components/PieceTextEditor";
import { useAtom } from "jotai";
import { isReadyForPublishingAtom } from "../../atoms/isReadyForPublishing";

const ReviewEditor = () => {
  const { data: session } = useSession();
  const [, setIsReadyForPublishing] = useAtom(isReadyForPublishingAtom);


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
          <PieceTitle />
          <PieceRating />
          <PieceTags />
          <PieceThumbnail />
          <PieceTextEditor />
        </Stack>
      </Container>
    </>
  );
};

export default ReviewEditor;
