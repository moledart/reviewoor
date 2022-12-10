import { signIn, signOut, useSession } from "next-auth/react";
import content from "../../lang/login";
import { langSwitcherAtom } from "../../atoms/lang";
import { useAtom } from "jotai";
import logo from "../../../public/logo.png";
import { useRouter } from "next/router";
import LangSwitcher from "../../components/LangSwitcher";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import Button from "../../components/Button";

import Image from "next/image";

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
    <div className="container mx-auto flex min-h-screen max-w-xs flex-col items-stretch justify-center gap-6">
      <div className="px-20">
        <Image src={logo} alt="Typewriter" />
      </div>
      <div className="flex flex-col items-center font-serif">
        <h1 className=" text-4xl font-semibold">{content.header[lang]}</h1>
        <p className=" text-zinc-500">{content.subheader[lang]}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button title="Github" handleClick={handleLoginMethod("github")} />
        <Button title="Discord" handleClick={handleLoginMethod("discord")} />
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Login;
