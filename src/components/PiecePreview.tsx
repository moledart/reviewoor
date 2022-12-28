import {
  Group,
  Text,
  Image,
  useMantineTheme,
  Stack,
  Box,
  Flex,
  Loader,
} from "@mantine/core";
import { IoStar } from "react-icons/io5";
import { trpc } from "../utils/trpc";
import PieceSkeleton from "./PieceSkeleton";

export const PiecePreview = ({ reviewId }: { reviewId: string }) => {
  const theme = useMantineTheme();

  const {
    data: review,
    isError,
    isLoading,
  } = trpc.review.getById.useQuery({ id: reviewId });

  if (isLoading) return <PieceSkeleton />;
  if (isError)
    return (
      <Text color="gray" size="sm">
        Something went wrong
      </Text>
    );

  const { reviewedPiece, authorRating } = review!;

  const { authors, image, label } = reviewedPiece;

  return (
    <Group
      className="h-20 flex-nowrap overflow-hidden rounded"
      spacing={8}
      bg={theme.colorScheme === "light" ? "orange.0" : "gray.9"}
    >
      <Box className="h-full">
        <img src={image} className="h-full object-cover" />
      </Box>
      <Stack spacing={0} py={8} pr={8} className="flex-1">
        <Text fz="14px" lineClamp={1}>
          {label}
        </Text>
        <Group className="items-center gap-1">
          <IoStar size={14} color="" />
          <Text size="xs" color="dimmed">
            {authorRating}
          </Text>
        </Group>
        <Text fz="12px" color="dimmed" lineClamp={1}>
          {authors}
        </Text>
      </Stack>
    </Group>
  );
};
