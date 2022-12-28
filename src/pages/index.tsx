import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Navigation from "../components/Navigation";
import { Container, Title, Stack, Group } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import {
  Group as TGroup,
  Review,
  ReviewedPiece,
  Like,
  UserRating,
  User,
  Tag as TagType,
} from "@prisma/client";
import { TopReviewCard } from "../components/TopReviewCard";
import homePage from "../lang/homepage";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../atoms/lang";
import { ReviewCard } from "../components/ReviewCard";
import Tag from "../components/Tag";
import TagsCloud from "../components/TagsCloud";

export type ReviewCardProps = Review & {
  reviewedPiece: ReviewedPiece;
  group: TGroup;
  like: Like[];
  userRating: UserRating[];
  author: User;
  tags: TagType[];
};

const Home: NextPage = () => {
  const { data: topReviewIds } = trpc.review.getTop.useQuery();
  const { data: reviewIds } = trpc.review.getAll.useQuery();

  // gotta change to most popular tags
  const { data: tags } = trpc.tags.getAll.useQuery();
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
              {topReviewIds?.map(({ id }) => (
                <Carousel.Slide key={id}>
                  <TopReviewCard reviewId={id} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Stack>
          <Stack spacing="lg">
            <Title order={1}>{homePage.tagsTitle[lang]}</Title>
            {tags && <TagsCloud tags={tags} />}
          </Stack>
          <Stack spacing="lg">
            <Title order={1}>{homePage.allReviewsTitle[lang]}</Title>
            <Stack spacing={32}>
              {reviewIds?.map(({ id }) => (
                <ReviewCard reviewId={id} key={id} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
