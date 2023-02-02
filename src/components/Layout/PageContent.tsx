import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type PageContentProps = {
  children: ReactNode[];
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    // TODO: Change maxWidth to % for better support at very big screens ??
    <Flex maxWidth="860px" justify="center" mx="auto" mt="6" paddingInline={4} gap="6">
      {/* Left side */}
      <Flex direction="column" width={{ base: "100%", md: "60%" }}>
        {children && children[0]}
      </Flex>
      {/* Right side */}
      <Flex direction="column" display={{ base: "none", md: "flex" }} flexGrow="1">
        {children && children[1]}
      </Flex>
    </Flex>
  );
};

export default PageContent;
