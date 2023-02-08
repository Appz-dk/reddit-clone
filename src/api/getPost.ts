import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../firebase/clientApp"

export const getPost = async (postId: string) => {
  const postDoc = await getDoc(doc(firestore, `posts/${postId}`))
  return postDoc.data()
}