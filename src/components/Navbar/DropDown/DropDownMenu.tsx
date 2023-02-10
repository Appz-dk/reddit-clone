import React from "react";
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

const Community: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Menu>
      <MenuButton
        marginInline={1}
        padding="0 4px"
        cursor="pointer"
        borderRadius={4}
        _hover={{ outline: "1px soild", outlineColor: "gray.200" }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
          maxWidth="200px"
        >
          <Flex align="center">
            <Icon as={TiHome} boxSize="5" mr={1} />
            <Text fontWeight="600" fontSize=".8rem" display={{ base: "none", lg: "unset" }}>
              {/* To prevent the community name being too long */}
              {"Home".length > 17 ? "Home".substring(0, 17) + "..." : "Home"}
            </Text>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities user={user} />
      </MenuList>
    </Menu>
  );
};

export default Community;
