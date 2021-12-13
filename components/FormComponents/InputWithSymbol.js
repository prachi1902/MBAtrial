import React, { useState } from "react";
import { Text, Box, Input, FormLabel, Flex } from "@chakra-ui/react";

const InputWithSymbol = React.forwardRef(
  (
    {
      label,
      mr = "0rem",
      frontSymbol,
      backSymbol,
      errors,
      bg = "white",
      width = "20%",
      height = "40px",
      borderColor = "#cccccc",
      placeholder,
      fontWeight,
      inputRightText = "",
      flexProps,
      fontSize = "1rem",
      inputProps,
      ...props
    },
    ref
  ) => {
    return (
      <Box mr={mr} minWidth={width} as="label">
        {label && <FormLabel>{label}</FormLabel>}
        <Flex
          overflowX="hidden"
          alignItems="center"
          justifyContent="space-between"
          height={height}
          borderRadius="5px"
          border={`solid 1px ${borderColor}`}
          bg={bg}
          pr="1rem"
          fontSize={fontSize}
          pl={frontSymbol ? "1rem" : "0.2rem"}
          position="relative"
          {...flexProps}
        >
          <Flex fontWeight={fontWeight} alignItems="center">
            {frontSymbol}
            <Input
              ml="0.3rem"
              _placeholder={{ color: "darkGray", fontSize: "1rem" }}
              minWidth="70%"
              variant="unstyled"
              ref={ref}
              fontSize={fontSize}
              fontWeight={fontWeight}
              placeholder={placeholder}
              {...inputProps}
              {...props}
            />
            {backSymbol}
          </Flex>
          <Box ml="1rem" color="darkGray">
            {inputRightText}
          </Box>
        </Flex>
      </Box>
    );
  }
);
export default InputWithSymbol;
