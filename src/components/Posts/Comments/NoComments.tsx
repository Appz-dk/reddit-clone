import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const NoComments = () => {
  return (
    <Flex
      justify="center"
      w="full"
      align="center"
      p="20"
      borderTop="1px solid"
      borderColor="gray.100"
    >
      <Text opacity=".3" fontWeight="700">
        No Comments Yet
      </Text>
    </Flex>
  );
};

export default NoComments;
