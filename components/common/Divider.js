import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

const Divider = ({ text }) => {
  return (
    <Flex mt="5rem" mb="1rem" alignItems="center">
      <Box bg="bgGray" height="1px" width="100%" />
      <Text minWidth="200px" fontWeight="300" textAlign="center">
        {text}
      </Text>
      <Box bg="bgGray" height="1px" width="100%" />
    </Flex>
  );
};

export default Divider;
