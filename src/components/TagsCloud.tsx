import { Group } from "@mantine/core";
import { Tag as TagType } from "@prisma/client";
import Tag from "./Tag";

const TagsCloud = ({ tags }: { tags: TagType[] }) => {
  return (
    <Group spacing={2}>
      {tags
        ?.sort((a, z) => a.name.localeCompare(z.name))
        .map(({ id, name }) => (
          <Tag tag={name} id={id} key={id} />
        ))}
    </Group>
  );
};

export default TagsCloud;
