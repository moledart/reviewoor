import { atomWithStorage } from "jotai/utils";

type Lang = "ru" | "en";

export const langSwitcherAtom = atomWithStorage<Lang>("lang", "en");
