import { trpc } from "../utils/trpc";
import { Card, useMantineTheme, Space, Skeleton, Box } from "@mantine/core";
import logo from "../../public/logo.png";
import { PiecePreview } from "./PiecePreview";
import { CardContent } from "./CardContent";
import Image from "next/image";
import ReviewSkeleton from "./ReviewSkeleton";

export const TopReviewCard = ({ reviewId }: { reviewId: string }) => {
  const { data: review, isLoading } = trpc.review.getById.useQuery({
    id: reviewId,
  });
  const theme = useMantineTheme();

  if (isLoading) return <ReviewSkeleton direction="col" />;

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
          />
        </Box>
        <CardContent reviewId={reviewId} />
        <Space h="xl" />
        <PiecePreview reviewId={reviewId} />
      </Card.Section>
    </Card>
  );
};
