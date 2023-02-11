import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { Post, postState } from "../atoms/postsAtom";
import PageContent from "../components/Layout/PageContent";
import HomePagePosts from "../components/Posts/Posts/HomePagePosts";
import { auth, firestore } from "../firebase/clientApp";

const HomePage: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [loading, setLoading] = useState(false);

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      // Get top 10 most voted posts from firestore
      const postDocs = await getDocs(
        query(collection(firestore, "posts"), orderBy("voteStatus", "desc"), limit(10))
      );
      const posts = postDocs.docs.map((post) => ({ id: post.id, ...post.data() }));
      // Store in post state
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("buildNoUserHomeFeed error", error);
    }
    setLoading(false);
  };

  // Home feed if no user is logged in
  useEffect(() => {
    if (user && !loadingUser) {
      buildNoUserHomeFeed();
    }
  }, [user, loadingUser]);

  return (
    <PageContent>
      <>
        <HomePagePosts postStateValue={postStateValue} loading={loading} />
      </>
      <>{/* Recommendations */}</>
    </PageContent>
  );
};

export default HomePage;
