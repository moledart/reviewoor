import { IoSunnyOutline, IoMoon } from "react-icons/io5";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      variant="light"
    >
      {dark ? <IoSunnyOutline size={24} /> : <IoMoon size={24} />}
    </ActionIcon>
  );
};

export default ThemeSwitcher;
