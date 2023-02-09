import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../firebase/clientApp"

export const getPost = async (postId: string) => {
  try {
    const postDoc = await getDoc(doc(firestore, `posts/${postId}`))
    return { id: postDoc.id, ...postDoc.data() }
  } catch (error) {
    console.log("getPost error", error)
  }

}