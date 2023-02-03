import { Flex, Input, Textarea, Button } from "@chakra-ui/react";

type PostTabProps = {
  onPostTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isDisabled: boolean;
  textState: { postTitle: string; postText: string };
  loading: boolean;
  handleCreatePost: () => void;
};

const PostTab: React.FC<PostTabProps> = ({
  onPostTextChange,
  isDisabled,
  textState,
  loading,
  handleCreatePost,
}) => {
  return (
    <Flex direction="column" width="full" gap="3">
      <Input
        autoComplete="off"
        name="postTitle"
        placeholder="Title"
        fontSize=".8rem"
        _focus={{ outline: "none", border: "1px solid" }}
        _focusVisible={{ outline: "none", border: "1px solid" }}
        value={textState.postTitle}
        onChange={onPostTextChange}
      />
      <Textarea
        name="postText"
        placeholder="Text (optional)"
        fontSize=".8rem"
        _focus={{ outline: "none", border: "1px solid" }}
        _focusVisible={{ outline: "none", border: "1px solid" }}
        value={textState.postText}
        onChange={onPostTextChange}
      />
      <Flex justify="end">
        {/* TODO: Change other "sm" buttons to size "xs" ? */}
        {/* And maybe require a min length for post title */}
        <Button
          size="xs"
          paddingInline="5"
          isLoading={loading}
          isDisabled={isDisabled}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Flex>
  );
};

export default PostTab;
