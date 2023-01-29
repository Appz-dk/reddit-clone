import { Button, Flex, Image } from "@chakra-ui/react";
import React from "react";

const OAuthButtons: React.FC = () => {
  return (
    <Flex direction="column" mb={4} gap={2} w="full">
      <Button variant="oauth" textAlign="center">
        <Image src="/images/googlelogo.png" w={5} mr={4} />
        Continue with Google
      </Button>
      {/* <Button variant="outline">Some Other Provider</Button> */}
    </Flex>
  );
};

export default OAuthButtons;
