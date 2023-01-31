import { Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";

type CommunitiesProps = {
  user?: User | null;
};

const Communities: React.FC<CommunitiesProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <CreateCommunityModal onClose={handleClose} isOpen={isOpen} user={user} />
      <MenuItem fontSize=".75rem" onClick={() => setIsOpen(true)}>
        <Flex align="center" gap="1">
          <Icon as={GrAdd} fontSize="1.1rem" />
          <Text fontWeight="600">Create Community</Text>
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
