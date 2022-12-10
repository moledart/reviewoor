import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

type Lang = "ru" | "en";

// export const langSwitcherAtom = atomWithStorage<Lang>("lang", "en");
export const langSwitcherAtom = atom<Lang>("en");
