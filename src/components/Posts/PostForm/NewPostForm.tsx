import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoDocumentText } from "react-icons/io5";
import { AiOutlinePicture } from "react-icons/ai";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";
import PostTab from "./PostTab";
import ImageTab from "./ImageTab";

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
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
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

      // Create new post object => type Post

      // store post in database

      // check for selctedFile
      // store image in firebase storage => getDownloadURL (returns imageURL)
      // Update post document by adding imageURL

      // redirect the user back to the communityPage using router
    } catch (error: unknown) {
      console.log("handleCreatePost error", error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow excatly 1 file to be uploaded
    if (!e.target.files || e.target.files.length > 1) return;

    // Using the FileReader
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      // Makes sure it's not null && an array of files
      if (readerEvent.target?.result && !(readerEvent.target?.result instanceof ArrayBuffer)) {
        setSelectedImageFile(readerEvent.target.result);
      }
    };
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
    </Flex>
  );
};

export default NewPostForm;
