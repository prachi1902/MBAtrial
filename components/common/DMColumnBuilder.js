import React from "react";
import { Flex, Text, Img } from "@chakra-ui/react";

const DMColumnBuilder = ({ columnItems = [], ...props }) => {
  return (
    <Flex
      position="sticky"
      top="0"
      alignItems="center"
      justifyContent="space-between"
      px="0.5rem"
      py="0.5rem"
      bg="lightGray"
      zIndex="2"
      width="100%"
      height="37px"
      {...props}
    >
      {columnItems.map((columnItem, i) => (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          fontSize="0.7rem"
          px="0.5rem"
          fontWeight="600"
          textAlign="left"
          width={columnItem[1]}
          key={i}
          {...props}
        >
          <Text textTransform="uppercase" letterSpacing="0.05rem">
            {columnItem[0]}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default DMColumnBuilder;
