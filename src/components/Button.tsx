import { signIn } from "next-auth/react";

type ButtonProps = {
  title: string;
  handleClick: () => void;
  icon?: JSX.Element;
  primary?: boolean;
};

const Button = ({ title, handleClick, icon, primary }: ButtonProps) => {
  return (
    <button
      className={`flex items-center gap-2 py-2 px-4 transition-all duration-75 hover:bg-zinc-900 hover:text-zinc-50 dark:bg-zinc-800 dark:hover:bg-pink-700 
      ${icon ? "justify-start" : "justify-center"} 
      ${
        primary
          ? "bg-zinc-900 text-zinc-100 hover:bg-pink-700"
          : " border border-zinc-900"
      } `}
      onClick={handleClick}
    >
      {icon && icon}
      {title}
    </button>
  );
};

export default Button;
