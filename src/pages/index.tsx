import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Navigation from "../components/Navigation";
import { Container, Title, Stack, Group, Skeleton } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import {
  Group as TGroup,
  Review as TReview,
  ReviewedPiece as TReviewedPiece,
  UserRating as TUserRating,
  User as TUser,
  Tag as TTag,
} from "@prisma/client";
import { TopReviewCard } from "../components/TopReviewCard";
import homePage from "../lang/homepage";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../atoms/lang";
import { ReviewCard } from "../components/ReviewCard";
import TagsCloud from "../components/TagsCloud";
import ReviewSkeleton from "../components/ReviewSkeleton";
import { useReviews } from "../hooks/useReviews";

export type ReviewCardProps = TReview & {
  group: TGroup;
  userRating: TUserRating[];
  author: TUser;
  tags: TTag[];
  reviewedPiece: TReviewedPiece;
};

const Home: NextPage = () => {
  const { data: topReviews, isLoading: topLoading } =
    trpc.review.getTop.useQuery(undefined, { staleTime: Infinity });
  const { reviews: allReviews, isLoading: allLoading } = useReviews();
  const { data: tags, isLoading: tagsLoading } = trpc.tags.getAll.useQuery(
    undefined,
    { staleTime: Infinity }
  );
  const [lang] = useAtom(langSwitcherAtom);

  return (
    <>
      <Navigation />
      <Container className="pb-12">
        <Stack spacing={40}>
          <Stack spacing="lg">
            <Title order={1}>{homePage.topTitle[lang]}</Title>
            <Carousel
              withControls={false}
              slideGap={32}
              slideSize="25%"
              breakpoints={[
                { maxWidth: "md", slideSize: "50%" },
                { maxWidth: "sm", slideSize: "90%", slideGap: 24 },
              ]}
              align="start"
            >
              {topLoading
                ? Array(4)
                    .fill(1)
                    .map((val, i) => (
                      <Carousel.Slide key={i}>
                        <ReviewSkeleton direction="col" />
                      </Carousel.Slide>
                    ))
                : topReviews?.map((review) => (
                    <Carousel.Slide key={review?.id}>
                      <TopReviewCard review={review as ReviewCardProps} />
                    </Carousel.Slide>
                  ))}
            </Carousel>
          </Stack>
          <Stack spacing="lg">
            <Title order={1}>{homePage.tagsTitle[lang]}</Title>
            {tagsLoading ? (
              <Group spacing="xs">
                {Array(20)
                  .fill(1)
                  .map((val, i) => (
                    <Skeleton height={20} mb={6} width={60} key={i} />
                  ))}
              </Group>
            ) : (
              <TagsCloud tags={tags!} />
            )}
          </Stack>
          <Stack spacing="lg">
            <Title order={1}>{homePage.allReviewsTitle[lang]}</Title>
            <Stack spacing={32}>
              {allLoading
                ? Array(4)
                    .fill(1)
                    .map((val, i) => <ReviewSkeleton key={i} />)
                : allReviews?.map((review) => (
                    <ReviewCard review={review} key={review.id} />
                  ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
