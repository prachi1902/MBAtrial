import React from "react";
import { Box, Text } from "@chakra-ui/react";

const BetaTagWrapper = ({ type, children, ...props }) => {
  return (
    <Box position="relative">
      {type === "beta" ? (
        <Box
          px="0.25rem"
          borderRadius="4px"
          color="white"
          zIndex="2"
          fontSize="0.75rem"
          top="-5px"
          bg="#1274BF"
          right="-10px"
          position="absolute"
          {...props}
        >
          Beta
        </Box>
      ) : type === "coming" ? (
        <Box
          px="0.25rem"
          borderRadius="4px"
          color="white"
          zIndex="2"
          fontSize="0.75rem"
          top="-5px"
          bg="#6D7278"
          right="-10px"
          position="absolute"
          {...props}
        >
          Coming Soon
        </Box>
      ) : type === "later" ? (
        <Box
          px="0.25rem"
          borderRadius="4px"
          color="white"
          zIndex="2"
          fontSize="0.75rem"
          top="-5px"
          bg="#6D7278"
          right="-10px"
          position="absolute"
          {...props}
        >
          Later
        </Box>
      ) : (
        <Box
          px="0.25rem"
          borderRadius="4px"
          color="white"
          zIndex="2"
          fontSize="0.75rem"
          top="-5px"
          bg="#E02020"
          right="-10px"
          position="absolute"
          {...props}
        >
          New
        </Box>
      )}
      {children}
    </Box>
  );
};

export default BetaTagWrapper;
