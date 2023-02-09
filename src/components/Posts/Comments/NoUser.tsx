import { Button, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const NoUser = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Flex
      align="center"
      justify={{ base: "center", sm: "space-evenly" }}
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "3", sm: "2" }}
      maxWidth={{ base: "full", sm: "80%", md: "full" }}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="4"
      fontSize=".75rem"
      p="4"
    >
      <Text fontWeight="600" flexWrap="wrap">
        Log in or sign up to leave a comment
      </Text>
      <Flex gap="2">
        <Button
          size="xs"
          paddingInline={{ base: "2", sm: "4" }}
          variant="outline"
          onClick={() => setAuthModalState({ view: "login", open: true })}
        >
          Log in
        </Button>
        <Button
          size="xs"
          paddingInline={{ base: "2", sm: "4" }}
          onClick={() => setAuthModalState({ view: "signup", open: true })}
        >
          Sign up
        </Button>
      </Flex>
    </Flex>
  );
};

export default NoUser;
