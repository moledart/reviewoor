import { Rating } from "@mantine/core";
import { UserRating } from "@prisma/client";

const UserRating = ({ userRating }: { userRating: UserRating[] }) => {
  const averageRating =
    userRating.reduce((total, current) => total + current.rating, 0) /
    userRating.length;

  return <Rating value={averageRating} fractions={3} readOnly size="md" />;
};

export default UserRating;
