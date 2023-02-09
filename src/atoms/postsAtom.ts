import { atom } from "recoil"
import { Timestamp } from "firebase/firestore";

export interface Post {
  id?: string;
  title: string;
  body: string;
  imageURL?: string;
  createdAt: Timestamp;

  communityId: string;
  communityImageURL?: string;
  numberOfComments: number;
  voteStatus: number;

  creatorId: string;
  creatorDisplayName: string;
}

export type PostVote = {
  id: string;
  voteValue: number;
  postId: string;
  communityId: string;
}

export interface PostState {
  posts: Post[]
  selectedPost: Post | null
  postVotes: PostVote[]
}

const defaultPostState: PostState = {
  posts: [],
  selectedPost: null,
  postVotes: []
}

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState
})