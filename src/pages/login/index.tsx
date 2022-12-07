import { signIn, signOut, useSession } from "next-auth/react";
import content from "../../lang/login";
import { langSwitcherAtom } from "../../atoms/lang";
import { useAtom } from "jotai";
import logo from "../../../public/logo.png";
import { useRouter } from "next/router";
import LangSwitcher from "../../components/LangSwitcher";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import Image from "next/image";
import { themeSwitcherAtom } from "../../atoms/theme";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [lang] = useAtom(langSwitcherAtom);
  const [darkTheme] = useAtom(themeSwitcherAtom);

  if (session) {
    router.push("/");
  }

  return (
    <div className="container mx-auto flex min-h-screen max-w-xs flex-col items-stretch justify-center">
      <div className="mb-6 px-20">
        <Image src={logo} alt="Typewriter" />
      </div>
      <div className="mb-6 flex flex-col items-center">
        <h1 className="text-4xl font-semibold">{content.header[lang]}</h1>
        <p className=" text-zinc-500">{content.subheader[lang]}</p>
      </div>
      <div className="mb-4 flex flex-col">
        <button
          className="mb-2 border border-zinc-900 py-2 text-lg transition-all duration-75 hover:bg-zinc-900 hover:text-zinc-50 dark:bg-zinc-800 dark:hover:bg-pink-700"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          Github
        </button>
        <button
          className="mb-2 border border-zinc-900 py-2 text-lg transition-all duration-75 hover:bg-zinc-900 hover:text-zinc-50 dark:bg-zinc-800 dark:hover:bg-pink-700"
          onClick={() => signIn("discord", { callbackUrl: "/" })}
        >
          Discord
        </button>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Login;
