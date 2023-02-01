import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { Community } from "../../../atoms/communitiesAtom";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/Communities/NotFound";
import CommunityError from "../../../components/Communities/CommunityError";
import Header from "../../../components/Communities/Header";
import PageContent from "../../../components/Layout/PageContent";

type CommunityPageProps = {
  communityData: Community;
  error: string;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData, error }) => {
  if (error) return <CommunityError errorMessage={error} />;
  if (!communityData) return <NotFound />;

  return (
    <>
      <Header communityName={communityData.id} />
      <PageContent>
        <>
          <div>Right Side</div>
          <div>Right Side</div>
          <div>Right Side</div>
          <div>Right Side</div>
        </>
        <>
          <div>Left Side</div>
          <div>Left Side</div>
          <div>Left Side</div>
        </>
      </PageContent>
    </>
  );
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
