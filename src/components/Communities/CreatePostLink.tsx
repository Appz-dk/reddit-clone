import { Flex, Icon, Input } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";

const CreatePostLink = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onRedirect = () => {
    if (!user) {
      setAuthModalState({ view: "login", open: true });
      return;
    }
    // TODO: Could be replaced with props from /[communityId]/index.tsx
    // by passing along communityId={communityData.id}
    // Might work better with github pages
    const { communityId } = router.query;
    router.push(`/r/${communityId}/submit`);
  };

  return (
    <Flex justify="center" align="center" gap="3" bg="white" borderRadius="4" padding="2">
      <Icon as={FaReddit} fontSize="2rem" color="gray.300" />
      <Input
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
      <Icon as={AiOutlinePicture} fontSize="1.4rem" color="gray.300" />
      <Icon as={BsLink45Deg} fontSize="1.4rem" color="gray.300" />
    </Flex>
  );
};

export default CreatePostLink;
