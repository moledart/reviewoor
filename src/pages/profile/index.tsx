import Navigation from "../../components/Navigation";
import { Center, Container, Loader, Stack, Text, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { LoginButton } from "../../components/LoginButton";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../../atoms/lang";
import { ReviewRow } from "../../components/ReviewRow";

const Profile = () => {
  const { data: session } = useSession();
  const [lang] = useAtom(langSwitcherAtom);
  const userId = session?.user?.id;
  const {
    data: reviews,
    isLoading,
    isError,
  } = trpc.review.getByAuthor.useQuery(
    {
      authorId: userId as string,
    },
    {
      enabled: !!userId,
      staleTime: Infinity,
    }
  );

  if (isLoading)
    return (
      <Center className="h-screen">
        <Loader color="dark" />
      </Center>
    );

  if (isError)
    return (
      <Center className="h-screen">
        <Text>Sorry, something went wrong!</Text>
      </Center>
    );

  if (!session?.user)
    return (
      <Center className="flex min-h-screen flex-col gap-4">
        <Text>You need to login first</Text>
        <LoginButton />
      </Center>
    );

  return (
    <div>
      <Navigation />
      <Container className="pb-12">
        <Title order={1} mb={24}>
          {lang === "ru" ? "Ваши рецензии, " : "Your reviews, "}
          {session.user.name}
        </Title>
        <Stack spacing={0}>
          {reviews.length ? (
            reviews?.map((review) => <ReviewRow {...review} key={review.id} />)
          ) : (
            <Text>You have no reviews yet. Start writing!</Text>
          )}
        </Stack>
      </Container>
    </div>
  );
};

export default Profile;
