import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const FullScreenLoader = () => {
  return (
    <Flex
      bg="rgba(0,0,0,0.5)"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      zIndex="99"
      top="0"
      bottom="0"
      left="0"
      right="0"
    >
      <Spinner color="primaryRed" speed="0.8s" size="xl" />
    </Flex>
  );
};

export default FullScreenLoader;
