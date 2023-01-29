import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { SearchIcon } from "@chakra-ui/icons";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleCLose = () => {
    setModalState((currVal) => ({ ...currVal, open: false }));
  };
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleCLose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center" justifyContent="center" pb={6}>
            <Flex width="70%" direction="column" gap={2} align="center" justify="center">
              <OAuthButtons />
              <Flex align="center" w="100%" gap="3">
                <Text borderBottom="1px solid" borderColor="gray.400" width="100%" />
                <Text color="gray.400" fontWeight="700">
                  OR
                </Text>
                <Text borderBottom="1px solid" borderColor="gray.400" width="100%" />
              </Flex>
              <AuthInputs />
              {/* <ResetPassword /> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
