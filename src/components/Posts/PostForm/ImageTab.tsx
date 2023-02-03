import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

type ImageTabProps = {
  selectedFile?: string;
  setSelectedTab: (tabName: string) => void;
  setSelectedImageFile: (fileURL: string) => void;
  onSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageTab: React.FC<ImageTabProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedTab,
  setSelectedImageFile,
}) => {
  const selectFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex justify="center" align="center" w="full" direction="column" gap="4">
      {!selectedFile && (
        <Flex
          justify="center"
          align="center"
          p="20"
          border="1px dashed"
          borderColor="gray.200"
          w="full"
        >
          <Button
            size="xs"
            paddingInline="4"
            variant="outline"
            onClick={() => selectFileRef.current?.click()}
          >
            Upload
          </Button>
          <input type="file" hidden ref={selectFileRef} onChange={onSelectImage} />
        </Flex>
      )}
      {selectedFile && (
        <>
          <Image src={selectedFile} maxWidth="400px" maxHeight="400px" />
          <Stack direction="row">
            <Button size="xs" paddingInline="4" onClick={() => setSelectedTab("Post")}>
              Back to post
            </Button>
            <Button
              size="xs"
              paddingInline="4"
              variant="outline"
              onClick={() => setSelectedImageFile("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      )}
    </Flex>
  );
};

export default ImageTab;
