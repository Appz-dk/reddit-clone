import { Flex } from "@chakra-ui/react";
import React from "react";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { usePosts } from "../../../hooks/usePosts";
import PostLoader from "./PostLoader";
import { PostState } from "../../../atoms/postsAtom";

type PostsProps = {
  postStateValue: PostState;
  loading: boolean;
};

const HomePagePosts: React.FC<PostsProps> = ({ postStateValue, loading }) => {
  const [user] = useAuthState(auth);
  const { onVote, onDeletePost, onSelectPost } = usePosts();

  // TODO: Improve the styling of this
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
              onVote={onVote}
              userIsCreator={false} // REMEMBER TO CHANGE
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
              userVoteStatus={
                postStateValue.postVotes.find((vote) => vote.postId === post.id)?.voteValue
              }
              homePage={true}
            />
          ))}
        </Flex>
      )}
    </>
  );
};

export default HomePagePosts;
