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
import { User } from "firebase/auth";

import { useCreateCommunity } from "../../../hooks/useCreateCommunity";
import { CommunityType, isCommunityType } from "../../../atoms/communitiesAtom";
import { useRouter } from "next/router";

type CreateCommunityModalType = {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
};

const CreateCommunityModal: React.FC<CreateCommunityModalType> = ({ isOpen, onClose, user }) => {
  const router = useRouter();
  const [communityName, setCommunityName] = useState("");
  const [communityType, setCommunityType] = useState<CommunityType>("public");

  const { createCommunity, error, loading } = useCreateCommunity(user);

  const onCommunityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setCommunityName(e.target.value);
  };

  const onCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Type-guard
    if (isCommunityType(e.target.name)) {
      setCommunityType(e.target.name);
    }
  };

  const handleCreateCommunity = async () => {
    await createCommunity({ communityName, communityType });
    onClose();
    router.push(`/r/${communityName}`);
  };

  return (
    <ModalWrapper onClose={onClose} isOpen={isOpen} size="lg">
      <ModalHeader fontSize=".9rem" fontWeight="700" padding={3}>
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
        paddingInline="3"
      >
        <Flex width="full" direction="column" gap={5}>
          <Box>
            <Text fontSize=".85rem" fontWeight="600">
              Name
            </Text>
            <Text fontSize=".65rem" color="gray.500">
              Community names including capitalization cannot be changed
            </Text>
          </Box>
          <Box mt={-4}>
            <Text
              position="relative"
              inset="28px 10px"
              fontSize=".85rem"
              w="fit-content"
              color="gray.400"
              zIndex={99}
            >
              r/
            </Text>
            <Input
              size="sm"
              fontSize=".85rem"
              height="34px"
              bg="gray.50"
              pl={22}
              mb={1}
              borderRadius="4"
              _placeholder={{ color: "gray.500" }}
              _hover={{ border: "1px solid", borderColor: "blue.500", bg: "white" }}
              _focus={{ border: "1px solid", borderColor: "blue.500", outline: "none" }}
              value={communityName}
              onChange={onCommunityNameChange}
            ></Input>

            <Text fontSize=".65rem" color={communityName.length === 21 ? "red.500" : "gray.500"}>
              {21 - communityName.length} Characters remaining
            </Text>
            {/* TODO: Maybe find a better UI solution. Maybe replace the above text on errors */}
            <Text fontSize=".75rem" color="red.500">
              {error}
            </Text>
          </Box>
          <Box>
            <Text fontSize=".85rem" fontWeight="600" mb={1}>
              Community Type
            </Text>
            <Flex gap="2" align="center" paddingBlock={1}>
              <Checkbox
                name="public"
                isChecked={communityType === "public"}
                onChange={onCommunityTypeChange}
              />
              <Icon as={FaUserAlt} color="gray.500" fontSize=".85rem" ml={1} />
              <Text fontSize=".8rem">Public</Text>
              <Text fontSize=".7rem" color="gray.500">
                Anyone can view, post and comment to this community
              </Text>
            </Flex>
            <Flex gap="2" align="center" paddingBlock={1}>
              <Checkbox
                name="restricted"
                isChecked={communityType === "restricted"}
                onChange={onCommunityTypeChange}
              />
              <Icon as={BsFillEyeFill} color="gray.500" fontSize="1rem" ml={1} />
              <Text fontSize=".8rem">Restricted</Text>
              <Text fontSize=".7rem" color="gray.500">
                Anyone can view this community, but only approved users can post
              </Text>
            </Flex>
            <Flex gap="2" align="center" paddingBlock={1}>
              <Checkbox
                name="private"
                isChecked={communityType === "private"}
                onChange={onCommunityTypeChange}
              />
              <Icon as={FaLock} color="gray.500" fontSize=".9rem" ml={1} />
              <Text fontSize=".8rem">Private</Text>
              <Text fontSize=".7rem" color="gray.500">
                Only approved users can view and submit to this community
              </Text>
            </Flex>
          </Box>
        </Flex>
      </ModalBody>
      <ModalFooter bg="gray.100" borderBottomRadius={6} paddingBlock="3">
        <Flex gap={2}>
          <Button variant="outline" size="sm" fontSize=".7rem" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            fontSize=".7rem"
            isLoading={loading && !error}
            onClick={() => handleCreateCommunity()}
          >
            Create Community
          </Button>
        </Flex>
      </ModalFooter>
    </ModalWrapper>
  );
};

export default CreateCommunityModal;
