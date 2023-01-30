import React from "react";
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdOutlineLogin } from "react-icons/md";
import { TiHome } from "react-icons/ti";

const Community: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        marginInline={1}
        padding="0 4px"
        cursor="pointer"
        borderRadius={4}
        _hover={{ outline: "1px soild", outlineColor: "gray.200" }}>
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
          maxWidth="200px">
          <Flex>
            <Icon as={TiHome} fontSize="1.2rem" mr={1} />
            <Text fontWeight="700" fontSize=".8rem" display={{ base: "none", lg: "unset" }}>
              {/* To prevent the community name being too long */}
              {"Home".length > 17 ? "Home".substring(0, 17) + "..." : "Home"}
            </Text>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>{/* <Communities /> */}</MenuList>
    </Menu>
  );
};

export default Community;
