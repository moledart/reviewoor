import { Flex, Box, useMantineTheme, Stack, Space } from "@mantine/core";
import logo from "../../public/logo.png";
import { PiecePreview } from "./PiecePreview";
import { CardContent } from "./CardContent";
import Image from "next/image";
import { ReviewCardProps } from "../pages";

export const ReviewCard = ({ review }: { review: ReviewCardProps }) => {
  const theme = useMantineTheme();

  return (
    <Flex
      className={`flex-col flex-nowrap md:flex-row ${
        theme.colorScheme === "light" ? "bg-white" : "bg-[#1A1B1E]"
      }`}
    >
      <Box className="relative mb-2 h-64 md:mb-0 md:h-auto md:basis-1/3">
        <Image
          src={review?.thumbnail || logo}
          alt={review?.title as string}
          fill={true}
          className="object-cover"
        />
      </Box>
      <Stack className="basis-2/3 flex-col items-start gap-0 md:px-4">
        <CardContent {...review} />
        <Space h="md" />
        <PiecePreview
          reviewedPiece={review.reviewedPiece}
          authorRating={review.authorRating}
        />
      </Stack>
    </Flex>
  );
};
