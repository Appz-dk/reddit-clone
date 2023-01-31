import React, { PropsWithChildren } from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

type ModalWrapperType = {
  isOpen: boolean;
  onClose: () => void;
  size?: string;
};

const ModalWrapper: React.FC<PropsWithChildren<ModalWrapperType>> = ({
  isOpen,
  onClose,
  size = "md",
  children,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>{children}</ModalContent>
      </Modal>
    </>
  );
};

export default ModalWrapper;
