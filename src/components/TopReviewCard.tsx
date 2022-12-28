import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { Card, Image, useMantineTheme, Space, Skeleton } from "@mantine/core";

import { PiecePreview } from "./PiecePreview";
import { CardContent } from "./CardContent";

export const TopReviewCard = ({ reviewId }: { reviewId: string }) => {
  const { data: review } = trpc.review.getById.useQuery({ id: reviewId });
  const theme = useMantineTheme();

  return (
    <Card
      className={theme.colorScheme === "light" ? "bg-white" : "bg-[#1A1B1E]"}
    >
      <Card.Section className="relative">
        {review?.thumbnail ? (
          <Image
            src={review?.thumbnail}
            alt={review?.title}
            className="w-full"
          />
        ) : (
          <Skeleton className="h-36 w-full" />
        )}
        <CardContent reviewId={reviewId} />
        <Space h="xl" />
        <PiecePreview reviewId={reviewId} />
      </Card.Section>
    </Card>
  );
};
