import { Box, Button, Flex, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

const PersonalHome = () => {
  return (
    <Box border="1px solid" borderColor="gray.300" bg="white" borderRadius="4">
      <Flex bgImage="/images/redditPersonalHome.png" bgSize="cover" p="5" />
      <Flex borderBottomRadius="4" p=".5rem 1rem 0 1rem" align="center" gap="2">
        <Icon as={FaReddit} boxSize="10" color="brand.100" />
        <Text fontWeight="600" fontSize=".8rem">
          Home
        </Text>
      </Flex>
      <Flex direction="column" p="2" gap="2" align="center">
        <Text fontSize=".75rem" marginInline="auto" justifySelf="center">
          Yor personal Reddit frontpage, build for you
        </Text>
        <Button w="90%" size="xs" paddingBlock="3.5">
          Create Post
        </Button>
        <Button w="90%" variant="outline" size="xs" paddingBlock="3.5">
          Create Community
        </Button>
      </Flex>
    </Box>
  );
};

export default PersonalHome;
