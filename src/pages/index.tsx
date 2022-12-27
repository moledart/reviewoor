import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Navigation from "../components/Navigation";
import {
  Container,
  Title,
  Stack,
  Badge,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import {
  Group as TGroup,
  Review,
  ReviewedPiece,
  Like,
  UserRating,
  User,
  Tag,
} from "@prisma/client";
import { TopReviewCard } from "../components/TopReviewCard";
import { useRouter } from "next/router";
import homePage from "../lang/homepage";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../atoms/lang";
import { ReviewCard } from "../components/ReviewCard";

export type ReviewCardProps = Review & {
  reviewedPiece: ReviewedPiece;
  group: TGroup;
  like: Like[];
  userRating: UserRating[];
  author: User;
  tags: Tag[];
};

const Home: NextPage = () => {
  const { data: topReviewIds } = trpc.review.getTop.useQuery();
  const { data: reviewIds } = trpc.review.getAll.useQuery();

  // gotta change to most popular tags
  const { data: tags } = trpc.tags.getAll.useQuery();
  const theme = useMantineTheme();
  const [lang] = useAtom(langSwitcherAtom);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Reviewoor</title>
        <meta name="description" content="All reviews in one place" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />
      </Head>
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
            <Group spacing="xs">
              {tags?.map((tag) => (
                <Badge
                  key={tag.id}
                  className={`cursor-pointer lowercase ${
                    theme.colorScheme === "light"
                      ? "hover:text-zinc-900"
                      : "hover:text-pink-600"
                  } `}
                  color="gray"
                  onClick={() => router.push(`/reviews/${tag.name}`)}
                >
                  #{tag.name}
                </Badge>
              ))}
            </Group>
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
