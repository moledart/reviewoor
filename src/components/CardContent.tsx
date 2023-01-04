import { Group, Text, useMantineTheme, Box, Stack } from "@mantine/core";
import Link from "next/link";
import TagsCloud from "./TagsCloud";
import Like from "./Like";
import UserRating from "./UserRating";
import { ReviewCardProps } from "../pages";
import { User } from "@prisma/client";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../atoms/lang";

export const CardContent = (review: ReviewCardProps) => {
  const theme = useMantineTheme();
  const { id, title, subtitle, author, group, userRating, createdAt, tags } =
    review;
  const [lang] = useAtom(langSwitcherAtom);

  return (
    <Stack spacing={12} className="relative">
      <Stack spacing={4}>
        <Group position="apart">
          <Text fz="10px" transform="uppercase">
            {lang === "ru" ? "Книги" : group.name}
          </Text>
          <Like reviewId={id} />
        </Group>
        <Link
          href={`/review/${id}`}
          className="no-underline decoration-zinc-500 underline-offset-2 hover:underline"
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
  const [lang] = useAtom(langSwitcherAtom);

  return (
    <Group spacing="xs">
      <Text size="xs" color="dimmed">
        {createdAt.toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
      <Text size="xs">
        {lang === "ru" ? "автор" : "by"}{" "}
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
