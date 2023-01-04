import {
  Avatar,
  Group,
  MantineColor,
  Select,
  SelectItemProps,
  Text,
} from "@mantine/core";
import { forwardRef, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { searchBooksOnGoogle } from "../utils/utils";
import { useAtom } from "jotai";
import reviewForm from "../atoms/reviewFormData";
import { ReviewedPiece } from "@prisma/client";
import { langSwitcherAtom } from "../atoms/lang";
import formLabels from "../lang/formLabels";

const PieceTitle = () => {
  const [input, setInput] = useState("");
  const [booksSearchResult, setBooksSearchResult] = useState<ReviewedPiece[]>(
    []
  );
  const [lang] = useAtom(langSwitcherAtom);
  const [reviewedPiece, setReviewedPiece] = useAtom(
    reviewForm.reviewedPieceAtom
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
    chosenBook ? setReviewedPiece(chosenBook) : setReviewedPiece(null);
  };

  useEffect(() => {
    if (reviewedPiece !== null) setBooksSearchResult([reviewedPiece]);
  }, []);

  return (
    <Select
      label={formLabels.pieceTitle[lang]}
      placeholder="The Night In Lisbon"
      searchable
      value={reviewedPiece?.value}
      onChange={handleTitleValueChange}
      searchValue={input}
      onSearchChange={handleSearchTitleChange}
      data={booksSearchResult || []}
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
      withAsterisk
      clearable
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
            {authors}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export default PieceTitle;
