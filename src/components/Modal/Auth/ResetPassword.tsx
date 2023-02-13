import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { BsDot, BsReddit } from "react-icons/bs";
import AuthInput from "./AuthInput";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const ResetPassword = () => {
  const setModalAuthState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

  const onSubmitHandler = async (e: React.FormEvent) => {
    if (success) setSuccess(false);
    e.preventDefault();
    // Could add email validation regex, but firebase also checks the email
    // Try to send password reset email
    await sendPasswordResetEmail(email);
    setSuccess(true);
  };

  return (
    <>
      <Icon as={BsReddit} color="brand.100" fontSize={40} mb="2" />

      <Text mb={2} fontSize=".9rem" fontWeight="700">
        Reset your password
      </Text>

      {(!success || error) && (
        <Text fontSize=".8rem" textAlign="center">
          Enter the email address associated with your Reddit account, and we’ll send you a reset
          link
        </Text>
      )}

      {success && !error && (
        <Text fontSize=".8rem" textAlign="center" mb={4}>
          Check your email :)
        </Text>
      )}

      <form onSubmit={onSubmitHandler}>
        <AuthInput
          required={true}
          placeholder="Email"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* TODO: Change error msgs in errors.ts or find better solution than below.
            Maybe not showing the error at all is better, since the user will
            be able to see what emails exists in the system
         */}
        {error && (
          <Text textAlign="center" fontSize=".85rem" color="red.500">
            {FIREBASE_ERRORS[error.message].replace("or password", "").trim()}
          </Text>
        )}

        <Button
          isLoading={sending}
          variant="solid"
          w="100%"
          marginBlock={2}
          height="36px"
          type="submit"
        >
          Reset Password
        </Button>
      </form>

      <Flex color="blue.500" fontWeight="700" align="center" justify="center" fontSize=".7rem">
        <Text
          textTransform="uppercase"
          cursor="pointer"
          onClick={() => setModalAuthState((prev) => ({ ...prev, view: "login" }))}
        >
          Login
        </Text>
        <BsDot />
        <Text
          textTransform="uppercase"
          cursor="pointer"
          onClick={() => setModalAuthState((prev) => ({ ...prev, view: "signup" }))}
        >
          Sign up
        </Text>
      </Flex>
    </>
  );
};

export default ResetPassword;
