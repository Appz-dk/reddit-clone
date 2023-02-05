import {
  query,
  collection,
  where,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
  writeBatch,
  increment,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import { communityState } from "../atoms/communitiesAtom";
import { Post, postState, PostVote } from "../atoms/postsAtom";
import { auth, firestore, storage } from "../firebase/clientApp";

export const usePosts = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const communityStateValue = useRecoilValue(communityState);

  const onVote = async (post: Post, voteValue: number) => {
    // Check for user, if not user => open auth modal
    if (!user) {
      setAuthModalState({ view: "login", open: true });
      return;
    }

    setLoading(true);
    try {
      const { communityId } = post;
      const existingVoteIndex = postStateValue.postVotes.findIndex(
        (vote) => vote.postId === post.id
      );

      let voteChange = voteValue;
      let updatedPost = { ...post };
      let updatedPostVotes = [...postStateValue.postVotes];
      let updatedPosts = [...postStateValue.posts];

      // Setup batch writes
      const batch = writeBatch(firestore);

      // no existingVote, so have to create a new one
      if (existingVoteIndex === -1) {
        console.log("no votes exists", existingVoteIndex);
        const docRef = doc(collection(firestore, "users", `${user?.uid}/postVotes`));

        const newVote: PostVote = {
          id: docRef.id,
          communityId: communityId,
          voteValue: voteChange,
          postId: post.id!,
        };

        // Update db
        batch.set(docRef, newVote);
        // Update votes state
        updatedPostVotes = [...updatedPostVotes, newVote];
        // Update post object
        updatedPost.voteStatus += voteValue;
      } else {
        const existingVote = updatedPostVotes[existingVoteIndex];
        const docRef = doc(firestore, `users/${user?.uid}/postVotes/${existingVote.id}`);

        // Removing existing vote (From upvote, to no upvote)
        if (existingVote.voteValue === voteValue) {
          console.log("Removeing vote", existingVoteIndex);
          voteChange = voteValue * -1;
          // Update db
          batch.delete(docRef);
          // Update votes state
          updatedPostVotes = updatedPostVotes.filter((vote) => vote.id !== existingVote.id);
          // Update post object
          updatedPost.voteStatus += voteChange;
        } else {
          // Reverting previous vote (From upvote, to a downvote)
          // *2 because of a double vote in the oppsite direction.
          voteChange = voteValue * 2;
          // Update db
          batch.update(docRef, {
            voteValue: voteValue,
          });
          // Update votes state
          updatedPostVotes[existingVoteIndex] = {
            ...updatedPostVotes[existingVoteIndex],
            voteValue: voteValue,
          };
          // Update post object
          updatedPost.voteStatus += voteChange;
        }
      }

      // Update posts postStatus number by voteChange amount
      batch.update(doc(firestore, `posts/${post.id}`), {
        voteStatus: increment(voteChange),
      });
      // Commit changes to db
      await batch.commit();
      // Merge post changes with copy of recoil posts
      const postToUpdate = updatedPosts.findIndex((post) => post.id === updatedPost.id);
      updatedPosts[postToUpdate] = updatedPost;
      // Update recoil state
      setPostStateValue((prev) => ({
        ...prev,
        posts: [...updatedPosts],
        postVotes: [...updatedPostVotes],
      }));

      //
    } catch (error: unknown) {
      console.log("onVote error", error);
    }
    setLoading(false);
  };

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

  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesDocs = await getDocs(
      query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("communityId", "==", `${communityId}`)
      )
    );
    // Id already inside of the documents (no need for id: doc.id,)
    const postVotes = postVotesDocs.docs.map((doc) => ({ ...doc.data() })) as PostVote[];
    // Store in recoil state
    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes,
    }));
  };

  // Get getCommunityPostVotes when a user lands on a community page
  useEffect(() => {
    // Have to check for both since the getCommunityPostVotes depends on both values
    if (!user || !communityStateValue.currentCommunity?.id) {
      // Clear postVotes incase of no user
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
      return;
    }
    getCommunityPostVotes(communityStateValue.currentCommunity?.id);
  }, [user, communityStateValue.currentCommunity?.id]);

  // useEffect(() => {
  //   if (!user) {
  //     setPostStateValue((prev) => ({
  //       ...prev,
  //       postVotes: [],
  //     }));
  //   }
  // }, [user]);

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
