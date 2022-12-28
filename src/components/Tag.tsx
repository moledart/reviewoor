import { Badge, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";

const Tag = ({ tag, id }: { tag: string; id: string }) => {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Badge
      className={`cursor-pointer lowercase ${
        theme.colorScheme === "light"
          ? "hover:text-zinc-900"
          : "hover:text-pink-600"
      } `}
      color="gray"
      onClick={() => router.push(`/reviews/tag?name=${tag}&id=${id}`)}
    >
      #{tag}
    </Badge>
  );
};

export default Tag;
