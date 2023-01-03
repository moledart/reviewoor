import { useRouter } from "next/router";
import Navigation from "../../../components/Navigation";
import { trpc } from "../../../utils/trpc";
import { Container, Flex, Group, Stack, Text, Title } from "@mantine/core";
import { ReviewAuthorAndDate } from "../../../components/CardContent";
import Like from "../../../components/Like";
import UserRating from "../../../components/UserRating";

import logo from "../../../../public/logo.png";
import TagsCloud from "../../../components/TagsCloud";
import { useSession } from "next-auth/react";
import ReviewRating from "../../../components/ReviewRating";
import { PiecePreview } from "../../../components/PiecePreview";
import Image from "next/image";
import ReviewContent from "../../../components/ReviewContent";

const ReviewReader = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: review } = trpc.review.getFullContentById.useQuery({
    id: router.query.id as string,
  });

  return (
    <>
      <Navigation />
      <Container className="max-w-[80ch] pb-12">
        {review && (
          <Stack spacing={24}>
            <Flex className="relative h-60 md:h-96">
              <Image
                src={review?.thumbnail || logo}
                alt={review.title}
                fill={true}
                className="object-cover"
              />
            </Flex>
            <Stack spacing={8}>
              <Title>{review.title}</Title>
              <Group position="apart">
                <ReviewAuthorAndDate
                  author={review?.author}
                  createdAt={review?.createdAt}
                />
                <Flex className="items-center gap-2">
                  <Like reviewId={review.id} />
                  <UserRating userRating={review.userRating} />
                </Flex>
              </Group>
              <Text>{review.subtitle}</Text>
            </Stack>
            <PiecePreview
              reviewedPiece={review.reviewedPiece}
              authorRating={review.authorRating}
            />
            <ReviewContent content={review.content} />
            <TagsCloud tags={review.tags} />
            {session?.user && (
              <ReviewRating reviewId={review.id} userId={session.user.id} />
            )}
          </Stack>
        )}
      </Container>
    </>
  );
};

export default ReviewReader;
