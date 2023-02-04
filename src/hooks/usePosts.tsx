import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Post, postState } from "../atoms/postsAtom";
import { firestore } from "../firebase/clientApp";

export const usePosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};
  const onSelectPost = () => {};
  const onDeletePost = async () => {};

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
