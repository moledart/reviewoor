import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Navigation from "../components/Navigation";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data: reviews } = trpc.review.getAll.useQuery();
  console.log(reviews);

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
        <Carousel
          withIndicators
          slideSize="33.333333%"
          slideGap="md"
          breakpoints={[
            { maxWidth: "md", slideSize: "50%" },
            { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
          ]}
          align="start"
        >
          {reviews?.map((review) => (
            <Carousel.Slide key={review.id}>
              <Card>
                <Card.Section>
                  <Image
                    src={review.thumbnail}
                    alt="Norway"
                    width={40}
                    height={40}
                  />
                </Card.Section>
                <Card.Section>
                  <SimpleGrid cols={2}>
                    <Image
                      src={review.reviewedPiece.image}
                      alt={review.reviewedPiece.label}
                      width={40}
                      height={40}
                    />
                    <Box>
                      <Text>{review.reviewedPiece.label}</Text>
                      <Text>{review.reviewedPiece.authors}</Text>
                    </Box>
                  </SimpleGrid>
                </Card.Section>
                <Card.Section>
                  <Text fz="10px" mt="md" transform="uppercase">
                    {review.group.name}
                  </Text>
                  <Text fz="24px" weight={500} lineClamp={2} mb={4}>
                    {review.title}
                  </Text>

                  <Text size="md" color="dimmed" lineClamp={2}>
                    {
                      (review?.content as any).content.find(
                        (node: any) => node.type === "paragraph"
                      ).content[0].text
                    }
                  </Text>
                  <Group mt="md" mb="xs" spacing="xs">
                    <Text size="xs" color="dimmed">
                      {review.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                    <Text size="xs">by {review.author.name}</Text>
                  </Group>
                </Card.Section>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </>
  );
};

export default Home;
