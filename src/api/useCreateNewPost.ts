import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRecoilValue } from "recoil"
import { communityState } from "../atoms/communitiesAtom"
import { Post } from "../atoms/postsAtom"
import { auth, firestore, storage } from "../firebase/clientApp"
import { uploadImageToStorage } from "./uploadImageToStorage"

interface CreateNewPost {
  selectedImageFile?: string,
  postTextContent: {
    postTitle: string,
    postText: string,
  }
}

export const useCreateNewPost = () => {
  const [user] = useAuthState(auth)
  const { currentCommunity } = useRecoilValue(communityState);

  const createNewPost = async ({ selectedImageFile, postTextContent }: CreateNewPost) => {
    if (!user || !currentCommunity) return
    try {
      // Create new post object
      const newPost: Post = {
        title: postTextContent.postTitle,
        body: postTextContent.postText,
        communityId: currentCommunity.id,
        creatorDisplayName: (user.displayName?.replaceAll(" ", "") || user.email!.split("@")[0])
          .replaceAll(".", "")
          .trim(),
        creatorId: user?.uid,
        createdAt: serverTimestamp() as Timestamp,
        voteStatus: 0,
        numberOfComments: 0,
        // Check if current community have a imageURL & add it to the object
        ...(currentCommunity?.imageURL && { communityImageURL: currentCommunity.imageURL }),
      };

      // store post in database
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      // check for selctedFile
      if (selectedImageFile) {
        const imageDownloadUrl = await uploadImageToStorage({
          storage,
          url: `posts/${postDocRef.id}/image`,
          file: selectedImageFile,
        });
        // Update post document by adding imageURL
        await updateDoc(postDocRef, {
          imageURL: imageDownloadUrl,
        });
      }

    } catch (error) {
      throw error
    }
  }

  return { createNewPost }
}