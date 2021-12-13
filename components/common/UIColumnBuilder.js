import React from "react";

import { Flex, Text } from "@chakra-ui/react";

const UIColumnBuilder = ({ columnItems = [], ...props }) => {
  return (
    <Flex
      mt="1rem"
      alignItems="center"
      justifyContent="space-between"
      px="1.2rem"
      py="0.5rem"
      bg="formBgGray"
      width="100%"
      {...props}
    >
      {columnItems.map((columnItem, i) => (
        <Text
          fontSize="0.75rem"
          letterSpacing="0.05rem"
          fontWeight="600"
          textAlign="left"
          css={{ textTransform: "uppercase" }}
          width={columnItem[1]}
          key={i}
        >
          {columnItem[0]}
        </Text>
      ))}
    </Flex>
  );
};

export default UIColumnBuilder;
