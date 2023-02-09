import { Stack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Post } from "../../../atoms/postsAtom";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

type CommentsProps = {
  user: User;
  selectedPost: Post;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
  const [commentText, setCommentText] = useState("");

  const onCreateComment = async (commentText: string) => {};

  const onDeleteComment = async (comment: any) => {};

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Stack bg="white" p="4" spacing="4" borderRadius="0 0 4px 4px">
      <CommentInput user={user} commentText={commentText} setCommentText={setCommentText} />
      <Comment />
    </Stack>
  );
};

export default Comments;
