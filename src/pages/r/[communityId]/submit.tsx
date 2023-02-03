import { Text } from "@chakra-ui/react";
import React from "react";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/PostForm/NewPostForm";

const SubmitPostPage = () => {
  return (
    <PageContent>
      <>
        <Text paddingBlock="3" borderBottom="2px solid white">
          Create a Post
        </Text>
        <NewPostForm />
      </>
      <>
        {/* About */}
        <div>Hello</div>
      </>
    </PageContent>
  );
};

export default SubmitPostPage;
