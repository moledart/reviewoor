import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import {
  IoPersonOutline,
  IoLanguageOutline,
  IoSunnyOutline,
  IoLogOutOutline,
  IoMoon,
} from "react-icons/io5";
import { langSwitcherAtom } from "../atoms/lang";
import { useAtom } from "jotai";
import content from "../lang/accountMenu";
import Link from "next/link";

const Account = () => {
  const { data: session } = useSession();
  const [lang, setLang] = useAtom(langSwitcherAtom);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpened(false));

  return (
    <Menu shadow="md" width={200} position="bottom-end" opened={opened}>
      <Menu.Target>
        <UnstyledButton onClick={() => setOpened((prev) => !prev)}>
          <Image
            src={session?.user?.image || ""}
            alt="User logo"
            width={40}
            height={40}
            className="rounded-sm transition-all duration-200 hover:border-zinc-900"
          />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <div ref={ref}>
          <Menu.Label>{content.menu[lang]}</Menu.Label>
          <Link href="/profile" className="no-underline">
            <Menu.Item icon={<IoPersonOutline size={14} />}>
              {content.profile[lang]}
            </Menu.Item>
          </Link>
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

          {session && (
            <>
              <Menu.Divider />

              <Menu.Label>{session?.user?.name}</Menu.Label>
              <Menu.Item
                color="red"
                icon={<IoLogOutOutline size={14} />}
                onClick={() => signOut()}
              >
                {content.logout[lang]}
              </Menu.Item>
            </>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Account;
