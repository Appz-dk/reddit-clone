import { Box, Button, Divider, Flex, Icon, Image, Input, Spinner, Text } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaReddit } from "react-icons/fa";
import { RiCakeLine } from "react-icons/ri";
import { useSetRecoilState } from "recoil";
import { uploadImageToStorage } from "../../api/uploadImageToStorage";
import { Community, communityState } from "../../atoms/communitiesAtom";
import { auth, firestore, storage } from "../../firebase/clientApp";
import useSelectImage from "../../hooks/useSelectImage";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const setCommunityStateValue = useSetRecoilState(communityState);
  const { onSelectImage, selectedImageFile } = useSelectImage();
  const [uploadingImage, setUploadingImage] = useState(false);
  const selectFileRef = useRef<HTMLInputElement>(null);

  const handleUpdateImage = async () => {
    if (!selectedImageFile) return;
    setUploadingImage(true);
    try {
      const downloadUrl = await uploadImageToStorage({
        storage,
        url: `communities/${communityData.id}/image`,
        file: selectedImageFile,
      });
      // Update communityDoc with downloadUrl
      await updateDoc(doc(firestore, `communities/${communityData.id}`), { imageURL: downloadUrl });
      // Update community recoil state
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity!,
          imageURL: downloadUrl,
        },
      }));
    } catch (error) {}
    setUploadingImage(false);
  };

  const createdDate = communityData.createdAt
    ? moment(communityData.createdAt?.seconds * 1000).format("d MMM, yyyy")
    : null;

  return (
    <Box position="sticky" top="2">
      <Flex
        justify="space-between"
        align="center"
        bg="blue.400"
        p="2.5"
        borderTopRadius="4"
        color="white"
        fontWeight="600"
        fontSize=".75rem"
      >
        <Text>About Community</Text>
        <Icon as={BiDotsHorizontalRounded} fontSize=".9rem" />
      </Flex>
      <Box bg="white" p="2" borderBottomRadius="4">
        <Flex p="2" fontSize=".75rem" fontWeight="600">
          <Flex flexGrow="1" direction="column">
            <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
            <Text>Members</Text>
          </Flex>
          <Flex flexGrow="1" direction="column">
            <Text>1</Text>
            <Text>Online</Text>
          </Flex>
        </Flex>
        <Divider />
        <Flex p="2" gap="2" align="center" fontSize=".75rem" fontWeight="600">
          {createdDate && (
            <>
              <Icon as={RiCakeLine} fontSize=".85rem" />
              <Text>{`Created ${createdDate}`}</Text>
            </>
          )}
        </Flex>
        <Flex justify="center" mt="1" w="full">
          <Link href={`/r/${communityData.id}/submit`} style={{ width: "100%", marginLeft: "10%" }}>
            <Button size="xm" fontWeight="600" paddingBlock="1.5" w="90%">
              create post
            </Button>
          </Link>
        </Flex>
        {user?.uid === communityData.creatorId && (
          <Box mt="4" fontSize=".75rem">
            <Divider />
            <Text p="2" mt="1" fontWeight="600">
              Admin
            </Text>
            <Flex p="2" align="center" justify="space-between">
              <Text
                cursor="pointer"
                color="blue.400"
                _hover={{ textDecoration: "underline" }}
                onClick={() => selectFileRef.current?.click()}
              >
                Change Image
              </Text>
              <Input
                type="file"
                hidden
                ref={selectFileRef}
                accept="image/x-png,image/gif,image/jpeg"
                onChange={onSelectImage}
              />
              {selectedImageFile || communityData.imageURL ? (
                <Image
                  src={selectedImageFile || communityData.imageURL}
                  width="10"
                  alt="community logo"
                />
              ) : (
                <Icon
                  as={FaReddit}
                  fontSize="3rem"
                  color="brand.100"
                  padding="4px"
                  bg="white"
                  borderRadius="100%"
                />
              )}
            </Flex>
            {selectedImageFile && (
              <Box p="2">
                {!uploadingImage && (
                  <Text
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={handleUpdateImage}
                  >
                    Save Changes
                  </Text>
                )}
                {uploadingImage && <Spinner size="sm" />}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default About;
