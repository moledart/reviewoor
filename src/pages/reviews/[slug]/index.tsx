import { useRouter } from "next/router";
import Navigation from "../../../components/Navigation";
import { trpc } from "../../../utils/trpc";
import { Container, Stack, Text, Title } from "@mantine/core";
import { ReviewCard } from "../../../components/ReviewCard";

const useData = (id: string, slug: string) => {
  if (slug === "author") {
    return trpc.review.getByAuthor.useQuery({ authorId: id });
  }
  if (slug === "tag") {
    return trpc.review.getByTag.useQuery({ tagId: id });
  }
  if (slug === "piece") {
    return trpc.review.getByPiece.useQuery({ pieceId: id });
  }
  return trpc.review.getAll.useQuery();
};

const ReviewsList = () => {
  const router = useRouter();
  const { name, slug, id } = router.query;
  const { data: reviews } = useData(id as string, slug as string);

  return (
    <>
      <Navigation />
      <Container className="pb-12">
        <Stack spacing="lg">
          <Title order={1}>{name}</Title>
          <Stack spacing={32}>
            {reviews?.length === 0 && <Text>Nothing found</Text>}
            {reviews?.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default ReviewsList;
