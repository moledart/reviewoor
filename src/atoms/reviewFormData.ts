import { ReviewedPiece } from "@prisma/client";
import { JSONContent } from "@tiptap/react";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { JSONValue } from "superjson/dist/types";

export type NewReviewFormData = {
  title: string;
  subtitle: string | null;
  group: string;
  reviewedPiece: ReviewedPiece | null;
  content: JSONValue | null;
  authorRating: number;
  tags: string[];
  thumbnail: string | null;
};

export const initialFormData = {
  title: "",
  subtitle: "",
  group: "Books",
  reviewedPiece: {
    id: "",
    group: "",
    image: "",
    label: "",
    published: "",
    value: "",
    authors: "",
  },
  content: null,
  authorRating: 0,
  tags: [],
  thumbnail: "",
};

export const dataAtom = atom<NewReviewFormData>(initialFormData);

export const titleAtom = focusAtom(dataAtom, (optic) => optic.prop("title"));
export const subtitleAtom = focusAtom(dataAtom, (optic) =>
  optic.prop("subtitle")
);

export const groupAtom = focusAtom(dataAtom, (optic) => optic.prop("group"));
export const reviewedPieceAtom = focusAtom(dataAtom, (optic) =>
  optic.prop("reviewedPiece")
);
export const contentAtom = focusAtom(dataAtom, (optic) =>
  optic.prop("content")
);
export const authorRatingAtom = focusAtom(dataAtom, (optic) =>
  optic.prop("authorRating")
);
export const tagsAtom = focusAtom(dataAtom, (optic) => optic.prop("tags"));
export const thumbnailAtom = focusAtom(dataAtom, (optic) =>
  optic.prop("thumbnail")
);

export default {
  dataAtom,
  titleAtom,
  subtitleAtom,
  groupAtom,
  reviewedPieceAtom,
  contentAtom,
  authorRatingAtom,
  tagsAtom,
  thumbnailAtom,
};
