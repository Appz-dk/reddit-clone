import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import {
  BsArrowDownCircle,
  BsArrowDownCircleFill,
  BsArrowUpCircle,
  BsArrowUpCircleFill,
} from "react-icons/bs";
import { FaReddit } from "react-icons/fa";

export type Comment = {
  id: string;
  text: string;
  creatorId: string;
  creatorDisplayName: string;
  communityId: string;
  postId: string;
  postTitle: string;
  createdAt: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  userIsCreator: boolean;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment, userIsCreator }) => {
  const userVoteStatus = undefined;
  // const userIsCreator = true;
  return (
    <Flex gap="2" width="full">
      {/* Icon */}
      <Icon as={FaReddit} color="gray.300" fontSize="1.4rem" />
      {/* Comment */}
      <Stack>
        {/* User info */}
        <Flex gap="1" fontSize=".65rem">
          <Text fontWeight="700">{comment.creatorDisplayName}</Text>
          <Text color="gray.400">{moment(comment.createdAt.seconds * 1000).fromNow()}</Text>
        </Flex>
        {/* Comment body */}
        <Text fontSize=".75rem">{comment.text}</Text>
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

export default CommentItem;
