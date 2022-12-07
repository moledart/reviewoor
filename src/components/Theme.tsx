import React, { ReactNode } from "react";
import { themeSwitcherAtom } from "../atoms/theme";
import { useAtom } from "jotai";
import { Lora, Cormorant, Vollkorn, EB_Garamond } from "@next/font/google";

const cormorant = Cormorant({
  subsets: ["cyrillic", "latin"],
  variable: "--font-cormorant",
});

const Theme = ({ children }: { children: ReactNode }) => {
  const [darkTheme] = useAtom(themeSwitcherAtom);

  return (
    <div
      className={`${cormorant.className} ${
        darkTheme
          ? "dark bg-zinc-900 text-zinc-100"
          : "bg-zinc-100 text-zinc-800"
      }`}
    >
      {children}
    </div>
  );
};

export default Theme;
