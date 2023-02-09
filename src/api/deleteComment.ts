import { doc, increment, writeBatch } from "firebase/firestore"
import { SetterOrUpdater } from "recoil"
import { PostState } from "../atoms/postsAtom"
import { Comment } from "../components/Posts/Comments/CommentItem"
import { firestore } from "../firebase/clientApp"


export const deleteComment = async (comment: Comment, setPostStateValue: SetterOrUpdater<PostState>) => {
  try {
    const batch = writeBatch(firestore)
    batch.delete(doc(firestore, `comments/${comment.id}`))
    batch.update(doc(firestore, `posts/${comment.postId}`), {
      numberOfComments: increment(-1)
    })

    await batch.commit()

    // Update recoil state
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: {
        ...prev.selectedPost!,
        numberOfComments: prev.selectedPost?.numberOfComments! - 1,
      },
    }));
  } catch (error) {
    console.log("deleteComment error", error)
  }
}