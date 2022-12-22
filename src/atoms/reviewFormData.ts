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

const initialData = {
  title: "This works",
  group: "Books",
  reviewedPiece: {
    group: "Books",
    image:
      "http://books.google.com/books/content?id=mRTCswEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    label: "Night",
    published: "2013-09-10",
    value: "mRTCswEACAAJ",
    authors: "Elie Wiesel",
  },
  content: {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          textAlign: "left",
          level: 1,
        },
        content: [
          {
            type: "text",
            text: "This works",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
        content: [
          {
            type: "text",
            text: "this should too",
          },
        ],
      },
    ],
  },
  authorRating: 8,
  tags: ["bestseller"],
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/reviewoor-5c6c1.appspot.com/o/thumbnails?alt=media&token=e8bb8716-a152-4ea8-8746-ed9ce0ee1166",
};

export const dataAtom = atom<NewReviewFormData>(initialData);

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
