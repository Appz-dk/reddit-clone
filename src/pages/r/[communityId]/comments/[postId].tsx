import { stringLength } from "@firebase/util";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { getPost } from "../../../../api/getPost";
import { communityState } from "../../../../atoms/communitiesAtom";
import { Post, postState } from "../../../../atoms/postsAtom";
import About from "../../../../components/Communities/About";
import PageContent from "../../../../components/Layout/PageContent";
import PostItem from "../../../../components/Posts/Posts/PostItem";
import { auth } from "../../../../firebase/clientApp";
import { usePosts } from "../../../../hooks/usePosts";

const PostViewPage = () => {
  const { postId } = useRouter().query;
  const { currentCommunity } = useRecoilValue(communityState);
  const { onVote, onDeletePost } = usePosts();
  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const { selectedPost, postVotes } = postStateValue;

  // Solves the no post on refresh problem
  useEffect(() => {
    if (!selectedPost && postId && typeof postId === "string") {
      (async () => {
        const post = await getPost(postId);
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: post as Post,
        }));
      })();
    }
  }, [selectedPost, postId]);

  return (
    <PageContent>
      <>
        {/* Right side content */}
        {selectedPost && (
          <PostItem
            post={selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userIsCreator={selectedPost?.creatorId === user?.uid}
            userVoteStatus={postVotes.find((vote) => vote.postId === selectedPost.id)?.voteValue}
          />
        )}
        {/* Comments */}
      </>
      <>
        {/* Left side content */}
        {currentCommunity && <About communityData={currentCommunity} />}
      </>
    </PageContent>
  );
};

export default PostViewPage;
