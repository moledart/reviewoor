import { Group, Text, useMantineTheme, Box, Stack } from "@mantine/core";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import ReviewSkeleton from "./ReviewSkeleton";
import { User } from "@prisma/client";
import TagsCloud from "./TagsCloud";
import Like from "./Like";
import UserRating from "./UserRating";

export const CardContent = ({ reviewId }: { reviewId: string }) => {
  const {
    data: review,
    isError,
    isLoading,
  } = trpc.review.getById.useQuery({
    id: reviewId,
  });

  const theme = useMantineTheme();

  if (isLoading) return <ReviewSkeleton />;
  if (isError)
    return (
      <Text color="gray" size="sm">
        Something went wrong
      </Text>
    );

  const { title, subtitle, author, group, userRating, createdAt, tags } =
    review!;

  return (
    <Stack spacing={12} className="relative">
      <Stack spacing={4}>
        <Group position="apart">
          <Text fz="10px" transform="uppercase">
            {group.name}
          </Text>
          <Like reviewId={reviewId} />
        </Group>
        <Link
          href={`/review/${reviewId}`}
          className="no-underline decoration-zinc-500 underline-offset-4 hover:underline"
        >
          <Text
            fz="20px"
            weight={600}
            lineClamp={2}
            lh="140%"
            className={
              theme.colorScheme === "light" ? "text-zinc-900" : "text-zinc-200"
            }
          >
            {title}
          </Text>
        </Link>
        <ReviewAuthorAndDate author={author} createdAt={createdAt} />
      </Stack>
      {userRating.length > 0 && <UserRating userRating={userRating} />}
      <Text
        fz="14px"
        lineClamp={3}
        lh="135%"
        className={
          theme.colorScheme === "light" ? "text-zinc-600" : "text-zinc-200"
        }
      >
        {subtitle}
      </Text>
      <TagsCloud tags={tags} />
    </Stack>
  );
};

export const ReviewAuthorAndDate = ({
  author,
  createdAt,
}: {
  author: User;
  createdAt: Date;
}) => {
  const theme = useMantineTheme();

  return (
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
          href={`/reviews/author?name=${author.name}&id=${author.id}`}
          className={`no-underline decoration-zinc-500 underline-offset-4 hover:underline ${
            theme.colorScheme === "light" ? "text-zinc-900" : "text-zinc-200"
          }`}
        >
          {author.name}
        </Link>
      </Text>
    </Group>
  );
};
