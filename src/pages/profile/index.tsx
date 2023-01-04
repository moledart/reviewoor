import Navigation from "../../components/Navigation";
import {
  ActionIcon,
  Center,
  Container,
  Group,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { LoginButton } from "../../components/LoginButton";
import Link from "next/link";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoTrashOutline } from "react-icons/io5";
import { useDeleteReview } from "../../hooks/useDeleteReview";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../../atoms/lang";

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const theme = useMantineColorScheme();
  const { data: reviews } = trpc.review.getByAuthor.useQuery({
    authorId: session?.user?.id!,
  });
  const { handleDeleteReview } = useDeleteReview();
  const [lang] = useAtom(langSwitcherAtom);

  if (!session)
    return (
      <Center className="min-h-screen">
        <LoginButton />
      </Center>
    );

  return (
    <div>
      <Navigation />
      <Container className="pb-12">
        <Title order={1} mb={24}>
          {lang === "ru" ? "Ваши рецензии, " : "Your reviews, "}
          {session?.user?.name}
        </Title>
        <Stack spacing={0}>
          {reviews?.map((review) => (
            <Group
              key={review.id}
              className={`group min-h-[52px] flex-col items-start gap-0 p-3 lg:flex-row  lg:items-center lg:gap-2 ${
                theme.colorScheme === "light"
                  ? "hover:bg-zinc-50"
                  : "hover:bg-zinc-900"
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
                      theme.colorScheme === "light"
                        ? "text-zinc-900"
                        : "text-zinc-200"
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
                  <ActionIcon
                    onClick={() => handleDeleteReview({ id: review.id })}
                  >
                    <IoTrashOutline size={20} className="text-pink-500" />
                  </ActionIcon>
                </Group>
              </Group>
            </Group>
          ))}
        </Stack>
      </Container>
    </div>
  );
};

export default Profile;
