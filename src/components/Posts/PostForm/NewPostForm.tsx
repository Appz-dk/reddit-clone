import { Button, Flex, Icon, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoDocumentText } from "react-icons/io5";
import { AiOutlinePicture } from "react-icons/ai";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";
import PostTab from "./PostTab";

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

const NewPostForm = () => {
  const [isSelected, setIsSelected] = useState(formTabs[0].title);
  const [selectedImageFile, setSelectedImageFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postTextContent, setPostTextContent] = useState({
    postTitle: "",
    postText: "",
  });

  const handleCreatePost = async () => {
    try {
      if (error) setError("");
      setLoading(true);
    } catch (error: unknown) {
      console.log("handleCreatePost error", error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  const onSelectImage = () => {};
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
            isSelected={tab.title === isSelected}
            onSetSelectedTab={setIsSelected}
          />
        ))}
      </Flex>
      <Flex p="4">
        {isSelected === formTabs[0].title && (
          <PostTab
            textState={postTextContent}
            onPostTextChange={onPostTextChange}
            isDisabled={!postTextContent.postTitle}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
