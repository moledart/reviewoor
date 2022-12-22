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
import { isReadyForPublishingAtom } from "../atoms/isReadyForPublishing";
import { LoginButton } from "./LoginButton";

const Navigation = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [lang] = useAtom(langSwitcherAtom);
  const [isReadyForPublishing] = useAtom(isReadyForPublishingAtom);

  return (
    <Box className="flex items-center gap-4 py-6 px-5 md:px-14">
      <Link href="/" className="mr-auto">
        <Image src={logo} alt="Typewriter" width={40} height={40} />
      </Link>
      {session ? (
        <>
          {router.pathname === "/review-editor" ? (
            <>
              <Button
                leftIcon={<HiOutlinePencilSquare size={14} />}
                size="md"
                className="bg-zinc-800"
                color="dark"
                fw="400"
                onClick={() => router.push("/review-editor")}
              >
                {lang === "ru" ? "Сохранить драфт" : "Save draft"}
              </Button>
              <Button
                leftIcon={<HiOutlinePencilSquare size={14} />}
                size="md"
                className="bg-zinc-800"
                color="dark"
                fw="400"
                onClick={() => router.push("/review-editor")}
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
