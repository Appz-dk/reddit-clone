import { useState } from "react"
import { User } from "firebase/auth"
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import { CommunityType } from "../atoms/communitiesAtom";


type CreateCommunity = {
  communityName: string;
  communityType: CommunityType
}

type useCreateCommunityHook = {
  createCommunity: (communityData: CreateCommunity) => void;
  loading: boolean;
  error: string;
}


const useCreateCommunity = (user?: User | null): useCreateCommunityHook => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const createCommunity = async (communityData: CreateCommunity) => {
    if (error) setError("");

    // Tripple check a user is logged in
    if (!user) {
      setError("You need to be logged in to create a community");
      return;
    }

    // Validate community name (3-21 chars, numbers, letters and '_' allowed)
    if (!/^[\d\w]{3,21}$/.test(communityData.communityName)) {
      setError(
        "Community name can only include letters, numbers, underscores and between 3-21 characters"
      );
      return;
    }

    try {
      setLoading(true);
      // Check if community already exists in database
      const communityDocRef = doc(firestore, "communities", communityData.communityName);

      // A Transaction tries to run document updates at once, and if 1 fail all fail
      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communityData.communityName} is already taken. Please try another one.`);
        }
        // Add doc in firestore db
        transaction.set(communityDocRef, {
          creatorId: user.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityData.communityType,
        });

        // Add community to user's communitySnippet
        transaction.set(doc(firestore, `users/${user.uid}/communitySnippets`, communityData.communityName), {
          communityId: communityData.communityName,
          isModerater: true,
        });
      });
    } catch (error: unknown) {
      console.log("handleCreateCommunity error", error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setLoading(false);
  }

  return { createCommunity, loading, error }
}

export default useCreateCommunity