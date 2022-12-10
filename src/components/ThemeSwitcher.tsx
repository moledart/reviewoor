import { useAtom } from "jotai";
import { themeSwitcherAtom } from "../atoms/theme";
import { IoSunnyOutline, IoMoon } from "react-icons/io5";

const ThemeSwitcher = () => {
  const [darkTheme, setDarkTheme] = useAtom(themeSwitcherAtom);

  console.log(typeof (<IoSunnyOutline size={24} />));

  return (
    <button
      className="flex items-center "
      onClick={() => setDarkTheme((prev) => !prev)}
    >
      {darkTheme ? <IoSunnyOutline size={24} /> : <IoMoon size={24} />}
    </button>
  );
};

export default ThemeSwitcher;
