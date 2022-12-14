import {
  Avatar,
  Group,
  MantineColor,
  Select,
  SelectItemProps,
  Text,
} from "@mantine/core";
import { Dispatch, forwardRef, SetStateAction, useRef, useState } from "react";
import { debounce } from "lodash";
import { env } from "../env/client.mjs";
import { NewReviewFormData } from "../pages/review-editor/index.jsx";
import PreviousMap from "postcss/lib/previous-map.js";

export const createSearchUrl = (search: string) =>
  `https://www.googleapis.com/books/v1/volumes?q=intitle:${search}&maxResults=40&key=${env.NEXT_PUBLIC_GOOGLE_BOOKS_API}`;

export type FormInputProps = {
  review: NewReviewFormData;
  setReview: Dispatch<SetStateAction<NewReviewFormData>>;
};

export const PieceTitle = ({ review, setReview }: FormInputProps) => {
  const [input, setInput] = useState("");
  const [booksSearchResult, setBooksSearchResult] = useState([]);

  const getBookTitlesFromGoogle = async (title: string) => {
    const response = await fetch(createSearchUrl(title));
    const data = await response.json();
    const bookTitles = data?.items?.map((book: any) => {
      return {
        value: book.id,
        label: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        published: book.volumeInfo.publishedDate,
        image: book.volumeInfo.imageLinks?.smallThumbnail || "",
        group: "Books",
      };
    });
    return bookTitles;
  };

  const debouncedSearch = useRef(
    debounce(async (title) => {
      setBooksSearchResult(await getBookTitlesFromGoogle(title));
    }, 200)
  ).current;

  const handleSearchTitleChange = async (title: string) => {
    debouncedSearch(title);
    setInput(title);
  };

  return (
    <Select
      label="Choose a book"
      placeholder="The Night In Lisbon"
      searchable
      value={review.reviewedPieceId}
      onChange={(id) =>
        setReview((prev) => (id ? { ...prev, reviewedPieceId: id } : prev))
      }
      searchValue={input}
      onSearchChange={handleSearchTitleChange}
      data={booksSearchResult}
      itemComponent={AutoCompleteItem}
      clearable
      nothingFound="No books with this title, sorry"
      maxDropdownHeight={280}
      // disabling client-side filtering hack
      filter={() => true}
      styles={{
        label: {
          marginBottom: 8,
          fontSize: 14,
        },
      }}
    />
  );
};

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  authors: string[];
  published: string;
  image: string;
  group: string;
}

export const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ authors, value, label, image, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text>{label}</Text>
          <Text size="xs" color="dimmed">
            {authors?.join(", ")}
          </Text>
        </div>
      </Group>
    </div>
  )
);
