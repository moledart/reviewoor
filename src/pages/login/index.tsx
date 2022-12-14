import logo from "../../../public/logo.png";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
// Lang
import { useAtom } from "jotai";
import content from "../../lang/login";
import { langSwitcherAtom } from "../../atoms/lang";
//Components
import LangSwitcher from "../../components/LangSwitcher";
import ThemeSwitcher from "../../components/ThemeSwitcher";

import { Center, Stack, Text, Title, Button, Container } from "@mantine/core";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [lang] = useAtom(langSwitcherAtom);

  if (session) {
    router.push("/");
  }

  const handleLoginMethod = (method: string) => {
    return () => signIn(method, { callbackUrl: "/" });
  };

  return (
    <Container className="max-w-sm">
      <Center className="min-h-screen">
        <Stack spacing="xl">
          <Center className="px-16">
            <Image src={logo} alt="Typewriter" className="h-auto max-w-full" />
          </Center>
          <Stack align="center" className="gap-0">
            <Title order={1} align="center">
              {content.header[lang]}
            </Title>
            <Text c="dimmed" align="center">
              {content.subheader[lang]}
            </Text>
          </Stack>
          <Stack spacing="xs">
            <Button
              fullWidth
              size="lg"
              className="bg-zinc-800"
              color="dark"
              fw="400"
              onClick={handleLoginMethod("github")}
            >
              Github
            </Button>
            <Button
              fullWidth
              size="lg"
              className="bg-zinc-800"
              color="dark"
              fw="400"
              onClick={handleLoginMethod("discord")}
            >
              Discord
            </Button>
          </Stack>
          <LangSwitcher />
          <Center>
            <ThemeSwitcher />
          </Center>
        </Stack>
      </Center>
    </Container>
  );
};

export default Login;
