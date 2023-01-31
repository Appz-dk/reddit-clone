import React, { useEffect } from "react";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCreated, loading, error] = useSignInWithGoogle(auth);

  // TODO: Make into Custom Hook
  // Alternative to firebase functions (since it's a "paid" option)
  const createUserDocument = async (user: User) => {
    const usersDocRef = doc(firestore, "users", user.uid);
    // If user already exists do not override the info
    const userDoc = await getDoc(usersDocRef);
    if (userDoc.exists()) {
      return;
    }

    await setDoc(usersDocRef, JSON.parse(JSON.stringify(user)));
  };
  useEffect(() => {
    if (userCreated) {
      createUserDocument(userCreated.user);
    }
  }, [userCreated]);

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
        <Text textAlign="center" color="red.500" fontSize=".85rem">
          {FIREBASE_ERRORS[error.message]}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthButtons;
