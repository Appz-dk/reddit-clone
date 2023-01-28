import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "../RightContent/RightContent";

const Navbar: React.FC = () => {
  // Can also make media queries with useMediaQuery
  // const [mdScreen] = useMediaQuery("(min-width: 800px)");
  // or display={{ base: "none", md: "unset" }} -> hide on mobile, show from md and up

  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" alt="reddit logo" height="30px" />
        <Image src="/images/redditText.svg" alt="reddit text" height="46px" display={{ base: "none", md: "unset" }} />
      </Flex>
      {/* <Directory /> */}
      <SearchInput />
      <RightContent />
    </Flex>
  );
};

export default Navbar;
