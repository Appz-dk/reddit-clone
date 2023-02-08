import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../../atoms/communitiesAtom";
import { postState } from "../../../../atoms/postsAtom";
import About from "../../../../components/Communities/About";
import PageContent from "../../../../components/Layout/PageContent";
import PostItem from "../../../../components/Posts/Posts/PostItem";
import { auth } from "../../../../firebase/clientApp";
import { usePosts } from "../../../../hooks/usePosts";

const PostViewPage = () => {
  const { currentCommunity } = useRecoilValue(communityState);
  const { onVote, onDeletePost } = usePosts();
  const [user] = useAuthState(auth);
  const { selectedPost, postVotes } = useRecoilValue(postState);

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
