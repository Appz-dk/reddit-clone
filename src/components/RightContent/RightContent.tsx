import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/clientApp";
import AuthModal from "../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";

type RightContentProps = {
  user: User | null | undefined;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex align="center" justify="center">
        {user ? <Button onClick={() => signOut(auth)}>log out</Button> : <AuthButtons />}
      </Flex>
    </>
  );
};

export default RightContent;
