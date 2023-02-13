import {
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  Image,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";
import { firestore } from "../../firebase/clientApp";
import { useCommunityData } from "../../hooks/useCommunityData";

const RecommendationsLoader = () => {
  return (
    <Stack bg="white" p="3" borderBottomRadius="4">
      {[1, 2, 3].map((x) => (
        <Flex key={x} gap="2" align="center">
          <SkeletonCircle size="5" />
          <SkeletonText noOfLines={1} width="75%" />
        </Flex>
      ))}
    </Stack>
  );
};

const Recommendations = () => {
  const {
    onJoinOrLeaveCommunity,
    loading: loadingCommunity,
    communityStateValue,
  } = useCommunityData();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [btnNameClicked, setBtnNameClicked] = useState("");
  const [loading, setLoading] = useState(false);

  const isUserJoined = (communityId: string) => {
    return (
      communityStateValue.mySnippets.findIndex((snippet) => snippet.communityId === communityId) !==
      -1
    );
  };

  const handleLeaveOrJoin = async (
    communityData: Community,
    isJoined: boolean,
    btnName: string
  ) => {
    setBtnNameClicked(btnName);
    onJoinOrLeaveCommunity(communityData, isJoined);
  };

  const getCommunityRecommendations = async () => {
    setLoading(true);
    // Get top 5 communities by members
    const comunityDocs = await getDocs(
      query(collection(firestore, "communities"), orderBy("numberOfMembers", "desc"), limit(5))
    );
    const communities = comunityDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCommunities(communities as Community[]);
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Box border="1px solid" borderColor="gray.300" borderRadius="4">
      <Flex
        color="white"
        borderTopRadius="4"
        p="7"
        bgImage="/images/recCommsArt.png"
        bgSize="cover"
        position="relative"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url('images/recCommsArt.png')"
      >
        <Text position="absolute" fontWeight="700" fontSize=".85rem" bottom="1" left="1">
          Top Communities
        </Text>
      </Flex>
      {loading && <RecommendationsLoader />}
      {!loading && (
        <Stack bg="white" pb="2" borderBottomRadius="4">
          {/* Recommendation */}
          {communities &&
            communities.map((com, idx) => {
              const isJoined = isUserJoined(com.id);
              return (
                <Flex
                  position="relative"
                  key={com.id}
                  align="center"
                  p="2"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  gap="2"
                >
                  <Flex gap={{ base: "2", lg: "4" }} align="center" justify="start" width="75%">
                    <Text fontSize=".75rem" fontWeight="600">
                      {idx + 1}
                    </Text>
                    <Link href={`/r/${com.id}`} style={{ width: "85%" }}>
                      <Flex align="center" gap="1" _hover={{ textDecor: "underline" }}>
                        {com.imageURL && (
                          <Image
                            src={com.imageURL}
                            boxSize="5"
                            borderRadius="full"
                            alt="community logo"
                          />
                        )}
                        {!com.imageURL && <Icon as={FaReddit} boxSize="5" color="brand.100" />}
                        <Text
                          fontSize=".75rem"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          r/{com.id}
                        </Text>
                      </Flex>
                    </Link>
                  </Flex>
                  <Button
                    position="absolute"
                    right="2"
                    name={com.id}
                    height="20px"
                    fontSize=".6rem"
                    paddingInline="3"
                    isLoading={loadingCommunity && btnNameClicked === com.id}
                    onClick={(e) => handleLeaveOrJoin(com, isJoined, e.currentTarget.name)}
                    variant={isJoined ? "outline" : "solid"}
                  >
                    {isJoined ? "Joined" : "Join"}
                  </Button>
                </Flex>
              );
            })}
          <Button size="xs" w="85%" paddingBlock="3.5" placeSelf="center">
            View All
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Recommendations;
