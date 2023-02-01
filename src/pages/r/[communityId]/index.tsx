import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { Community } from "../../../atoms/communitiesAtom";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
  error: string;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData, error }) => {
  if (error) return <div>{error}</div>;
  if (!communityData) return <div>Does not exists</div>;
  return <div>Welcome to {communityData?.id}</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get community data and pass it to client components
  try {
    // Getting the id of community
    const { communityId } = context.query;
    // Getting the doc ref for the id
    const communityDocRef = doc(firestore, `communities`, `${communityId}`);
    // getting the document
    const communityDoc = await getDoc(communityDocRef);

    // Check if document exists & return props with the document data or ""
    if (communityDoc.exists()) {
      return {
        props: {
          communityData: JSON.parse(
            safeJsonStringify({
              id: communityDoc.id,
              ...communityDoc.data(),
            })
          ),
        },
      };
    } else {
      return { props: { communityData: null } };
    }
  } catch (error: unknown) {
    // Could add an error page here, to show incase of an error
    // console.log("getServerSideProps error in [communityId]", error);
    if (error instanceof Error) {
      return {
        props: {
          error: error.message,
        },
      };
    }
  }
}

export default CommunityPage;
