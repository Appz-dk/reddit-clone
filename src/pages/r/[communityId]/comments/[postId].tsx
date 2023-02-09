import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getPost } from "../../../../api/getPost";
import { Post } from "../../../../atoms/postsAtom";
import About from "../../../../components/Communities/About";
import PageContent from "../../../../components/Layout/PageContent";
import PostItem from "../../../../components/Posts/Posts/PostItem";
import { auth } from "../../../../firebase/clientApp";
import { useCommunityData } from "../../../../hooks/useCommunityData";
import { usePosts } from "../../../../hooks/usePosts";

const PostViewPage = () => {
  const { postId } = useRouter().query;
  const [user] = useAuthState(auth);
  const { onVote, onDeletePost } = usePosts();
  const { communityStateValue } = useCommunityData();
  const { postStateValue, setPostStateValue } = usePosts();
  const { selectedPost, postVotes } = postStateValue;
  const { currentCommunity } = communityStateValue;

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
