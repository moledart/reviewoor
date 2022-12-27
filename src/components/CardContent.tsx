import {
  Group,
  Text,
  ActionIcon,
  Loader,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { IoHeart, IoHeartOutline, IoStarOutline } from "react-icons/io5";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useLike } from "../hooks/useLike";
import { useSession } from "next-auth/react";

export const CardContent = ({ reviewId }: { reviewId: string }) => {
  const { data: session } = useSession();

  const {
    data: review,
    isError,
    isLoading,
  } = trpc.review.getById.useQuery({ id: reviewId });

  const theme = useMantineTheme();

  const { data: likes } = trpc.like.getLikes.useQuery({ reviewId });

  const { handleLikeReview } = useLike();

  if (isLoading) return <Loader color="gray" size="sm" />;
  if (isError)
    return (
      <Text color="gray" size="sm">
        Something went wrong
      </Text>
    );

  const { title, author, group, userRating, createdAt } = review!;

  const averageRating =
    userRating.reduce((total, current) => total + current.rating, 0) /
    userRating.length;

  const hasUserLikedAlready = likes?.find(
    (like) => like.userId === session?.user?.id
  );

  return (
    <>
      <Group position="apart" className="w-full">
        <Text fz="10px" transform="uppercase">
          {group.name}
        </Text>
        <Flex className="items-center gap-2">
          <Group className="items-center gap-0">
            <ActionIcon
              variant="transparent"
              onClick={() => handleLikeReview(reviewId)}
            >
              {hasUserLikedAlready ? (
                <IoHeart size={16} className="text-pink-700" />
              ) : (
                <IoHeartOutline size={16} className="text-pink-700" />
              )}
            </ActionIcon>
            {likes?.length && (
              <Text size="xs" color="dimmed" mr={4}>
                {likes?.length}
              </Text>
            )}
          </Group>
          <Group className="items-center gap-0">
            <IoStarOutline size={16} color="gray" />
            <Text size="xs" color="dimmed">
              {averageRating ? averageRating : ""}
            </Text>
          </Group>
        </Flex>
      </Group>
      <Link
        href={`/review/${title}`}
        className="no-underline decoration-zinc-500 underline-offset-4 hover:underline"
      >
        <Text
          fz="20px"
          weight={600}
          lineClamp={2}
          mb={4}
          lh="135%"
          className={
            theme.colorScheme === "light" ? "text-zinc-900" : "text-zinc-200"
          }
        >
          {title}
        </Text>
      </Link>
      <Group spacing="xs">
        <Text size="xs" color="dimmed">
          {createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text size="xs">
          by{" "}
          <Link
            href={`/reviews/${author.name}`}
            className={`no-underline decoration-zinc-500 underline-offset-4 hover:underline ${
              theme.colorScheme === "light" ? "text-zinc-900" : "text-zinc-200"
            }`}
          >
            {author.name}
          </Link>
        </Text>
      </Group>
    </>
  );
};
