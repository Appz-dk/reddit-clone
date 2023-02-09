import { Flex, Textarea, Button, Box, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type CommentInputProps = {
  user: User;
  commentText: string;
  isCreatingComment: boolean;
  setCommentText: (text: string) => void;
  onCreateComment: (commentText: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  user,
  commentText,
  isCreatingComment,
  setCommentText,
  onCreateComment,
}) => {
  // TODO: Refactor into helper function and replace everywhere its used
  const displayName = (user.displayName?.replaceAll(" ", "") || user.email!.split("@")[0])
    .replaceAll(".", "")
    .trim();

  return (
    <Flex direction="column" w="full" paddingInline={{ base: "2", sm: "4" }}>
      <Text fontSize=".7rem">Comment as {displayName}</Text>
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
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Flex bg="gray.200" p="1" justify="end" borderRadius="0 0 4px 4px">
          <Button
            size="xs"
            isDisabled={!commentText}
            isLoading={isCreatingComment}
            onClick={() => onCreateComment(commentText)}
          >
            Comment
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CommentInput;
