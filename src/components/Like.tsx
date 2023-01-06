import { Group, Text } from "@mantine/core";
import { useLike } from "../hooks/useLike";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const Like = ({ reviewId }: { reviewId: string }) => {
  const { data: session } = useSession();

  const { data: likes } = trpc.like.getLikes.useQuery(
    { reviewId },
    { enabled: !!reviewId }
  );

  const { handleLikeReview } = useLike();

  const hasUserLikedAlready = likes?.find(
    (like) => like.userId === session?.user?.id
  );

  return (
    <Group className="items-center gap-0">
      {likes?.length && (
        <Text size="xs" color="dimmed" mr={4}>
          {likes?.length}
        </Text>
      )}
      {hasUserLikedAlready ? (
        <IoHeart
          size={18}
          className="cursor-pointer text-pink-700"
          onClick={() => handleLikeReview(reviewId)}
        />
      ) : (
        <IoHeartOutline
          size={18}
          className="cursor-pointer text-pink-700"
          onClick={() => handleLikeReview(reviewId)}
        />
      )}
    </Group>
  );
};

export default Like;
