import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const Loader = ({ size = "md", color = "primaryRed", height }) => {
  return height ? (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      minHeight={{ xs: "300px", md: "500px" }}
    >
      <Spinner color={color} speed="0.8s" size={size} />
    </Flex>
  ) : (
    <Spinner size={size} speed="0.8s" color={color} margin="auto" />
  );
};

export default Loader;
