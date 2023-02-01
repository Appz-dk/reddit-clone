import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <Flex direction="column" gap="4" justify="center" align="center" height="80vh">
      <Text fontWeight="600" fontSize="1rem">
        Sorry, there aren't any communities with that name on this Reddit clone.
      </Text>
      <Text fontSize=".85rem">
        That community may have been banned or the community name is incorrect
      </Text>
      <Link href="/">
        <Button>Go Home </Button>
      </Link>
    </Flex>
  );
};

export default NotFound;
