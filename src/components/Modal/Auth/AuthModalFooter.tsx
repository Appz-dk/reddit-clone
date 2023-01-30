import { Flex, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { AuthModalState } from "../../../atoms/authModalAtom";

type AuthModalFooterProps = {
  textContent: string;
  view: "signup" | "login";
  setAuthModalState: Dispatch<SetStateAction<AuthModalState>>;
};

const AuthModalFooter: React.FC<AuthModalFooterProps> = ({
  textContent,
  view,
  setAuthModalState,
}) => {
  const btnText = view === "signup" ? "Sign Up" : "Log In";

  return (
    <Flex fontSize=".75rem" justifyContent="center" mt={2}>
      <Text mr={1}>{textContent}</Text>
      <Text
        onClick={() => {
          setAuthModalState((prev) => ({ ...prev, view: view }));
        }}
        textTransform="uppercase"
        color="blue.500"
        fontWeight="700"
        cursor="pointer">
        {btnText}
      </Text>
    </Flex>
  );
};

export default AuthModalFooter;
