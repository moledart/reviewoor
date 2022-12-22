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
import { FormInputProps } from "./PieceTitle";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../server/firebaseConfig";

const PieceThumbnail = ({ review, setReview }: FormInputProps) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const theme = useMantineTheme();

  const handleChangeThumbnail = (files: FileWithPath[]) => {
    setFiles(files);
    if (files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setReview((prev) => ({ ...prev, thumbnail: imageUrl }));
    }
  };

  useEffect(() => {
    files[0] ? setImageUrl(URL.createObjectURL(files[0])) : setImageUrl(null);
  }, [files]);

  useEffect(() => {
    if (review.thumbnail) {
      setImageUrl(review.thumbnail);
    }
  }, []);

  return (
    <Stack spacing={8}>
      <Text size="sm">Add a thumbnail</Text>

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
              onClick={() => setFiles([])}
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
                Drag images here or click to select files
              </Text>
            </Box>
          </Flex>
        </Dropzone>
      </SimpleGrid>
    </Stack>
  );
};

export default PieceThumbnail;
