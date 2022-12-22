import { atom } from "jotai";
import { FileWithPath } from "@mantine/dropzone";

export const thumbnailBlobAtom = atom<FileWithPath[]>([]);
