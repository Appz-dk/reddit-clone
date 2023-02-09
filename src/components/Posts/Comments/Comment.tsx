import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  BsArrowDownCircle,
  BsArrowDownCircleFill,
  BsArrowUpCircle,
  BsArrowUpCircleFill,
} from "react-icons/bs";
import { FaReddit } from "react-icons/fa";

const Comment = () => {
  const userVoteStatus = undefined;
  const userIsCreator = true;
  return (
    <Flex gap="2">
      {/* Icon */}
      <Icon as={FaReddit} color="gray.300" fontSize="1.4rem" />
      {/* Comment */}
      <Stack>
        {/* User info */}
        <Flex gap="1" fontSize=".65rem">
          <Text fontWeight="700">Username</Text>
          <Text color="gray.400">a month ago</Text>
        </Flex>
        {/* Comment body */}
        <Text fontSize=".75rem">
          Wow Elon these looks great. I'm not sure how you possibly have the time to take up any new
          hobbies but at this point I'm nt surprised! Please make sure to bring some of these to my
          place after the bday party!
        </Text>
        {/* Comment Footer */}
        <Flex gap="2" align="center">
          <Icon
            as={userVoteStatus === 1 ? BsArrowUpCircleFill : BsArrowUpCircle}
            fontSize=".8rem"
            cursor="pointer"
            color={userVoteStatus === 1 ? "brand.100" : "gray.400"}
            // onClick={(e) => onVote(e, post, 1)}
          />
          <Icon
            as={userVoteStatus === 1 ? BsArrowDownCircleFill : BsArrowDownCircle}
            fontSize=".8rem"
            cursor="pointer"
            color={userVoteStatus === 1 ? "brand.100" : "gray.400"}
            // onClick={(e) => onVote(e, post, 1)}
          />
          {userIsCreator && (
            <>
              <Text fontSize=".6rem" fontWeight="600" color="gray.500" cursor="pointer">
                Edit
              </Text>
              <Text fontSize=".6rem" fontWeight="600" color="gray.500" cursor="pointer">
                Delete
              </Text>
            </>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Comment;
