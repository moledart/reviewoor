import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Navigation from "../components/Navigation";
import {
  Box,
  Card,
  Container,
  Flex,
  Group,
  Text,
  Image,
  Title,
  ActionIcon,
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
import { IoHeart, IoHeartOutline, IoStarOutline } from "react-icons/io5";
import { useLike } from "../hooks/useLike";

type ReviewCardProps = Review & {
  reviewedPiece: ReviewedPiece;
  group: TGroup;
  like: Like[];
  userRating: UserRating[];
  author: User;
  tags: Tag[];
};

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data: reviews } = trpc.review.getTop.useQuery();

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
        <Title order={1} mb={28}>
          Top Stories
        </Title>
        <Carousel
          withControls={false}
          slideGap={40}
          slideSize="25%"
          breakpoints={[
            { maxWidth: "md", slideSize: "50%" },
            { maxWidth: "sm", slideSize: "90%", slideGap: 30 },
          ]}
          align="start"
        >
          {reviews?.map((review) => (
            <Carousel.Slide key={review.id}>
              <TopReviewCard {...review} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </>
  );
};

export default Home;

const TopReviewCard = ({
  author,
  thumbnail,
  title,
  group,
  content,
  createdAt,
  reviewedPiece,
  userRating,
  like,
  id,
}: ReviewCardProps) => {
  const averageRating =
    userRating.reduce((total, current) => total + current.rating, 0) /
    userRating.length;
  const { data: session } = useSession();

  const { handleLikeReview } = useLike();
  const hasUserLikedAlready = like.find(
    (like) => like.userId === session?.user?.id
  );

  return (
    <Card>
      <Card.Section className="relative">
        <Image src={thumbnail} alt={title} className="w-full" />
        <Group position="apart" mt={8}>
          <Text fz="10px" transform="uppercase">
            {group.name}
          </Text>
          <Group className="items-center gap-2">
            <Group className="items-center gap-0">
              <ActionIcon variant="subtle" onClick={() => handleLikeReview(id)}>
                {hasUserLikedAlready ? (
                  <IoHeart size={16} color="red" />
                ) : (
                  <IoHeartOutline size={16} color="dimmed" />
                )}
              </ActionIcon>
              {like.length && (
                <Text size="xs" color="dimmed" mr={4}>
                  {like.length}
                </Text>
              )}
            </Group>
            <Group className="items-center gap-0">
              <IoStarOutline size={16} color="gray" />
              <Text size="xs" color="dimmed">
                {averageRating ? averageRating : ""}
              </Text>
            </Group>
          </Group>
        </Group>
        <Text fz="20px" weight={500} lineClamp={2} mb={4} lh="130%">
          {title}
        </Text>
        <Text size="sm" color="gray.7" lineClamp={3} lh="130%">
          {
            (content as any).content.find(
              (node: any) => node.type === "paragraph"
            ).content[0].text
          }
        </Text>
        <Group mt="md" mb="xs" spacing="xs">
          <Text size="xs" color="dimmed">
            {createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Text size="xs">by {author.name}</Text>
        </Group>
        <PiecePreview {...reviewedPiece} />
      </Card.Section>
    </Card>
  );
};

const PiecePreview = ({ image, label, authors }: ReviewedPiece) => {
  return (
    <Flex className="mt-2 items-center gap-4 rounded-lg p-3" bg="orange.0">
      <Image src={image} alt={label} width={24} />
      <Box>
        <Text fz="14px" lineClamp={1}>
          {label}
        </Text>
        <Text fz="10px" color="dimmed" lineClamp={1}>
          {authors}
        </Text>
      </Box>
    </Flex>
  );
};
