import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiShareForwardLine } from "react-icons/ri";
import { BsArrowDownCircle, BsArrowUpCircle, BsBookmark, BsDot } from "react-icons/bs";
import { FaReddit, FaRegComment } from "react-icons/fa";
import { Post } from "../../../atoms/postsAtom";
import { Community } from "../../../atoms/communitiesAtom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const getPosts = async () => {
    // TODO: implement loading & Error state aswell
    try {
      // Create firebase query for the posts we want
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", `${communityData.id}`),
        orderBy("createdAt", "desc")
      );
      // get posts from firebase with the query
      const postDocs = await getDocs(postsQuery);
      // Get each documents id and data into an array of objects
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Store in state
      setPosts(posts as Post[]);
    } catch (error) {
      console.log("getPosts error", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Image src doesn't work, check if it's just css styling missing
  // remove the below code
  const post = posts[1];
  if (!post) return <div>no post</div>;

  console.log(posts);

  return (
    <Flex mt="3">
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
        <Icon as={BsArrowUpCircle} fontSize="1.1rem" color="gray.400" cursor="pointer" />
        <Text fontSize=".75rem" fontWeight="600">
          {post.voteStatus}
        </Text>
        <Icon as={BsArrowDownCircle} fontSize="1.1rem" color="gray.400" cursor="pointer" />
      </Flex>
      {/* Right side */}
      <Flex direction="column" p="2" gap="2" bg="white" flexGrow="1" borderRightRadius="4">
        {/* post info */}
        <Flex align="center">
          <Image as={FaReddit} size="20" mr="2" />
          <Text fontSize=".85rem" fontWeight="700">
            {post.communityId}
          </Text>
          <Icon as={BsDot} fontSize=".7rem" color="gray.400" />
          <Text fontSize=".85rem" color="gray.400">
            {`Posted by ${post.creatorDisplayName} some time ago`}
          </Text>
        </Flex>
        {/* Post Content */}
        <Text fontWeight="600">{post.title}</Text>
        <Text fontSize=".85rem">{post.body}</Text>
        {/* @ts-ignore */}
        {post.imageURL && (
          <Image src={post.imageURL} maxWidth="90%" mx="auto" marginBlock="1rem" borderRadius="4" />
        )}
        {/* Footer */}
        <Flex fontSize=".75rem" color="gray.500" gap="4">
          <Flex gap="2" align="center">
            <Icon as={FaRegComment} fontSize="1rem" />
            <Text fontWeight="600">{post.numberOfComments}</Text>
          </Flex>
          <Flex gap="2" align="center">
            <Icon as={RiShareForwardLine} fontSize="1rem" />
            <Text fontWeight="600">Share</Text>
          </Flex>
          <Flex gap="2" align="center">
            <Icon as={BsBookmark} fontSize=".9rem" />
            <Text fontWeight="600">Save</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Posts;
