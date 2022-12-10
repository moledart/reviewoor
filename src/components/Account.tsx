import { useSession } from "next-auth/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type AccountProps = {
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
};

const Account = ({ setMenuVisible }: AccountProps) => {
  const { data: session } = useSession();

  return (
    <button onClick={() => setMenuVisible((prev) => !prev)}>
      <Image
        src={session?.user?.image || ""}
        alt="User logo"
        width={40}
        height={40}
        className="rounded-sm transition-all duration-200 hover:border-zinc-900"
      />
    </button>
  );
};

export default Account;
