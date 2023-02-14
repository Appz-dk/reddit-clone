import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import useDropdownMenu from "../../hooks/useDropdownMenu";

const CreatePostLink = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { toggleMenuOpen } = useDropdownMenu();
  const setAuthModalState = useSetRecoilState(authModalState);

  const onRedirect = () => {
    if (!user) {
      setAuthModalState({ view: "login", open: true });
      return;
    }
    const { communityId } = router.query;

    if (!communityId) {
      toggleMenuOpen();
      return;
    }

    router.push(`/r/${communityId}/submit`);
  };

  return (
    <Flex justify="center" align="center" gap="3" bg="white" borderRadius="4" padding="2" mb="5">
      <Icon as={FaReddit} fontSize="2rem" color="gray.300" />
      <Input
        as={Button}
        flexGrow={1}
        placeholder="Create new post"
        fontSize=".75rem"
        size="sm"
        borderRadius="4"
        bg="gray.50"
        cursor="pointer"
        _hover={{
          border: "1px solid",
          borderColor: "blue.500",
          bg: "white",
        }}
        _focus={{
          order: "1px solid",
          borderColor: "blue.500",
          outline: "none",
        }}
        onClick={onRedirect}
        aria-label="Link to create post page"
      />
      <Icon as={AiOutlinePicture} boxSize="6" color="gray.300" />
      <Icon as={BsLink45Deg} boxSize="6" color="gray.300" />
    </Flex>
  );
};

export default CreatePostLink;
