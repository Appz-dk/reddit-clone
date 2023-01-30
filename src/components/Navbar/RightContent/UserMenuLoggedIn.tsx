import { MenuList, MenuItem, Flex, MenuDivider, MenuButton, Text } from "@chakra-ui/react";
import { ChevronDownIcon, Icon } from "@chakra-ui/icons";
import { signOut, User } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";

import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";

type UserMenuLoggedInProps = {
  user: User | null | undefined;
};

const UserMenuLoggedIn: React.FC<UserMenuLoggedInProps> = ({ user }) => {
  return (
    <>
      <MenuButton
        ml={1}
        padding="0 6px"
        cursor="pointer"
        borderRadius={4}
        _hover={{ outline: "1px soild", outlineColor: "gray.200" }}>
        <Flex align="center">
          <Icon as={FaRedditSquare} fontSize="1.5rem" color="gray.300" />

          <Flex
            fontSize=".64rem"
            direction="column"
            align="start"
            ml={1}
            mr={6}
            display={{ base: "none", lg: "flex" }}>
            <Text fontWeight="700">{user?.displayName || user?.email?.split("@")[0]}</Text>
            <Flex>
              <Icon as={IoSparkles} color="brand.100" mr={1} />
              <Text color="gray.400">1 Karma</Text>
            </Flex>
          </Flex>

          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          fontWeight="700"
          fontSize=".75rem"
          borderRadius={4}
          _hover={{ bg: "blue.400", color: "white" }}>
          <Icon as={CgProfile} fontSize="1.2rem" mr={2} />
          Profile
        </MenuItem>

        <MenuDivider />

        <MenuItem
          fontWeight="700"
          fontSize=".75rem"
          borderRadius={4}
          _hover={{ bg: "blue.400", color: "white" }}
          onClick={() => signOut(auth)}>
          <Icon as={MdOutlineLogin} fontSize="1.2rem" mr={2} />
          Log Out
        </MenuItem>
      </MenuList>
    </>
  );
};

export default UserMenuLoggedIn;
