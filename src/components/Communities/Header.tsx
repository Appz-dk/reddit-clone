import { Box, Button, Flex, Text } from "@chakra-ui/react";
import HeaderImage from "./HeaderImage";

type HeaderProps = {
  imageURL?: string;
  communityName: string;
};
const Header: React.FC<HeaderProps> = ({ imageURL, communityName }) => {
  const isJoined = false; // Read from communitySnippets with recoil global state
  return (
    <Flex direction="column" height="18vh" width="full">
      <Box bg="blue.400" height="50%"></Box>
      <Flex bg="white" height="50%" justify="center">
        <Flex gap="2" align="center" width="95%" flexGrow={1} maxWidth="860px" paddingInline="2">
          <HeaderImage />
          <Flex direction="column">
            <Text fontWeight="600" fontSize=".95rem">
              {communityName}
            </Text>
            <Text color="gray.500" fontSize=".75rem">
              r/{communityName}
            </Text>
          </Flex>
          <Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              fontSize=".75rem"
              paddingInline={5}
              ml={2}
              height="1.5rem"
              onClick={() => {}}
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
