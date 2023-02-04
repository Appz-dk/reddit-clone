import { Box, Skeleton, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

const PostLoader = () => {
  return (
    <Stack spacing={6} mt="4">
      <Box p="2" boxShadow="lg" bg="white" borderRadius={4}>
        <SkeletonText
          mt="3"
          noOfLines={1}
          width="40%"
          startColor="gray.200"
          endColor="gray.400"
          speed={1}
        />
        <SkeletonText
          mt="4"
          noOfLines={4}
          spacing="3"
          startColor="gray.200"
          endColor="gray.400"
          speed={1}
        />
        <Skeleton
          mt="4"
          height="200px"
          startColor="gray.200"
          endColor="gray.400"
          speed={1}
          borderRadius="4"
        />
      </Box>
      <Box p="2" boxShadow="lg" bg="white" borderRadius={4}>
        <SkeletonText
          mt="3"
          noOfLines={1}
          width="40%"
          startColor="gray.200"
          endColor="gray.400"
          speed={1}
        />
        <SkeletonText
          mt="4"
          noOfLines={4}
          spacing="4"
          startColor="gray.200"
          endColor="gray.400"
          speed={1}
        />
        <Skeleton
          mt="4"
          height="200px"
          startColor="gray.200"
          endColor="gray.400"
          speed={1}
          borderRadius="4"
        />
      </Box>
    </Stack>
  );
};

export default PostLoader;
