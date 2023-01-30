import React, { PropsWithChildren } from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

type ModalWrapperType = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalWrapper: React.FC<PropsWithChildren<ModalWrapperType>> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>{children}</ModalContent>
      </Modal>
    </>
  );
};

export default ModalWrapper;
