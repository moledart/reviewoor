import { ActionIcon, Group, Text } from "@mantine/core";
import React from "react";
import { useLike } from "../hooks/useLike";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const Like = ({ reviewId }: { reviewId: string }) => {
  const { data: session } = useSession();

  const { data: likes } = trpc.like.getLikes.useQuery({ reviewId });

  const { handleLikeReview } = useLike();

  const hasUserLikedAlready = likes?.find(
    (like) => like.userId === session?.user?.id
  );
  return (
    <Group className="items-center gap-0">
      <ActionIcon
        variant="transparent"
        onClick={() => handleLikeReview(reviewId)}
      >
        {hasUserLikedAlready ? (
          <IoHeart size={16} className="text-pink-700" />
        ) : (
          <IoHeartOutline size={16} className="text-pink-700" />
        )}
      </ActionIcon>
      {likes?.length && (
        <Text size="xs" color="dimmed" mr={4}>
          {likes?.length}
        </Text>
      )}
    </Group>
  );
};

export default Like;
