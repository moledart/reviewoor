import { Button, Center, Group } from "@mantine/core";
import { useAtom } from "jotai";
import { Lang, langSwitcherAtom } from "../atoms/lang";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";

const LangSwitcher = () => {
  const [, setLocalLang] = useAtom(langSwitcherAtom);
  const [lang, setLang] = useLocalStorage<Lang>({
    key: "lang",
    defaultValue: "en",
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    setLocalLang(lang);
  }, [lang]);

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
