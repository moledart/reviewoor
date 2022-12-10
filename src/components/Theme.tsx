import React, { ReactNode } from "react";
import { themeSwitcherAtom } from "../atoms/theme";
import { useAtom } from "jotai";
import { Inter, EB_Garamond } from "@next/font/google";

const cormorant = EB_Garamond({
  subsets: ["cyrillic", "latin"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
});

const Theme = ({ children }: { children: ReactNode }) => {
  const [darkTheme] = useAtom(themeSwitcherAtom);

  return (
    <div
      className={`${cormorant.className} ${inter.className} ${
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
