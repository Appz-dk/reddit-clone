import React from "react";
import { Flex, Icon, Image, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Communities from "./Communities";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import useDropdownMenu from "../../../hooks/useDropdownMenu";
import { DropdownMenuItem } from "../../../atoms/dropdownMenuAtom";

const Community: React.FC = () => {
  const [user] = useAuthState(auth);
  const { dropdownState, toggleMenuOpen, closeMenu } = useDropdownMenu();
  // Vercel Type error: 'dropdownState' is of type 'unknown'.
  // const { displayText, icon, iconColor, imageURL } = dropdownState.selectedMenuItem;

  return (
    <Menu isOpen={dropdownState.isOpen} onClose={closeMenu}>
      <MenuButton
        marginInline={1}
        padding="0 4px"
        cursor="pointer"
        borderRadius={4}
        _hover={{ outline: "1px soild", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
          maxWidth="200px"
        >
          <Flex align="center" gap="1">
            {!dropdownState.selectedMenuItem.imageURL && (
              <Icon
                as={dropdownState.selectedMenuItem.icon}
                boxSize="5"
                color={dropdownState.selectedMenuItem.iconColor}
              />
            )}
            {dropdownState.selectedMenuItem.imageURL && (
              <Image
                src={dropdownState.selectedMenuItem.imageURL}
                boxSize="5"
                borderRadius="full"
              />
            )}
            <Text fontWeight="600" fontSize=".8rem" display={{ base: "none", lg: "unset" }}>
              {dropdownState.selectedMenuItem.displayText}
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
