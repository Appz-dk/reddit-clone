import { Timestamp } from "firebase/firestore";
import { atom } from "recoil"

// "if you need to define an object structure, use an interface. 
// If you need to create more complex or specific type definitions, use a type."

export type CommunityType = "public" | "restricted" | "private";

export const isCommunityType = (value: string): value is CommunityType => {
  return ["public", "restricted", "private"].includes(value)
}

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  PrivacyType: CommunityType;
  createdAt?: Timestamp;
  imageURL?: string;
}