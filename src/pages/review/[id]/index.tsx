import { useRouter } from "next/router";
import Navigation from "../../../components/Navigation";
import { trpc } from "../../../utils/trpc";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
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
import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { IoDocumentTextOutline } from "react-icons/io5";

const ReviewReader = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    data: review,
    isLoading,
    isError,
  } = trpc.review.getFullContentById.useQuery(
    {
      id: router.query.id as string,
    },
    {
      staleTime: Infinity,
      enabled: !!router.query.id,
    }
  );

  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element as HTMLElement);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth() - 200;
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(data, "PNG", 100, 0, pdfWidth, pdfHeight);
    pdf.save("print.pdf");
  };

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

  return (
    <>
      <Navigation />
      <Container className="max-w-[80ch] pb-12" ref={printRef}>
        {review && (
          <Stack spacing={24}>
            <Flex className="relative h-60 md:h-96">
              <Image
                src={review?.thumbnail || logo}
                alt={review.title}
                fill={true}
                className="object-cover"
                priority
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
            <Box>
              <Button
                leftIcon={<IoDocumentTextOutline />}
                onClick={handleDownloadPdf}
                variant="default"
                color="dark"
                size="xs"
              >
                Download PDF
              </Button>
            </Box>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default ReviewReader;
