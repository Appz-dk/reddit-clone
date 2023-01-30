import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement, HStack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex align="center" flexGrow="1" marginInline={2} maxWidth={user ? "auto" : "600px"}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" mb={1} />} />
        <Input
          placeholder="Search Reddit"
          fontSize={{ base: ".7rem", sm: ".85rem" }}
          height="34px"
          bg="gray.50"
          _placeholder={{ color: "gray.500" }}
          _hover={{ border: "1px solid", borderColor: "blue.500", bg: "white" }}
          _focus={{ border: "1px solid", borderColor: "blue.500", outline: "none" }}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
