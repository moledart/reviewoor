import { JSONContent } from "@tiptap/react";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

export type NewReviewFormData = {
  title: string;
  group: string;
  reviewedPiece: BookFromGoogle | null;
  content: JSONContent | null;
  authorRating: number;
  tags: string[];
  thumbnail: string;
};

export type BookFromGoogle = {
  value: string;
  label: string;
  authors: string;
  published: string;
  image: string;
  group: string;
};

export const initialFormData = {
  title: "",
  group: "",
  reviewedPiece: {
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
  groupAtom,
  reviewedPieceAtom,
  contentAtom,
  authorRatingAtom,
  tagsAtom,
  thumbnailAtom,
};
