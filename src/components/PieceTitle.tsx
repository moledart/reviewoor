import {
  Avatar,
  Group,
  MantineColor,
  Select,
  SelectItemProps,
  Text,
} from "@mantine/core";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";
import { NewReviewFormData } from "../pages/review-editor/index.jsx";
import { searchBooksOnGoogle } from "../utils/utils";

export type BookFromGoogle = {
  value: string;
  label: string;
  authors: string;
  published: string;
  image: string;
  group: string;
};

export type FormInputProps = {
  review: NewReviewFormData;
  setReview: Dispatch<SetStateAction<NewReviewFormData>>;
};

const PieceTitle = ({ review, setReview }: FormInputProps) => {
  const [input, setInput] = useState("");
  const [booksSearchResult, setBooksSearchResult] = useState<BookFromGoogle[]>(
    []
  );

  const debouncedSearch = useRef(
    debounce(async (title) => {
      setBooksSearchResult(await searchBooksOnGoogle("title", title));
    }, 200)
  ).current;

  const handleSearchTitleChange = async (title: string) => {
    debouncedSearch(title);
    setInput(title);
  };

  const handleTitleValueChange = (id: string) => {
    const chosenBook = booksSearchResult.find((book) => book.value === id);
    if (chosenBook)
      setReview((prev) => ({ ...prev, reviewedPiece: chosenBook }));
  };

  useEffect(() => {
    if (review.reviewedPiece !== null)
      setBooksSearchResult([review.reviewedPiece]);
  }, []);

  return (
    <Select
      label="Choose a book"
      placeholder="The Night In Lisbon"
      searchable
      value={review.reviewedPiece?.value}
      onChange={handleTitleValueChange}
      searchValue={input}
      onSearchChange={handleSearchTitleChange}
      data={booksSearchResult}
      itemComponent={AutoCompleteItem}
      nothingFound="No books with this title, sorry"
      maxDropdownHeight={280}
      // disabling client-side filtering
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

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
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

export default PieceTitle;
