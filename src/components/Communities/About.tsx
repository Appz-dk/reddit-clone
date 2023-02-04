import { Box, Button, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RiCakeLine } from "react-icons/ri";
import { Community } from "../../atoms/communitiesAtom";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  // const router = useRouter();
  const createdDate = communityData.createdAt
    ? moment(communityData.createdAt?.seconds * 1000).format("d MMM, yyyy")
    : null;
  return (
    <Box position="sticky" top="2">
      <Flex
        justify="space-between"
        align="center"
        bg="blue.400"
        p="2.5"
        borderTopRadius="4"
        color="white"
        fontWeight="600"
        fontSize=".75rem"
      >
        <Text>About Community</Text>
        <Icon as={BiDotsHorizontalRounded} fontSize=".9rem" />
      </Flex>
      <Box bg="white" p="2" borderBottomRadius="4">
        <Flex p="2" fontSize=".75rem" fontWeight="600">
          <Flex flexGrow="1" direction="column">
            <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
            <Text>Members</Text>
          </Flex>
          <Flex flexGrow="1" direction="column">
            <Text>1</Text>
            <Text>Online</Text>
          </Flex>
        </Flex>
        <Divider />
        <Flex p="2" gap="2" align="center" fontSize=".75rem" fontWeight="600">
          {createdDate && (
            <>
              <Icon as={RiCakeLine} fontSize=".85rem" />
              <Text>{`Created ${createdDate}`}</Text>
            </>
          )}
        </Flex>
        <Flex justify="center" mt="1" w="full">
          {/* TODO: Maybe have to change to router.query.communityId */}
          <Link href={`/r/${communityData.id}/submit`} style={{ width: "100%", marginLeft: "10%" }}>
            <Button size="xm" fontWeight="600" paddingBlock="1.5" w="90%">
              create post
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default About;
