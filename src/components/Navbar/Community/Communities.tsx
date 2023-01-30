import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import CreateCommunityModal from "../../Modal/CreateCommunity";

const Communities = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <CreateCommunityModal onClose={handleClose} isOpen={isOpen} />
      <MenuItem fontSize=".75rem" onClick={() => setIsOpen(true)}>
        <Flex align="center" gap="1">
          <Icon as={GrAdd} fontSize="1.1rem" />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
