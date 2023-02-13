import { Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import MenuListItem from "./MenuListItem";

type CommunitiesProps = {
  user?: User | null;
};

const Communities: React.FC<CommunitiesProps> = ({ user }) => {
  const { mySnippets } = useRecoilValue(communityState);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const moderatingSnippets = mySnippets.filter((snippet) => snippet.isModerator);

  return (
    <>
      <CreateCommunityModal onClose={handleClose} isOpen={isOpen} user={user} />
      <Text
        fontSize=".55rem"
        color="gray.500"
        fontWeight="600"
        pl="3"
        pt="3"
        mb="1"
        textTransform="uppercase"
      >
        Moderating
      </Text>
      {moderatingSnippets.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          displayText={`r/${snippet.communityId}`}
          imageURL={snippet.imageURL}
          icon={FaReddit}
          iconColor={"brand.100"}
          link={`/r/${snippet.communityId}`}
        />
      ))}
      <Text
        fontSize=".55rem"
        color="gray.500"
        fontWeight="600"
        pl="3"
        pt="3"
        mb="1"
        textTransform="uppercase"
      >
        My Communities
      </Text>
      <MenuItem fontSize=".75rem" onClick={() => setIsOpen(true)} _hover={{ bg: "gray.100" }}>
        <Flex align="center" gap="1">
          <Icon as={GrAdd} boxSize="19px" />
          <Text fontWeight="600">Create Community</Text>
        </Flex>
      </MenuItem>
      {mySnippets.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          displayText={`r/${snippet.communityId}`}
          imageURL={snippet.imageURL}
          icon={FaReddit}
          iconColor={"blue.500"}
          link={`/r/${snippet.communityId}`}
        />
      ))}
    </>
  );
};

export default Communities;
