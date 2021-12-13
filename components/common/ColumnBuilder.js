import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const ColumnBuilder = ({ columnItems = [], flexProps, textProps }) => {
  return (
    <Flex
      mt="1rem"
      alignItems="center"
      justifyContent="space-between"
      p="1rem"
      bg="lightGray"
      width="100%"
      {...flexProps}
    >
      {columnItems.map((columnItem, i) => {
        return (
          <Text
            fontSize="0.7rem"
            px="0.5rem"
            textAlign={columnItem[2]}
            width={columnItem[1]}
            textTransform="uppercase"
            key={i}
            color="darkGray"
            letterSpacing="0.03rem"
            fontWeight="500"
            height="100%"
            {...textProps}
          >
            {columnItem[0]}
          </Text>
        );
      })}
    </Flex>
  );
};

export default ColumnBuilder;
