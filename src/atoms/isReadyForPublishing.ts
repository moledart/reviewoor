import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

// export const langSwitcherAtom = atomWithStorage<Lang>("lang", "en");
export const isReadyForPublishingAtom = atom(false);
