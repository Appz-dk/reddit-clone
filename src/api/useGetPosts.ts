import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Post, postState } from "../atoms/postsAtom";
import { firestore } from "../firebase/clientApp";

// TODO: Maybe change so it's no longer a "custom hook" format, but just a getPosts fuction.
// Like in the getPost.ts
export const useGetPosts = (communityId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const getPosts = async () => {
    if (error) setError("");
    try {
      setLoading(true);
      // Create firebase query for the posts we want
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", `${communityId}`),
        orderBy("createdAt", "desc")
      );
      // get posts from firebase with the query
      const postDocs = await getDocs(postsQuery);
      // Get each documents id and data into an array of objects
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Store in state
      setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));
    } catch (error) {
      console.log("getPosts error", error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  return {
    getPosts,
    loading,
    error,
    postStateValue,
  };
};
