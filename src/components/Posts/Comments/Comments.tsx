import { Stack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Post } from "../../../atoms/postsAtom";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import NoUser from "./NoUser";

type CommentsProps = {
  user?: User | null;
  selectedPost: Post;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [isCreatingComment, setIsCreatingComment] = useState(false);

  const onCreateComment = async (commentText: string) => {};

  const onDeleteComment = async (comment: any) => {};

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Stack bg="white" align="center" p="4" spacing="4" borderRadius="0 0 4px 4px">
      {user && (
        <CommentInput
          user={user}
          commentText={commentText}
          isCreatingComment={isCreatingComment}
          setCommentText={setCommentText}
          onCreateComment={onCreateComment}
        />
      )}
      {!user && <NoUser />}
      <Comment />
    </Stack>
  );
};

export default Comments;
