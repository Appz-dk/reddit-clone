import React from "react";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex direction="column" mb={4} gap={2} w="full">
      <Button
        variant="oauth"
        textAlign="center"
        isLoading={loading}
        onClick={() => signInWithGoogle()}>
        <Image src="/images/googlelogo.png" w={5} mr={4} />
        Continue with Google
      </Button>
      {/* Incase of more auth providers simply add 1 more button */}
      {/* <Button variant="oauth">Some Other Provider</Button> */}
      {error && (
        <Text textAlign="center" color="red.500" fontSize=".85em">
          {FIREBASE_ERRORS[error.message]}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthButtons;
