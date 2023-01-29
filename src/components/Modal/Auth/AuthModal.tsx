import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import HorizontalLine from "./HorizontalLine";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleCLose = () => {
    setModalState((currVal) => ({ ...currVal, open: false }));
  };

  // Close AuthModal on login / signup if a user object exists in the AuthState
  useEffect(() => {
    if (user) handleCLose();
  }, [user]);

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
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            pb={6}>
            <Flex width="70%" direction="column" gap={2} align="center" justify="center">
              {modalState.view !== "resetPassword" && (
                <>
                  <OAuthButtons />
                  <HorizontalLine />
                  <AuthInputs />
                </>
              )}
              {modalState.view === "resetPassword" && <ResetPassword />}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
