import { useSession } from "next-auth/react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { IoPersonOutline, IoLanguageOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../atoms/lang";

type MenuProps = {
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
};

const Menu = ({ setMenuVisible }: MenuProps) => {
  const { data: session } = useSession();
  const [lang, setLang] = useAtom(langSwitcherAtom);

  return (
    <div className="absolute right-[20px] top-[70px] flex flex-col gap-3 rounded p-2 text-sm text-zinc-600 shadow-lg dark:bg-zinc-800 dark:text-zinc-300 md:right-[56px]">
      <Link
        className="flex items-center gap-2  px-4 py-2 hover:text-zinc-900 dark:hover:text-zinc-50"
        href="/account"
      >
        <IoPersonOutline size={20} />
        <span>Profile</span>
      </Link>
      <div
        className="flex cursor-pointer items-center  gap-8 px-4 py-2 hover:text-zinc-900 dark:hover:text-zinc-50"
        onClick={() => setLang((prev) => (prev === "ru" ? "en" : "ru"))}
      >
        <div className="mr-10 flex cursor-pointer gap-2">
          <IoLanguageOutline size={20} />
          <span>Language</span>
        </div>
        <span className="min-w-[60px]">
          {lang === "ru" ? "Русский" : "English"}
        </span>
      </div>
      <button
        className="flex flex-col items-start px-4 py-2 hover:text-zinc-900 dark:hover:text-zinc-50"
        onClick={() => signOut()}
      >
        <p>Sign out</p>
        <span>{session?.user?.email}</span>
      </button>
    </div>
  );
};

export default Menu;
