import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  BsArrowUpCircle,
  BsArrowDownCircle,
  BsDot,
  BsBookmark,
  BsArrowUpCircleFill,
  BsArrowDownCircleFill,
} from "react-icons/bs";
import { FaReddit, FaRegComment } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import { Post } from "../../../atoms/postsAtom";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteStatus?: number;
  onVote: () => void;
  onSelectPost: () => void;
  onDeletePost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteStatus,
  onVote,
  onSelectPost,
  onDeletePost,
}) => {
  const router = useRouter();
  const { communityId } = router.query;

  return (
    <Flex
      mt="4"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="4"
      cursor="pointer"
      _hover={{ borderColor: "gray.500" }}
      // TODO: Maybe move to flex container of post info
      onClick={onSelectPost}
    >
      {/* Left side */}
      <Flex
        direction="column"
        justify="start"
        align="center"
        bg="gray.100"
        p="2"
        width="fit-content"
        gap="2px"
        borderLeftRadius="4"
      >
        <Icon
          as={userVoteStatus === 1 ? BsArrowUpCircleFill : BsArrowUpCircle}
          fontSize="1.1rem"
          cursor="pointer"
          color={userVoteStatus === 1 ? "brand.100" : "gray.400"}
          onClick={onVote}
        />
        <Text fontSize=".75rem" fontWeight="600">
          {post.voteStatus}
        </Text>
        <Icon
          as={userVoteStatus === -1 ? BsArrowDownCircleFill : BsArrowDownCircle}
          fontSize="1.1rem"
          cursor="pointer"
          color={userVoteStatus === -1 ? "#4379ff" : "gray.400"}
          onClick={onVote}
        />
      </Flex>
      {/* Right side */}
      <Flex
        direction="column"
        p="2"
        paddingBottom="0.5"
        gap="2"
        bg="white"
        flexGrow="1"
        borderRightRadius="4"
      >
        {/* post info */}
        <Flex align="center">
          {!communityId && (
            <>
              <Image as={FaReddit} size="18" mr="2" />

              <Text fontSize=".75rem" fontWeight="700">
                {post.communityId}
              </Text>

              <Icon as={BsDot} fontSize=".7rem" color="gray.400" />
            </>
          )}
          <Text fontSize=".75rem" color="gray.400">
            {`Posted by u/${post.creatorDisplayName} ${moment(
              new Date(post.createdAt.seconds * 1000)
            ).fromNow()}`}
          </Text>
        </Flex>
        {/* Post Content */}
        <Text fontWeight="600">{post.title}</Text>
        <Text fontSize=".85rem">{post.body}</Text>
        {post.imageURL && (
          <Image
            src={post.imageURL}
            maxWidth="90%"
            // TODO: Change away from px value
            maxHeight="500px"
            mx="auto"
            marginBlock="1rem"
            borderRadius="4"
            alt="post image"
          />
        )}
        {/* Footer */}
        <Flex fontSize=".75rem" color="gray.500" gap="5" fontWeight="600">
          <Flex
            gap="2"
            p="1.5"
            borderRadius="4"
            align="center"
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={FaRegComment} fontSize="1rem" />
            <Text>{post.numberOfComments}</Text>
          </Flex>
          <Flex
            gap="2"
            p="1.5"
            borderRadius="4"
            align="center"
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoArrowRedoOutline} fontSize="1.1rem" />
            <Text>Share</Text>
          </Flex>
          <Flex
            gap="2"
            p="1.5"
            borderRadius="4"
            align="center"
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={BsBookmark} fontSize=".9rem" />
            <Text>Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              gap="2"
              p="1.5"
              borderRadius="4"
              align="center"
              cursor="pointer"
              _hover={{ bg: "red.500", color: "white" }}
              onClick={onDeletePost}
            >
              <Icon as={AiOutlineDelete} fontSize=".9rem" />
              <Text>Delete</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
