import { query, collection, where, orderBy, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Post, postState } from "../atoms/postsAtom";
import { firestore, storage } from "../firebase/clientApp";

export const usePosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async (post: Post, vote: number) => {};

  const onSelectPost = () => {};

  const onDeletePost = async (post: Post): Promise<boolean> => {
    // TODO: Decide if loading state here is necessary
    // And check if error state is necessary
    if (error) setError("");
    setLoading(true);
    try {
      // Check if post has an image & delete from storage
      if (post.imageURL) {
        await deleteObject(ref(storage, `posts/${post.id}/image`));
      }
      // Delete post doc from firestore
      await deleteDoc(doc(firestore, `posts/${post.id}`));
      // Update recoil state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((storedPost) => storedPost.id !== post.id),
      }));

      setLoading(false);
      return true;
    } catch (error) {
      console.log("onDeletePost error", error);
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    error,
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};
