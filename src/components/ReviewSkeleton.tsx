import { Skeleton } from "@mantine/core";

const ReviewSkeleton = () => {
  return (
    <>
      <Skeleton height={16} mb={6} radius="xl" width="full" />
      <Skeleton height={27} mb={6} radius="xl" />
      <Skeleton height={27} mb={6} width="70%" radius="xl" />
      <Skeleton height={20} mb={6} radius="xl" />
      <Skeleton height={20} mb={6} width="70%" radius="xl" />
      <Skeleton height={18} mb={6} radius="xl" />
    </>
  );
};

export default ReviewSkeleton;
