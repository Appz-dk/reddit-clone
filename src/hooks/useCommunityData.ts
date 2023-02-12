import { Community, CommunitySnippet, communityState } from "../atoms/communitiesAtom"
import { useRecoilState, useSetRecoilState } from "recoil"
import { collection, doc, getDoc, getDocs, increment, writeBatch } from "firebase/firestore"
import { auth, firestore } from "../firebase/clientApp"
import { useAuthState } from "react-firebase-hooks/auth"
import { authModalState } from "../atoms/authModalAtom"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"


export const useCommunityData = () => {
  const router = useRouter()
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState)
  const setAuthModalState = useSetRecoilState(authModalState)
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Get community snippets from the database and store in recoil state
  const getCommunitySnippets = async () => {
    try {
      if (error) setError("")
      setLoading(true)

      const collectionRef = collection(firestore, `users/${user?.uid}/communitySnippets`)
      const communitySnippetsDocs = await getDocs(collectionRef)
      const communitySnippets = communitySnippetsDocs.docs.map(doc => doc.data())

      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: communitySnippets as CommunitySnippet[],
        snippetsFetched: true
      }))

    } catch (error: unknown) {
      console.log("getCommunitySnippets error", error)
      if (error instanceof Error) {
        setError(error.message)
      }
    }
    setLoading(false)
  }

  const getCommunityData = async (communityId: string) => {
    try {
      // TODO: Check if a loading state here is needed
      const communityDoc = await getDoc(doc(firestore, `communities/${communityId}`))
      setCommunityStateValue(prev => ({
        ...prev,
        currentCommunity: { id: communityDoc.id, ...communityDoc.data() } as Community
      }))
    } catch (error: unknown) {
      console.log("getCommunitydata error", error)
      if (error instanceof Error) {
        setError(error.message)
      }
    }

  }

  // Create new community snippet & increment numberOfMembers, using batch write
  const joinCommunity = async (communityData: Community) => {
    try {
      if (error) setError("")
      setLoading(true)

      const snippetInfo: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
        // conditonally adds the key value to this object
        ...(user?.uid === communityData.creatorId && { isModerator: true })
      }
      // Initiate batch
      const batch = writeBatch(firestore)
      // Create community snippet on user in database
      batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id), snippetInfo)
      // Update numberOfMembers in current community
      batch.update(doc(firestore, `communities/${communityData.id}`), {
        numberOfMembers: increment(1)
      })
      // commit batch
      await batch.commit()

      // Reflect updates to community snippets in state
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: [
          ...prev.mySnippets,
          snippetInfo
        ]
      }))

    } catch (error: unknown) {
      console.log("joinCommunity error", error)
      if (error instanceof Error) {
        setError(error.message)
      }
    }
    setLoading(false)
  }

  // Delete community snippets and decrement numberOfMemebers
  const leaveCommunity = async (communityId: string) => {
    try {
      if (error) setError("")
      setLoading(true)
      // From database using batch write
      const batch = writeBatch(firestore)
      batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId))
      batch.update(doc(firestore, `communities/${communityId}`), {
        numberOfMembers: increment(-1)
      })
      await batch.commit()

      // Reflect changes in state
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(snip => snip.communityId !== communityId)
      }))
    } catch (error: unknown) {
      console.log("leaveCommunity error", error)
      if (error instanceof Error) {
        setError(error.message)
      }
    }
    setLoading(false)
  }

  // Function to be called by the UI
  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    if (!user) {
      // if not logged in open auth modal
      setAuthModalState(({ view: "login", open: true }))
      return
    }

    if (isJoined) {
      leaveCommunity(communityData.id)
      return
    }
    // Else join
    joinCommunity(communityData)
  }

  // Get communitySnippets for a user when they log in
  useEffect(() => {
    if (!user) {
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: [],
        snippetsFetched: false
      }))
      return
    }
    getCommunitySnippets()
  }, [user])


  // Solves no communityData on page refresh/links straight to pages without SSR
  useEffect(() => {
    const { communityId } = router.query
    if (!communityStateValue.currentCommunity && communityId && typeof communityId === "string") {
      getCommunityData(communityId);
    }
  }, [communityStateValue.currentCommunity, router.query]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    error,
    loading,
  }
}