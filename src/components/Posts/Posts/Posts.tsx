import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Community } from "../../../atoms/communitiesAtom";
import { useGetPosts } from "../../../api/useGetPosts";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { usePosts } from "../../../hooks/usePosts";
import PostLoader from "./PostLoader";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const { getPosts, postStateValue, loading } = useGetPosts(communityData.id);
  const { onVote, onDeletePost, onSelectPost } = usePosts();

  useEffect(() => {
    // Have to fetch posts everytime communityData changes
    // e.g. user goes to a new community page
    getPosts();
  }, [communityData]);

  if (!postStateValue.posts) return <div>no posts...</div>;

  return (
    <>
      {loading && <PostLoader />}
      {!loading && (
        <Flex direction="column" gap="5">
          {postStateValue.posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              userIsCreator={user?.uid === communityData.creatorId}
              onVote={onVote}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
              userVoteStatus={
                postStateValue.postVotes.find((vote) => vote.postId === post.id)?.voteValue
              }
            />
          ))}
        </Flex>
      )}
    </>
  );
};

export default Posts;
