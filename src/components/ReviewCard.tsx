import { trpc } from "../utils/trpc";
import {
  Flex,
  Box,
  useMantineTheme,
  Stack,
  Space,
  Skeleton,
} from "@mantine/core";

import { PiecePreview } from "./PiecePreview";
import { CardContent } from "./CardContent";
import Image from "next/image";

export const ReviewCard = ({ reviewId }: { reviewId: string }) => {
  const { data: review } = trpc.review.getById.useQuery({ id: reviewId });
  const theme = useMantineTheme();

  return (
    <Flex
      className={`flex-col flex-nowrap md:flex-row ${
        theme.colorScheme === "light" ? "bg-white" : "bg-[#1A1B1E]"
      }`}
    >
      <Box className="relative h-44 md:h-auto md:basis-1/3">
        {review?.thumbnail ? (
          <Image
            src={review?.thumbnail}
            alt={review.title}
            fill={true}
            className="object-cover"
          />
        ) : (
          <Skeleton className="h-36 w-full" />
        )}
      </Box>
      <Stack className="basis-2/3 flex-col items-start gap-0 md:px-4">
        <CardContent reviewId={reviewId} />
        <Space h="md" />
        <PiecePreview reviewId={reviewId} />
      </Stack>
    </Flex>
  );
};
