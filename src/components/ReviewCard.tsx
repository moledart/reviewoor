import { trpc } from "../utils/trpc";
import { Flex, Box, useMantineTheme, Stack, Space } from "@mantine/core";

import { PiecePreview } from "./PiecePreview";
import { CardContent } from "./CardContent";

export const ReviewCard = ({ reviewId }: { reviewId: string }) => {
  const { data: review } = trpc.review.getById.useQuery({ id: reviewId });
  const theme = useMantineTheme();

  return (
    <Flex
      className={`flex-col flex-nowrap md:flex-row ${
        theme.colorScheme === "light" ? "bg-white" : "bg-[#1A1B1E]"
      }`}
    >
      <Box className="basis-1/3">
        {review?.thumbnail && (
          <img
            src={review?.thumbnail}
            className="h-36 w-full object-cover md:h-56"
          />
        )}
      </Box>
      <Stack className="basis-2/3 flex-col items-start gap-0 px-4">
        <CardContent reviewId={reviewId} />
        <Space h="xl" />
        <PiecePreview reviewId={reviewId} />
      </Stack>
    </Flex>
  );
};
