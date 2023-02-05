import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Community } from "../atoms/communitiesAtom";
import { Post, postState } from "../atoms/postsAtom";
import { firestore } from "../firebase/clientApp";

export const useGetPosts = (communityData: Community) => {
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
        where("communityId", "==", `${communityData.id}`),
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
