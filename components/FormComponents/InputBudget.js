import React from "react";
import { Text, Box, Input, FormLabel, Flex } from "@chakra-ui/react";

import Error from "./ErrorMessage";

const InputBudget = React.forwardRef(
  (
    {
      label,
      mr = "0rem",
      frontSymbol,
      backSymbol,
      errors,
      width = "20%",
      height = "40px",
      placeholder,
      inputRightText = "",
      labelProps,
      flexProps,
      flexInsideProps,
      inputProps,
      defaultValue = "",
      ...props
    },
    ref
  ) => {
    return (
      <Box mr={mr} width={width} as="label">
        {label && <FormLabel {...labelProps}>{label}</FormLabel>}
        <Flex
          overflowX="hidden"
          alignItems="center"
          justifyContent="space-between"
          height={height}
          borderRadius="5px"
          border="solid 1px #cccccc"
          bg="white"
          pl={frontSymbol ? "1rem" : "0.2rem"}
          margin="auto"
          {...flexProps}
        >
          <Flex alignItems="center" {...flexInsideProps}>
            {frontSymbol}
            <Input
              ml="0.3rem"
              minWidth="70%"
              variant="unstyled"
              ref={ref}
              placeholder={placeholder}
              defaultValue={defaultValue}
              {...inputProps}
              {...props}
            />
            {backSymbol}
          </Flex>
          {inputRightText && (
            <Text ml="1rem" color="darkGray">
              {inputRightText}
            </Text>
          )}
        </Flex>
        <Error name={props.name} errors={errors} />
      </Box>
    );
  }
);
export default InputBudget;
