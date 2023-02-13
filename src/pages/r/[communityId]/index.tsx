import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import { Community, communityState } from "../../../atoms/communitiesAtom";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/Communities/NotFound";
import CommunityError from "../../../components/Communities/CommunityError";
import Header from "../../../components/Communities/Header";
import PageContent from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Communities/CreatePostLink";
import Posts from "../../../components/Posts/Posts/Posts";
import { useSetRecoilState } from "recoil";
import About from "../../../components/Communities/About";

type CommunityPageProps = {
  communityData: Community;
  error: string;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData, error }) => {
  const setCommunityStateValue = useSetRecoilState(communityState);

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData]);

  if (error) return <CommunityError errorMessage={error} />;
  if (!communityData) return <NotFound />;

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
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

    // Check if document exists & return props with the document data or null
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
