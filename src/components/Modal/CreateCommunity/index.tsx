import React, { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Divider,
  Box,
  Text,
  Input,
  Icon,
  Checkbox,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import ModalWrapper from "../ModalWrapper";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";

type CreateCommunityModalType = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalType> = ({ isOpen, onClose }) => {
  const [communityName, setCommunityName] = useState("");

  return (
    <ModalWrapper onClose={onClose} isOpen={isOpen}>
      <ModalHeader fontSize=".9rem" padding={3}>
        Create a community
      </ModalHeader>
      <ModalCloseButton />
      <Divider />
      <ModalBody
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        pb={6}
        paddingInline="3">
        <Flex width="full" direction="column" gap={6}>
          <Box>
            <Text fontSize=".85rem" fontWeight="700">
              Name
            </Text>
            <Text fontSize=".65rem" color="gray.400">
              Community names including capitalization cannot be changed
            </Text>
          </Box>
          <Box>
            <Input
              placeholder="r/"
              fontSize=".85rem"
              height="34px"
              bg="gray.50"
              mb={1}
              _placeholder={{ color: "gray.400" }}
              _hover={{ border: "1px solid", borderColor: "blue.500", bg: "white" }}
              _focus={{ border: "1px solid", borderColor: "blue.500", outline: "none" }}
              value={communityName}
              onChange={(e) => {
                setCommunityName(e.target.value);
              }}
            />
            <Text fontSize=".65rem" color="gray.400">
              {21 - communityName.length} Characters remaining
            </Text>
          </Box>
          <Box>
            <Text fontSize=".85rem" fontWeight="700" mb={1}>
              Community Type
            </Text>
            <Flex gap="2" align="end" paddingBlock={1}>
              <Checkbox />
              <Icon as={FaUserAlt} color="gray.500" fontSize=".85rem" ml={1} />
              <Text fontSize=".7rem">Public</Text>
              <Text fontSize=".6rem" color="gray.400">
                Anyone can view, post and comment to this community
              </Text>
            </Flex>
            <Flex gap="2" align="end" paddingBlock={1}>
              <Checkbox />
              <Icon as={BsFillEyeFill} color="gray.500" fontSize=".85rem" ml={1} />
              <Text fontSize=".7rem">Restricted</Text>
              <Text fontSize=".6rem" color="gray.400">
                Anyone can view this community, but only approved users can post
              </Text>
            </Flex>
            <Flex gap="2" align="end" paddingBlock={1}>
              <Checkbox />
              <Icon as={FaLock} color="gray.500" fontSize=".85rem" ml={1} />
              <Text fontSize=".7rem">Private</Text>
              <Text fontSize=".6rem" color="gray.400">
                Only approved users can view and submit to this community
              </Text>
            </Flex>
          </Box>
        </Flex>
      </ModalBody>
      <ModalFooter bg="gray.200" borderBottomRadius={6} paddingBlock="3">
        <Flex gap={2}>
          <Button variant="outline" size="sm" fontSize=".7rem" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" fontSize=".7rem">
            Create Community
          </Button>
        </Flex>
      </ModalFooter>
    </ModalWrapper>
  );
};

export default CreateCommunityModal;
