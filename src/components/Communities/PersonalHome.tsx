import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { auth } from "../../firebase/clientApp";
import useDropdownMenu from "../../hooks/useDropdownMenu";
import CreateCommunityModal from "../Modal/CreateCommunity/CreateCommunityModal";

const PersonalHome = () => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const { toggleMenuOpen } = useDropdownMenu();

  const onClose = () => {
    setIsOpen(false);
  };

  const handleCreatePostBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    toggleMenuOpen();
  };

  return (
    <>
      <CreateCommunityModal isOpen={isOpen} onClose={onClose} user={user} />
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
          <Button w="90%" size="xs" paddingBlock="3.5" onClick={handleCreatePostBtn}>
            Create Post
          </Button>
          <Button
            w="90%"
            variant="outline"
            size="xs"
            paddingBlock="3.5"
            onClick={() => setIsOpen(true)}
          >
            Create Community
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default PersonalHome;
