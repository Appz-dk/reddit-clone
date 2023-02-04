import { Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/PostForm/NewPostForm";
import { auth } from "../../../firebase/clientApp";

const SubmitPostPage = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);

  return (
    <PageContent>
      <>
        <Text paddingBlock="3" borderBottom="2px solid white">
          Create a Post
        </Text>
        {user && <NewPostForm user={user} />}
      </>
      <>
        {/* About */}
        <div>Hello</div>
      </>
    </PageContent>
  );
};

export default SubmitPostPage;
