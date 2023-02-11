import { Alert, AlertIcon, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoDocumentText } from "react-icons/io5";
import { AiOutlinePicture } from "react-icons/ai";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";
import PostTab from "./PostTab";
import ImageTab from "./ImageTab";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import useSelectImage from "../../../hooks/useSelectImage";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import { useCreateNewPost } from "../../../api/useCreateNewPost";

const formTabs: TabItemType[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Image & Video",
    icon: AiOutlinePicture,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItemType = {
  title: string;
  icon: typeof Icon.arguments;
};

type NewPostFormProps = {
  user: User;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const { createNewPost } = useCreateNewPost();
  const { onSelectImage, selectedImageFile, setSelectedImageFile } = useSelectImage();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postTextContent, setPostTextContent] = useState({
    postTitle: "",
    postText: "",
  });
  const router = useRouter();

  // Create New Post
  const handleCreatePost = async () => {
    if (!user) return;
    if (error) setError("");
    setLoading(true);
    try {
      await createNewPost({ selectedImageFile, postTextContent });
      // redirect the user back to the communityPage
      router.back();
    } catch (error: unknown) {
      console.log("handleCreatePost error", error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  const onPostTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostTextContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Flex direction="column" mt="2" bg="white" borderRadius="4">
      <Flex w="full">
        {formTabs.map((tab) => (
          <TabItem
            key={tab.title}
            item={tab}
            isSelected={tab.title === selectedTab}
            onSetSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p="4">
        {selectedTab === formTabs[0].title && (
          <PostTab
            textState={postTextContent}
            onPostTextChange={onPostTextChange}
            isDisabled={!postTextContent.postTitle}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === formTabs[1].title && (
          <ImageTab
            onSelectImage={onSelectImage}
            selectedFile={selectedImageFile}
            setSelectedImageFile={setSelectedImageFile}
            setSelectedTab={setSelectedTab}
          />
        )}
        {selectedTab !== formTabs[0].title && selectedTab !== formTabs[1].title && (
          <Stack align="center" w="full">
            <Text>Sorry this feature is not implemented yet...</Text>
          </Stack>
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Error while creating post, please retry</Text>
        </Alert>
      )}
    </Flex>
  );
};

export default NewPostForm;
