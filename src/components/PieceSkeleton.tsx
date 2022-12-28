import { Group, Skeleton, Stack } from "@mantine/core";

const PieceSkeleton = () => {
  return (
    <>
      <Group>
        <Skeleton height={80} mr={10} radius="xl" width="full" />
        <Stack py={8} pr={8}>
          <Skeleton height={20} mb={4} radius="xl" />
          <Skeleton height={20} mb={4} radius="xl" />
          <Skeleton height={20} mb={4} radius="xl" />
        </Stack>
      </Group>
    </>
  );
};

export default PieceSkeleton;
