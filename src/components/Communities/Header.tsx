import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Community } from "../../atoms/communitiesAtom";
import { useCommunityData } from "../../hooks/useCommunityData";
import HeaderImage from "./HeaderImage";

type HeaderProps = {
  communityData: Community;
};
const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } = useCommunityData();

  const isJoined =
    communityStateValue.mySnippets.findIndex(
      (snippet) => snippet.communityId === communityData.id
    ) !== -1;

  return (
    <Flex direction="column" height="18vh" width="full">
      <Box bg="blue.400" height="50%"></Box>
      <Flex bg="white" height="50%" justify="center">
        <Flex gap="2" align="center" width="95%" flexGrow={1} maxWidth="860px" paddingInline="2">
          <HeaderImage />
          <Flex direction="column">
            <Text fontWeight="600" fontSize=".95rem">
              {communityData.id}
            </Text>
            <Text color="gray.500" fontSize=".75rem">
              r/{communityData.id}
            </Text>
          </Flex>
          <Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              fontSize=".75rem"
              paddingInline={5}
              ml={2}
              height="1.5rem"
              isLoading={loading}
              onClick={() => {
                onJoinOrLeaveCommunity(communityData, isJoined);
              }}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
