import { collection, doc, getDoc, getDocs, orderBy, query, where, } from "firebase/firestore"
import { firestore } from "../firebase/clientApp"


export const getPostComments = async (postId: string) => {
  const commentDocs = await getDocs(
    query(collection(firestore, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "desc"))
  )

  // Document already have the id stored so no need for 'id: doc.id'
  const comments = commentDocs.docs.map(doc => ({ ...doc.data() }))
  return comments
}