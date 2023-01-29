import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const HorizontalLine = () => {
  return (
    <Flex align="center" w="100%" gap="3">
      <Text borderBottom="1px solid" borderColor="gray.400" width="100%" />
      <Text color="gray.400" fontWeight="700">
        OR
      </Text>
      <Text borderBottom="1px solid" borderColor="gray.400" width="100%" />
    </Flex>
  );
};

export default HorizontalLine;
