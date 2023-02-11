import { Alert, AlertIcon, Flex, Icon, Image, Skeleton, Spinner, Text } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
  onVote: (event: React.MouseEvent, post: Post, voteValue: number) => void;
  onSelectPost?: (post: Post) => void;
  onDeletePost: (event: React.MouseEvent, post: Post) => Promise<boolean>;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteStatus,
  onVote,
  onSelectPost,
  onDeletePost,
  homePage,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);
  const singlePostPageView = !onSelectPost;

  const handleDeletePost = async (event: React.MouseEvent) => {
    // doubble check user is creator
    if (!userIsCreator) return;
    try {
      if (error) setError("");
      setLoading(true);
      const success = await onDeletePost(event, post);

      if (!success) {
        throw new Error("Failed to delete post");
      }

      console.log("Post was succesfully deleted");
    } catch (error) {
      console.log("handleDeletePost error", error);
    }
    setLoading(false);
    if (singlePostPageView) {
      router.push(`/r/${post.communityId}`);
    }
  };

  return (
    <>
      {/* TODO: Change to a grid layout so that the image can span more to the left side? */}
      <Flex
        border={singlePostPageView ? "none" : "1px solid"}
        borderColor="gray.300"
        borderRadius="4"
        cursor={singlePostPageView ? "default" : "pointer"}
        _hover={{ borderColor: "gray.500" }}
        onClick={() => onSelectPost && onSelectPost(post)}
      >
        {/* Left side */}
        <Flex
          direction="column"
          justify="start"
          align="center"
          bg={singlePostPageView ? "white" : "gray.100"}
          p="2"
          width="fit-content"
          gap="2px"
          borderTopLeftRadius="4"
          borderBottomLeftRadius={singlePostPageView ? "0" : "4"}
        >
          <Icon
            as={userVoteStatus === 1 ? BsArrowUpCircleFill : BsArrowUpCircle}
            fontSize="1.1rem"
            cursor="pointer"
            color={userVoteStatus === 1 ? "brand.100" : "gray.400"}
            onClick={(e) => onVote(e, post, 1)}
          />
          <Text fontSize=".75rem" fontWeight="600">
            {post.voteStatus}
          </Text>
          <Icon
            as={userVoteStatus === -1 ? BsArrowDownCircleFill : BsArrowDownCircle}
            fontSize="1.1rem"
            cursor="pointer"
            color={userVoteStatus === -1 ? "#4379ff" : "gray.400"}
            onClick={(e) => onVote(e, post, -1)}
          />
        </Flex>
        {/* Right side */}
        <Flex
          direction="column"
          p="2"
          paddingBottom="0.5"
          gap="1"
          bg="white"
          flexGrow="1"
          borderTopRightRadius="4"
          borderBottomRightRadius={singlePostPageView ? "0" : "4"}
        >
          {/* post info */}
          <Flex align="center" wrap="wrap">
            {(homePage || singlePostPageView) && (
              <>
                {!post.communityImageURL && (
                  <Image as={FaReddit} boxSize="19px" mr="2" borderRadius="full" />
                )}
                {post.communityImageURL && (
                  <Image src={post.communityImageURL} boxSize="19px" mr="2" borderRadius="full" />
                )}

                <Text
                  fontSize=".8rem"
                  fontWeight="600"
                  cursor="pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/r/${post.communityId}`);
                  }}
                >
                  r/{post.communityId}
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
            <>
              {loadingImage && (
                <Skeleton height="200px" maxWidth="90%" mx="auto" borderRadius="4" />
              )}
              <Image
                src={post.imageURL}
                maxWidth="90%"
                // TODO: Change away from px value
                maxHeight="500px"
                mx="auto"
                marginBlock="1rem"
                borderRadius="4"
                alt="post image"
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </>
          )}
          {/* Footer */}
          <Flex fontSize=".75rem" color="gray.500" gap={{ base: "1", sm: "5" }} fontWeight="600">
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
                onClick={handleDeletePost}
              >
                {loading && <Spinner size="sm" />}
                {!loading && (
                  <>
                    <Icon as={AiOutlineDelete} fontSize=".9rem" />
                    <Text>Delete</Text>
                  </>
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      {error && (
        <Alert status="error" borderRadius="2" mt="0.5">
          <AlertIcon />
          <Text mr={2}>{error}</Text>
        </Alert>
      )}
    </>
  );
};

export default PostItem;
