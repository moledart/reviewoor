import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import Account from "./Account";
import { Box, Button } from "@mantine/core";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../atoms/lang";
import { LoginButton } from "./LoginButton";
import { useEffect, useState } from "react";
import reviewForm from "../atoms/reviewFormData";
import { trpc } from "../utils/trpc";
import { thumbnailBlobAtom } from "../atoms/thumbnailBlob";
import { saveImageToStorage } from "../utils/utils";

const Navigation = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [lang] = useAtom(langSwitcherAtom);
  const [isReadyForPublishing, setIsReadyForPublishing] = useState(false);
  const [formData] = useAtom(reviewForm.dataAtom);
  const [thumbnailBlob] = useAtom(thumbnailBlobAtom);

  const { mutate: createReview } = trpc.review.create.useMutation();
  const handleCreateReview = async () => {
    let {
      authorRating,
      content,
      group,
      reviewedPiece,
      tags,
      thumbnail,
      title,
    } = formData;

    if (thumbnailBlob[0]) {
      thumbnail = await saveImageToStorage(thumbnailBlob[0], title);
    }

    if (reviewedPiece) {
      createReview({
        authorRating,
        group,
        reviewedPiece,
        title,
        content,
        tags,
        thumbnail,
      });
    }
    router.push("/");
  };

  useEffect(() => {
    formData.title.length > 0 && formData.reviewedPiece && formData.content
      ? setIsReadyForPublishing(true)
      : setIsReadyForPublishing(false);
  }, [formData]);

  return (
    <Box className="flex items-center gap-4 py-6 px-5 md:px-14">
      <Link href="/" className="mr-auto">
        <Image src={logo} alt="Typewriter" width={40} height={40} />
      </Link>
      {session ? (
        <>
          {router.pathname === "/review-editor" ? (
            <>
              {/* <Button
                leftIcon={<HiOutlinePencilSquare size={14} />}
                size="md"
                className="bg-zinc-800"
                color="dark"
                fw="400"
                onClick={() => router.push("/review-editor")}
              >
                {lang === "ru" ? "Сохранить драфт" : "Save draft"}
              </Button> */}
              <Button
                leftIcon={<HiOutlinePencilSquare size={14} />}
                size="md"
                className="bg-zinc-800"
                color="dark"
                fw="400"
                onClick={() => handleCreateReview()}
                disabled={!isReadyForPublishing}
              >
                {lang === "ru" ? "Опубликовать" : "Publish"}
              </Button>
            </>
          ) : (
            <Button
              leftIcon={<HiOutlinePencilSquare size={14} />}
              size="md"
              className="bg-zinc-800"
              color="dark"
              fw="400"
              onClick={() => router.push("/review-editor")}
            >
              {lang === "ru" ? "Новая рецензия" : "New review"}
            </Button>
          )}

          <Account />
        </>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navigation;
