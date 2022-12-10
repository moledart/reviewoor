import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../public/logo.png";
import Account from "./Account";
import Button from "./Button";
import ThemeSwitcher from "./ThemeSwitcher";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Menu from "./Menu";
import { useState } from "react";

const Navigation = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(true);

  return (
    <nav className="relative flex items-center gap-8 py-6 px-5 md:px-14">
      <div className="mr-auto flex items-center gap-2">
        <Image src={logo} alt="Typewriter" width={40} height={40} />
        <span className="font-serif text-2xl font-light uppercase ">
          re:view
        </span>
      </div>

      <div className="hidden md:flex">
        <Button
          icon={<HiOutlinePencilSquare size={20} />}
          title="New review"
          handleClick={() => router.push("/review-editor")}
          primary={true}
        />
      </div>
      <ThemeSwitcher />
      {session ? (
        <>
          <Account setMenuVisible={setMenuVisible} />
          {menuVisible && <Menu setMenuVisible={setMenuVisible} />}
        </>
      ) : (
        <Button title="Login" handleClick={() => router.push("/login")} />
      )}
    </nav>
  );
};

export default Navigation;
