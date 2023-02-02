import { Button, Flex, Icon, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoDocumentText } from "react-icons/io5";
import { AiOutlinePicture } from "react-icons/ai";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";

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
  const [postText, setPostText] = useState({
    postTitle: "",
    postText: "",
  });

  const handleCreatePost = async () => {};
  const onSelectImage = () => {};
  const onPostTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPostText((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
      {isSelected === formTabs[0].title && (
        <Flex direction="column" p="4" gap="3">
          <Input
            name="postTitle"
            placeholder="Title"
            fontSize=".8rem"
            onChange={onPostTextChange}
          />
          <Textarea
            name="postText"
            placeholder="Text (optional)"
            fontSize=".8rem"
            onChange={onPostTextChange}
          />
          <Flex justify="end">
            {/* TODO: Change other "sm" buttons to size "xs" ? */}
            {/* And maybe require a min length for post title */}
            <Button size="xs" paddingInline="5" isDisabled={!postText.postTitle}>
              Post
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default NewPostForm;
