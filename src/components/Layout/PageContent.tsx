import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type PageContentProps = {
  children: ReactNode[];
  maxWidth?: string;
};

const PageContent: React.FC<PageContentProps> = ({ children, maxWidth = "860px" }) => {
  return (
    // TODO: Change maxWidth to % for better support at very big screens ??
    <Flex
      maxWidth={maxWidth}
      width="95%"
      justify="center"
      mx="auto"
      mt="6"
      gap="5"
      paddingBottom="4"
    >
      {/* Left side */}
      <Flex direction="column" width={{ base: "100%", md: "65%" }}>
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
