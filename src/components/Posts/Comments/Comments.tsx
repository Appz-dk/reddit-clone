import { Stack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Post, postState } from "../../../atoms/postsAtom";
import CommentItem, { Comment } from "./CommentItem";
import CommentInput from "./CommentInput";
import NoUser from "./NoUser";
import {
  collection,
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { getPostComments } from "../../../api/getPostComments";

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

  const onCreateComment = async () => {
    if (!user) return;
    setIsCreatingComment(true);
    try {
      // init batch, get docRef and create new comment
      const batch = writeBatch(firestore);
      const commentDocRef = doc(collection(firestore, "comments"));
      const newComment: Comment = {
        id: commentDocRef.id,
        text: commentText,
        creatorId: user.uid,
        creatorDisplayName: (user.displayName?.replaceAll(" ", "") || user.email!.split("@")[0])
          .replaceAll(".", "")
          .trim(),
        communityId: communityId,
        postId: selectedPost.id!,
        postTitle: selectedPost.title,
        createdAt: serverTimestamp() as Timestamp,
      };
      // Set new comment
      batch.set(commentDocRef, newComment);

      // Update numberOfComments on the selected post
      const postDocRef = doc(firestore, `posts/${selectedPost.id}`);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });
      // commit changes
      await batch.commit();

      // Update recoil state
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost!,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        },
      }));
      // Insert the newComment into the beginning of the comments state array
      setComments((prev) => [newComment, ...prev]);
      // reset commentText state
      setCommentText("");
    } catch (error) {
      console.log("onCreateComment error", error);
    }
    setIsCreatingComment(false);
  };

  const onDeleteComment = async (comment: Comment) => {};

  const handleGetPostComments = async () => {
    const comments = await getPostComments(selectedPost.id!);
    setComments(comments as Comment[]);
  };

  useEffect(() => {
    if (selectedPost) {
      handleGetPostComments();
    }
  }, [selectedPost]);

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
          />
        ))}
    </Stack>
  );
};

export default Comments;
