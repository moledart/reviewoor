import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  Burger,
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { useClickOutside, useLocalStorage } from "@mantine/hooks";
import {
  IoPersonOutline,
  IoLanguageOutline,
  IoSunnyOutline,
  IoLogOutOutline,
  IoMoon,
} from "react-icons/io5";
import { Lang, langSwitcherAtom } from "../atoms/lang";
import { useAtom } from "jotai";
import content from "../lang/accountMenu";
import Link from "next/link";
import { useRouter } from "next/router";

const Account = () => {
  const { data: session } = useSession();
  const [, setLocalLang] = useAtom(langSwitcherAtom);
  const [lang, setLang] = useLocalStorage<Lang>({
    key: "lang",
    defaultValue: "en",
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    setLocalLang(lang);
  }, [lang]);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const ref = useClickOutside<HTMLDivElement>(() => setOpened(false));

  return (
    <div ref={ref}>
      <Menu shadow="md" width={200} position="bottom-end" opened={opened}>
        <Menu.Target>
          {session?.user ? (
            <UnstyledButton onClick={() => setOpened((prev) => !prev)}>
              <Image
                src={session?.user?.image || ""}
                alt="User logo"
                width={40}
                height={40}
                className="rounded-sm transition-all duration-200 hover:border-zinc-900"
              />
            </UnstyledButton>
          ) : (
            <Burger
              opened={opened}
              onClick={() => setOpened((prev) => !prev)}
            />
          )}
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{content.menu[lang]}</Menu.Label>
          {session?.user && (
            <Link href="/profile" className="no-underline">
              <Menu.Item icon={<IoPersonOutline size={14} />}>
                {content.profile[lang]}
              </Menu.Item>
            </Link>
          )}
          <Menu.Item
            icon={<IoLanguageOutline size={14} />}
            rightSection={
              <Text color="dimmed" className="flex items-center">
                {lang}
              </Text>
            }
            onClick={() => setLang((prev) => (prev === "ru" ? "en" : "ru"))}
          >
            {content.language[lang]}
          </Menu.Item>
          <Menu.Item
            rightSection={
              <Text color="dimmed" className="flex items-center">
                {colorScheme === "light" ? (
                  <IoSunnyOutline size={14} />
                ) : (
                  <IoMoon size={14} />
                )}
              </Text>
            }
            onClick={() => toggleColorScheme()}
          >
            {content.theme[lang]}
          </Menu.Item>

          {session ? (
            <>
              <Menu.Divider />

              <Menu.Label>{session?.user?.name}</Menu.Label>
              <Menu.Item
                color="pink"
                icon={<IoLogOutOutline size={14} />}
                onClick={() => signOut()}
              >
                {content.logout[lang]}
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Divider />

              <Menu.Label>{content.loginCTA[lang]}</Menu.Label>
              <Menu.Item
                color="pink"
                icon={<IoLogOutOutline size={14} />}
                onClick={() => router.push("/login")}
              >
                {content.login[lang]}
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default Account;
