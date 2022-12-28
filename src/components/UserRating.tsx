import { Group, Text } from "@mantine/core";
import { UserRating } from "@prisma/client";
import { IoStarOutline } from "react-icons/io5";

const UserRating = ({ userRating }: { userRating: UserRating[] }) => {
  const averageRating =
    userRating.reduce((total, current) => total + current.rating, 0) /
    userRating.length;

  return (
    <Group className="items-center gap-1">
      <IoStarOutline size={16} color="gray" />
      <Text size="xs" color="dimmed">
        {averageRating ? averageRating : ""}
      </Text>
    </Group>
  );
};

export default UserRating;
