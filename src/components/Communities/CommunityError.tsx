import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type CommunityErrorProps = {
  errorMessage: string;
};

const CommunityError: React.FC<CommunityErrorProps> = ({ errorMessage }) => {
  return (
    <Flex direction="column" gap="4" justify="center" align="center" height="80vh">
      <Text fontWeight="600" fontSize="1rem">
        Sorry, an error occurred or you do not have the needed premissions
      </Text>
      <Box textAlign="center">
        <Text fontSize=".85rem" mb={1}>
          You may ask for help if this keeps happening and provide the following error message:
        </Text>
        <Text fontSize=".85rem" color="red.500">
          {errorMessage}
        </Text>
      </Box>
      <Link href="/">
        <Button>Go Home </Button>
      </Link>
    </Flex>
  );
};

export default CommunityError;
