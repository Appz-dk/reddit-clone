import { Flex, Textarea, Button, Box, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type CommentInputProps = {
  user: User;
  commentText: string;
  setCommentText: (text: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({ user, commentText, setCommentText }) => {
  return (
    <Flex direction="column">
      <Text fontSize=".7rem">Comment as {user?.displayName}</Text>
      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="4"
        _focusWithin={{ borderColor: "black" }}
      >
        <Textarea
          fontSize=".75rem"
          height="6rem"
          borderRadius="4px 4px 0 0"
          placeholder="What are your thoughts?"
          border="none"
          _focus={{}}
          _focusVisible={{}}
          value={commentText}
          onChange={(e) => setCommentText(e.currentTarget.value)}
        />
        <Flex bg="gray.200" p="1" justify="end" borderRadius="0 0 4px 4px">
          <Button size="xs" isDisabled={!commentText}>
            Comment
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CommentInput;
