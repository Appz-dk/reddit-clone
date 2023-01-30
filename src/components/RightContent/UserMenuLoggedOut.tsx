import React from "react";
import { MenuButton, MenuList, MenuItem, Flex } from "@chakra-ui/react";
import { ChevronDownIcon, Icon } from "@chakra-ui/icons";

import { VscAccount } from "react-icons/vsc";
import { MdOutlineLogin } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";

const UserMenuLoggedOut: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <>
      <MenuButton
        ml={1}
        padding="0 6px"
        cursor="pointer"
        borderRadius={4}
        _hover={{ outline: "1px soild", outlineColor: "gray.200" }}>
        <Flex align="center">
          <Icon as={VscAccount} fontSize="1.4rem" color="gray.300" mr={1} />
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          fontWeight="700"
          fontSize=".75rem"
          borderRadius={4}
          _hover={{ bg: "blue.400", color: "white" }}
          onClick={() => setAuthModalState({ open: true, view: "login" })}>
          <Icon as={MdOutlineLogin} fontSize="1.2rem" mr={2} />
          Log In / Sign Up
        </MenuItem>
      </MenuList>
    </>
  );
};

export default UserMenuLoggedOut;
