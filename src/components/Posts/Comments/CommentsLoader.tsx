import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

const CommentsLoader = () => {
  return (
    <>
      {[0, 1].map((x) => (
        <Box key={x} w="full" p="4" bg="white">
          <SkeletonCircle size="9" />
          <SkeletonText
            mt="4"
            noOfLines={3}
            spacing="3"
            startColor="gray.200"
            endColor="gray.400"
            speed={1}
          />
        </Box>
      ))}
    </>
  );
};

export default CommentsLoader;
