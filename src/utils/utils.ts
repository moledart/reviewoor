import { FileWithPath } from "@mantine/dropzone";
import { env } from "../env/client.mjs";
import { storage } from "../server/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { boolean } from "zod";
import { BookFromGoogle } from "../atoms/reviewFormData.js";

const baseGoogleApiUrl = "https://www.googleapis.com/books/v1/volumes";
const apiKey = `key=${env.NEXT_PUBLIC_GOOGLE_BOOKS_API}`;

export const generateSearchUrl = (searchBy: string, searchValue: string) => {
  let searchUrl = baseGoogleApiUrl;
  if (searchBy === "id") searchUrl += `/${searchValue}?`;
  if (searchBy === "title")
    searchUrl += `?q=intitle:${searchValue}&maxResults=40&orderBy=relevance&`;
  searchUrl += apiKey;
  return searchUrl;
};

export const transformBooksDataFromGoogleApi = (
  data: any
): BookFromGoogle[] => {
  // getting all ids from response
  const ids = data?.items?.map((book: any) => book.id);
  // removing duplicates from google api
  return data?.items
    ?.filter((book: any, index: number) => !ids.includes(book.id, index + 1))
    .map((book: any) => ({
      value: book.id,
      label: book.volumeInfo.title,
      authors: book?.volumeInfo?.authors?.join(", "),
      published: book.volumeInfo.publishedDate,
      image: book.volumeInfo.imageLinks?.smallThumbnail || "",
      group: "Books",
    }));
};

export const searchBooksOnGoogle = async (
  searchBy: string,
  searchQuery: string
) => {
  const response = await fetch(generateSearchUrl(searchBy, searchQuery));
  const data = await response.json();
  const bookTitles = transformBooksDataFromGoogleApi(data);
  return bookTitles;
};

export const saveImageToStorage = async (
  thumbnailFile: FileWithPath,
  title: string
) => {
  const thumbnailRef = ref(storage, `thumbnails/${title}/`);
  await uploadBytes(thumbnailRef, thumbnailFile);
  const thumbnailStorageUrl = await getDownloadURL(thumbnailRef);
  return thumbnailStorageUrl;
};
