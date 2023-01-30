import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const AuthButtons: React.FC = () => {
  // useSetRecoilState when only needing the 'setState'
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleLogin = () => {
    setAuthModalState({ view: "login", open: true });
  };
  const handleSignUp = () => {
    setAuthModalState({ view: "signup", open: true });
  };

  return (
    <>
      <Button
        variant="outline"
        mr={2}
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        onClick={handleLogin}>
        Log In
      </Button>
      <Button
        variant="solid"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        onClick={handleSignUp}>
        Sign Up
      </Button>
    </>
  );
};

export default AuthButtons;
