import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { useLocalStorage } from "@mantine/hooks";

export type Lang = "ru" | "en";

// export const langSwitcherAtom = atomWithStorage<Lang>("lang", "en");
export const langSwitcherAtom = atom<Lang>("en");
