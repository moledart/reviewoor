import { Group, Text, useMantineTheme, Stack, Box, Flex } from "@mantine/core";
import { IoStar } from "react-icons/io5";
import { trpc } from "../utils/trpc";
import PieceSkeleton from "./PieceSkeleton";
import Image from "next/image";
import { useRouter } from "next/router";

export const PiecePreview = ({ reviewId }: { reviewId: string }) => {
  const theme = useMantineTheme();
  const router = useRouter();

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

  const { authors, image, label, id } = reviewedPiece;

  return (
    <Flex
      className={`w-full max-w-[200px] cursor-pointer flex-nowrap gap-2 ${
        theme.colorScheme === "light"
          ? "hover:bg-orange-100"
          : "hover:bg-zinc-700"
      } `}
      bg={theme.colorScheme === "light" ? "orange.0" : "gray.9"}
      onClick={() => router.push(`/reviews/piece?name=${label}&id=${id}`)}
    >
      <Box className="relative  w-16">
        <Image
          src={image}
          alt={label}
          fill={true}
          className="h-full object-cover"
        />
      </Box>
      <Stack spacing={0} py={8} px={8} className="w-full">
        <Text fz="12px" lineClamp={1} fw="600">
          {label}
        </Text>
        <Text fz="12px" color="dimmed" lineClamp={1}>
          {authors}
        </Text>
        <Group className="items-center gap-1">
          <IoStar size={12} />
          <Text fz="12px">{authorRating}</Text>
        </Group>
      </Stack>
    </Flex>
  );
};
