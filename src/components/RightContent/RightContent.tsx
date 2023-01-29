import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/clientApp";
import AuthModal from "../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";

type RightContentProps = {
  user: User | null | undefined;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex align="center" justify="center">
        <Icons />
        {user ? <Button onClick={() => signOut(auth)}>log out</Button> : <AuthButtons />}
      </Flex>
      {/* <Menu /> */}
    </>
  );
};

export default RightContent;
