import { Skeleton } from "@mantine/core";

const ReviewSkeleton = () => {
  return (
    <>
      <Skeleton height={20} mb={6} width="60%" />

      <Skeleton height={40} mb={6} />
      <Skeleton height={16} mb={6} width="80%" />

      <Skeleton height={16} mb={6} width="60%" />
      <Skeleton height={16} mb={6} width="60%" />
    </>
  );
};

export default ReviewSkeleton;
