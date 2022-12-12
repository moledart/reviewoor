import { Button, Center, Group } from "@mantine/core";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../atoms/lang";

const LangSwitcher = () => {
  const [lang, setLang] = useAtom(langSwitcherAtom);

  return (
    <Center className="gap-2">
      <Button
        variant={lang === "ru" ? "filled" : "subtle"}
        color={lang === "ru" ? "dark" : "gray"}
        onClick={() => setLang("ru")}
      >
        Русский
      </Button>
      <Button
        variant={lang === "en" ? "filled" : "subtle"}
        color={lang === "en" ? "dark" : "gray"}
        onClick={() => setLang("en")}
      >
        English
      </Button>
    </Center>
  );
};

export default LangSwitcher;
