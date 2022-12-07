import React from "react";
import { useAtom } from "jotai";
import { Switch } from "@headlessui/react";
import { themeSwitcherAtom } from "../atoms/theme";

const ThemeSwitcher = () => {
  const [darkTheme, setDarkTheme] = useAtom(themeSwitcherAtom);

  return (
    <div className="flex flex-col items-center gap-1">
      <span>{darkTheme ? "Light" : "Dark"} Mode</span>
      <Switch
        checked={darkTheme}
        onChange={setDarkTheme}
        className={`${
          darkTheme ? "bg-zinc-800" : "bg-zinc-300"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            darkTheme
              ? "translate-x-6 bg-zinc-100"
              : "translate-x-1 bg-zinc-700"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  );
};

export default ThemeSwitcher;
