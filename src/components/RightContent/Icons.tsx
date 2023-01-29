import { Flex, Icon } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import { IoFilterCircleOutline, IoVideocamOutline, IoNotificationsOutline } from "react-icons/io5";
import { BsChatDots, BsArrowUpRightCircle } from "react-icons/bs";

const Icons: React.FC = () => {
  return (
    <Flex align="center">
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        pr={1}
        borderRight="1px solid"
        borderColor="gray.200">
        <Flex _hover={{ bg: "gray.200" }} padding="1" borderRadius="4" cursor="pointer">
          <Icon as={BsArrowUpRightCircle} fontSize="1.1em" />
        </Flex>
        <Flex _hover={{ bg: "gray.200" }} padding="1" borderRadius="4" cursor="pointer">
          <Icon as={IoFilterCircleOutline} fontSize="1.3em" />
        </Flex>
        <Flex _hover={{ bg: "gray.200" }} padding="1" borderRadius="4" cursor="pointer">
          <Icon as={IoVideocamOutline} fontSize="1.4em" />
        </Flex>
      </Flex>
      <Flex align="center" paddingInline={1}>
        <Flex _hover={{ bg: "gray.200" }} padding="1" borderRadius="4" cursor="pointer">
          <Icon as={BsChatDots} fontSize="1.1em" />
        </Flex>
        <Flex _hover={{ bg: "gray.200" }} padding="1" borderRadius="4" cursor="pointer">
          <Icon as={IoNotificationsOutline} fontSize="1.2em" />
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          _hover={{ bg: "gray.200" }}
          padding="1"
          borderRadius="4"
          cursor="pointer">
          <Icon as={GrAdd} fontSize="1.2em" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Icons;
