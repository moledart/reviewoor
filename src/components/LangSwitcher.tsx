import { useAtom } from "jotai";
import { langSwitcherAtom } from "../atoms/lang";

const LangSwitcher = () => {
  const [lang, setLang] = useAtom(langSwitcherAtom);

  return (
    <div className="flex justify-center gap-2">
      <button
        className={`${
          lang === "ru" ? "font-bold" : "font-normal"
        } hover:text-pink-700`}
        onClick={() => setLang("ru")}
      >
        Русский
      </button>
      <button
        className={`${
          lang === "en" ? "font-bold" : "font-normal"
        } hover:text-pink-700`}
        onClick={() => setLang("en")}
      >
        English
      </button>
    </div>
  );
};

export default LangSwitcher;
