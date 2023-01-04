import { useEffect, useState } from "react";
import {
  Text,
  Image,
  Stack,
  useMantineTheme,
  Box,
  SimpleGrid,
  Flex,
  CloseButton,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import { useAtom } from "jotai";
import reviewForm from "../atoms/reviewFormData";
import { thumbnailBlobAtom } from "../atoms/thumbnailBlob";
import { langSwitcherAtom } from "../atoms/lang";
import formLabels from "../lang/formLabels";

const PieceThumbnail = () => {
  const [thumbnail] = useAtom(reviewForm.thumbnailAtom);
  const [thumbnailBlob, setThumbnailBlob] = useAtom(thumbnailBlobAtom);
  const [lang] = useAtom(langSwitcherAtom);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const theme = useMantineTheme();
  console.log(thumbnail);

  const handleChangeThumbnail = (files: FileWithPath[]) => {
    setThumbnailBlob(files);
  };

  useEffect(() => {
    thumbnailBlob[0]
      ? setImageUrl(URL.createObjectURL(thumbnailBlob[0]))
      : setImageUrl(null);
  }, [thumbnailBlob]);

  useEffect(() => {
    if (thumbnail) {
      setImageUrl(thumbnail);
    }
  }, []);

  return (
    <Stack spacing={8}>
      <Text size="sm">{formLabels.thumbnail[lang]}</Text>

      <SimpleGrid cols={imageUrl ? 2 : 1}>
        {imageUrl && (
          <Box className="relative">
            <Image
              src={imageUrl}
              imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
            <CloseButton
              className="absolute top-0 right-0 mx-auto"
              title="Remove image"
              iconSize={14}
              onClick={() => setThumbnailBlob([])}
              variant="filled"
            />
          </Box>
        )}
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={handleChangeThumbnail}
          maxFiles={1}
          multiple={false}
          className="flex items-center justify-center"
        >
          <Flex
            style={{ pointerEvents: "none" }}
            className="flex-col items-center justify-center gap-5"
          >
            <Dropzone.Accept>
              <IconUpload
                size={20}
                stroke={1.5}
                color={theme.colors.dark[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={50}
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={50} stroke={1.5} />
            </Dropzone.Idle>
            <Box>
              <Text size="md" inline ta="center">
                {formLabels.filepicker[lang]}
              </Text>
            </Box>
          </Flex>
        </Dropzone>
      </SimpleGrid>
    </Stack>
  );
};

export default PieceThumbnail;
