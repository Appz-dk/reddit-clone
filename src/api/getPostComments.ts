import { collection, doc, getDoc, getDocs, query, where, } from "firebase/firestore"
import { firestore } from "../firebase/clientApp"

type Comment = {
  id?: string
  postId: string
  body: string
  voteStatus: number
  creatorId: string
}

export const getPostComments = async (postId: string) => {
  const commentsDoc = getDoc(doc(firestore, `comments/${postId}`))
}