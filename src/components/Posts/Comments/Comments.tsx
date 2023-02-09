import { Stack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Post, postState } from "../../../atoms/postsAtom";
import CommentItem, { Comment } from "./CommentItem";
import CommentInput from "./CommentInput";
import NoUser from "./NoUser";
import { useSetRecoilState } from "recoil";
import { getPostComments } from "../../../api/getPostComments";
import { createNewComment } from "../../../api/createNewComment";
import { deleteComment } from "../../../api/deleteComment";
import { Timestamp } from "firebase/firestore";

type CommentsProps = {
  user?: User | null;
  selectedPost: Post;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
  const setPostStateValue = useSetRecoilState(postState);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  const onCreateComment = async () => {
    if (!user) return;
    setIsCreatingComment(true);
    try {
      const newComment = await createNewComment({
        commentText,
        communityId,
        selectedPost,
        user,
        setPostStateValue,
      });
      // Add new comment to start of comments array & reset commentText state
      setComments((prev) => [newComment, ...prev]);
      setCommentText("");
    } catch (error) {
      console.log("onCreateComment error", error);
    }
    setIsCreatingComment(false);
  };

  const onDeleteComment = async (comment: Comment) => {
    setIsDeletingComment(true);
    await deleteComment(comment, setPostStateValue);
    setComments((prev) => prev.filter((prev) => prev.id !== comment.id));
    setIsDeletingComment(false);
  };

  const handleGetPostComments = async () => {
    setLoadingComments(true);
    const comments = await getPostComments(selectedPost.id!);
    setComments(comments as Comment[]);
    setLoadingComments(false);
  };

  useEffect(() => {
    console.log("fecting comments");
    handleGetPostComments();
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
      {comments &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userIsCreator={comment.creatorId === user?.uid}
            onDeleteComment={onDeleteComment}
            isDeletingComment={isDeletingComment}
          />
        ))}
    </Stack>
  );
};

export default Comments;
