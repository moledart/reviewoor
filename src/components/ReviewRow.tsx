import { ActionIcon, Group, Text, useMantineColorScheme } from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoTrashOutline } from "react-icons/io5";
import { useDeleteReview } from "../hooks/useDeleteReview";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../atoms/lang";
import {
  Group as TGroup,
  ReviewedPiece,
  Tag,
  User,
  UserRating,
  Review,
} from "@prisma/client";

export const ReviewRow = (
  review: Review & {
    reviewedPiece: ReviewedPiece;
    group: TGroup;
    userRating: UserRating[];
    author: User;
    tags: Tag[];
  }
) => {
  const theme = useMantineColorScheme();
  const [lang] = useAtom(langSwitcherAtom);
  const router = useRouter();
  const { handleDeleteReview } = useDeleteReview();

  return (
    <Group
      className={`group min-h-[52px] flex-col items-start gap-0 p-3 lg:flex-row  lg:items-center lg:gap-2 ${
        theme.colorScheme === "light" ? "hover:bg-zinc-50" : "hover:bg-zinc-900"
      } `}
    >
      <Text color="dimmed" fz={12} className="min-w-[100px]">
        {review.createdAt.toLocaleDateString(
          lang === "ru" ? "ru-RU" : "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )}
      </Text>
      <Group className="w-full flex-nowrap items-center md:flex-row lg:flex-1">
        <Link
          href={`/review/${review.id}`}
          className="no-underline decoration-zinc-500 underline-offset-2 hover:underline"
        >
          <Text
            fz={14}
            weight={600}
            lineClamp={1}
            lh="140%"
            className={
              theme.colorScheme === "light" ? "text-zinc-900" : "text-zinc-200"
            }
          >
            {review.title}
          </Text>
        </Link>
        <Group className="ml-auto flex-nowrap group-hover:flex md:hidden">
          <ActionIcon
            onClick={() => router.push(`/review-editor/${review.id}`)}
          >
            <HiOutlinePencilSquare size={20} />
          </ActionIcon>
          <ActionIcon onClick={() => handleDeleteReview({ id: review.id })}>
            <IoTrashOutline size={20} className="text-pink-500" />
          </ActionIcon>
        </Group>
      </Group>
    </Group>
  );
};
