import { User } from "firebase/auth";
import { writeBatch, doc, collection, serverTimestamp, Timestamp, increment } from "firebase/firestore";
import { SetterOrUpdater } from "recoil";
import { Post } from "../atoms/postsAtom";
import { Comment } from "../components/Posts/Comments/CommentItem";
import { firestore } from "../firebase/clientApp";
import { PostState } from "../atoms/postsAtom";


interface CreateNewComment {
  user: User
  commentText: string
  communityId: string
  selectedPost: Post
  setPostStateValue: SetterOrUpdater<PostState>
}

export const createNewComment = async ({ user, commentText, communityId, selectedPost, setPostStateValue }: CreateNewComment) => {
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

    // Have to adjust the createdAt field before returning the newComment
    // since the serverTimestamp function is only called on the server
    // if we do not do this and store the comment in state, the time will show as invalid,
    // until comments are fetched again from the database.
    const fakeTimestamp = { seconds: Date.now() / 1000 } as Timestamp;
    newComment.createdAt = fakeTimestamp
    return newComment
  } catch (error) {
    throw error
  }
}