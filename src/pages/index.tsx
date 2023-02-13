import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post, PostVote } from "../atoms/postsAtom";
import CreatePostLink from "../components/Communities/CreatePostLink";
import Recommendations from "../components/Communities/Recommendations";
import PageContent from "../components/Layout/PageContent";
import HomePagePosts from "../components/Posts/Posts/HomePagePosts";
import { auth, firestore } from "../firebase/clientApp";
import { useCommunityData } from "../hooks/useCommunityData";
import { usePosts } from "../hooks/usePosts";

const HomePage: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const { postStateValue, setPostStateValue } = usePosts();
  const { communityStateValue } = useCommunityData();
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

  const buildUserHomeFeed = async () => {
    setLoading(true);
    try {
      // Get communitySnippet ids for current user
      const snippetIds = communityStateValue.mySnippets.map((snippet) => snippet.communityId);

      // If user is a member of any communities we chose from those
      if (snippetIds.length !== 0) {
        // Get top 10 posts from communities in users communitySnippets
        const postDocs = await getDocs(
          query(
            collection(firestore, "posts"),
            // orderBy("createdAt", "desc"),
            where("communityId", "in", snippetIds),
            limit(10)
          )
        );
        const posts = postDocs.docs.map((post) => ({ id: post.id, ...post.data() }));
        // Store in post state
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        // If user follows no communities
        buildNoUserHomeFeed();
      }
    } catch (error) {
      console.log("buildUserHomeFeed error", error);
    }
    setLoading(false);
  };

  const getUsersPostVotes = async () => {
    setLoading(true);
    try {
      // get ids of posts currently displayed
      const postIds = postStateValue.posts.map((post) => post.id);
      // get postVotes from db macthing the postIds
      const voteDocs = await getDocs(
        query(collection(firestore, `users/${user?.uid}/postVotes`), where("postId", "in", postIds))
      );
      const votes = voteDocs.docs.map((vote) => ({ id: vote.id, ...vote.data() }));
      // Update client side state
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: votes as PostVote[],
      }));
    } catch (error) {
      console.log("getUsersPostVotes error", error);
    }
    setLoading(false);
  };

  // Home feed if no user is logged in
  useEffect(() => {
    if (!user && !loadingUser) {
      buildNoUserHomeFeed();
    }
  }, [user, loadingUser]);

  // Home feed if user
  useEffect(() => {
    if (communityStateValue.snippetsFetched && !loadingUser) {
      buildUserHomeFeed();
    }
  }, [communityStateValue.snippetsFetched, loadingUser]);

  // get users posts votes
  useEffect(() => {
    if (user && postStateValue.posts.length !== 0 && postStateValue.postVotes.length === 0) {
      getUsersPostVotes();
    }

    // TODO: Uncomment clean up if dublicate postVotes data on ohter pages
    // return () => {
    //   setPostStateValue(prev => ({
    //     ...prev,
    //     postVotes: []
    //   }))
    // }
  }, [user, postStateValue.posts, postStateValue.postVotes]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        <HomePagePosts postStateValue={postStateValue} loading={loading} />
      </>
      <>
        <Recommendations />
      </>
    </PageContent>
  );
};

export default HomePage;
