import React from "react";
import { Box, Flex, FormLabel, Textarea } from "@chakra-ui/react";

const TextArea = React.forwardRef(
  ({ width, placeholder, label, boxProps, redLabel, ...props }, ref) => {
    return (
      <Box position="relative" {...boxProps}>
        {redLabel && (
          <Flex
            align="center"
            left="50%"
            zIndex="4"
            color="white"
            px="2rem"
            borderRadius="5px"
            transform="translateX(-50%)"
            top="-0.8rem"
            height="1.6rem"
            position="absolute"
            bg="primaryRed"
            fontSize="0.875rem"
          >
            NOTES
          </Flex>
        )}
        {label && <FormLabel>{label}</FormLabel>}
        <Textarea
          ref={ref}
          width={width}
          placeholder={placeholder}
          background="white"
          boxShadow="2px 2px 0px 0px rgba(0,0,0,0.2)"
          resize="none"
          {...props}
        />
      </Box>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
