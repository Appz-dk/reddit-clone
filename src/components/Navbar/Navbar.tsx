import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Community from "./Dropdown/DropdownMenu";
import useDropdownMenu from "../../hooks/useDropdownMenu";
import { defaultMenuItem } from "../../atoms/dropdownMenuAtom";

const Navbar: React.FC = () => {
  const { onSelectMenuItem } = useDropdownMenu();
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex bg="white" height="44px" padding="6px 12px" justify="space-between">
      <Flex align="center" cursor="pointer" onClick={() => onSelectMenuItem(defaultMenuItem)}>
        <Image src="/images/redditFace.svg" alt="reddit logo" height="30px" />
        <Image
          src="/images/redditText.svg"
          alt="reddit text"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {user && <Community />}
      <SearchInput user={user} />
      <Flex>
        <RightContent user={user} />
      </Flex>
    </Flex>
  );
};

export default Navbar;
