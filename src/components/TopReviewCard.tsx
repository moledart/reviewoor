import { Card, useMantineTheme, Space, Box } from "@mantine/core";
import logo from "../../public/logo.png";
import { PiecePreview } from "./PiecePreview";
import { CardContent } from "./CardContent";
import Image from "next/image";
import { ReviewCardProps } from "../pages";

export const TopReviewCard = ({ review }: { review: ReviewCardProps }) => {
  const theme = useMantineTheme();

  return (
    <Card
      className={theme.colorScheme === "light" ? "bg-white" : "bg-[#1A1B1E]"}
    >
      <Card.Section className="relative">
        <Box className="relative mb-2 h-64 w-full">
          <Image
            src={review?.thumbnail || logo}
            alt={review?.title as string}
            fill={true}
            className="object-cover"
            priority
            quality={50}
            placeholder="blur"
            blurDataURL="/favicon/favicon-16x16.png"
          />
        </Box>
        <CardContent {...review} />
        <Space h="xl" />
        <PiecePreview
          reviewedPiece={review.reviewedPiece}
          authorRating={review.authorRating}
        />
      </Card.Section>
    </Card>
  );
};
