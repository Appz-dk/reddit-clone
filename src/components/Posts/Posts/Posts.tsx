import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Community } from "../../../atoms/communitiesAtom";
import { useGetPosts } from "../../../api/getPosts";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { usePosts } from "../../../hooks/usePosts";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const { getPosts, postStateValue } = useGetPosts(communityData);
  const { onVote, onDeletePost, onSelectPost } = usePosts();

  useEffect(() => {
    getPosts();
  }, []);

  if (!postStateValue.posts) return <div>no post</div>;

  return (
    <Flex direction="column">
      {postStateValue.posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          userIsCreator={user?.uid === communityData.creatorId}
          onVote={onVote}
          onSelectPost={onSelectPost}
          onDeletePost={onDeletePost}
          userVoteStatus={undefined}
        />
      ))}
    </Flex>
  );
};

export default Posts;
