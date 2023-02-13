import { Button, Grid, GridItem, Icon } from "@chakra-ui/react";
import React from "react";
import { GiCheckedShield } from "react-icons/gi";

const Premium = () => {
  return (
    <Grid
      gridTemplateColumns="15% 1fr"
      p="2"
      gridGap="1"
      bg="white"
      borderRadius="4"
      fontSize=".75rem"
      border="1px solid"
      borderColor="gray.300"
    >
      <GridItem rowSpan={2} justifySelf="center" alignSelf="center">
        <Icon as={GiCheckedShield} boxSize="6" color="brand.100" mb="3" />
      </GridItem>
      <GridItem fontWeight="600">Reddit Premium</GridItem>
      <GridItem>The best Reddit experience, with monthly Coins</GridItem>
      <GridItem colSpan={2} justifySelf="stretch">
        <Button
          size="xs"
          w="90%"
          paddingBlock="3.5"
          marginLeft="5%"
          backgroundColor="brand.100"
          _hover={{ opacity: ".6" }}
        >
          Try Now
        </Button>
      </GridItem>
    </Grid>
  );
};

export default Premium;
