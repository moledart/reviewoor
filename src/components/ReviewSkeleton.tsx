import { Flex, Skeleton } from "@mantine/core";

const ReviewSkeleton = ({ direction = "row" }: { direction?: string }) => {
  return (
    <Flex className={`flex-col md:flex-${direction}`}>
      <Skeleton
        className={`mb-4 h-64 ${
          direction === "row" ? "mr-4 md:basis-1/3" : "w-full"
        }`}
      />
      <Flex
        className={`w-full flex-col ${
          direction === "row" ? "md:basis-2/3" : "w-full"
        }`}
      >
        <Skeleton height={20} mb={6} width="60%" />
        <Skeleton height={40} mb={6} />
        <Skeleton height={16} mb={6} width="80%" />
        <Skeleton height={16} mb={6} width="60%" />
        <Skeleton height={16} mb={6} width="60%" />
      </Flex>
    </Flex>
  );
};

export default ReviewSkeleton;
