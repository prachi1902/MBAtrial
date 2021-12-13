import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const Tabs = ({
  options,
  disabled,
  flexProps,
  setSelectedTab,
  selectedTab,
}) => {
  return (
    <Flex ref={field.ref} name={field.name} {...flexProps}>
      {options.map((option, i) => (
        <Box
          cursor="pointer"
          key={i}
          px="1rem"
          py="0.3rem"
          borderLeftRadius={i === 0 && "8px"}
          borderRightRadius={i === options.length - 1 && "8px"}
          border={
            selectedTab === option ? "solid 1px #B27831" : "solid 1px #cccccc"
          }
          borderLeft={
            selectedTab === option
              ? "solid 1px #B27831"
              : options[i - 1]
              ? "none"
              : "solid 1px #cccccc"
          }
          color={option === selectedTab ? "" : "darkGray"}
          bg={
            selectedTab === option
              ? "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)"
              : "transparent"
          }
          onClick={() => {
            if (disabled?.includes(option)) {
              null;
            } else {
              if (selectedTab === option) {
                return null;
              }
              setSelectedTab(option);
            }
          }}
          textDecoration={disabled?.includes(option) ? "line-through" : "none"}
        >
          {option}
        </Box>
      ))}
    </Flex>
  );
};

export default Tabs;
