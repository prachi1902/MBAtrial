import React from "react";
import { Flex, Text, Img, Box, Button } from "@chakra-ui/react";

const ResetSuccessful = ({ setScreen }) => (
  <Box mt="-0.5rem">
    <Box
      width="60%"
      bg="#f2f2f2"
      boxShadow="0px 2px 4px 0px rgba(0,0,0,0.2)"
      margin="auto"
      height="8.75rem"
      p="1rem 0.5rem"
    >
      <Text margin="auto" mb="0.9rem" textAlign="center">
        Password Reset Successfully
      </Text>
      <Box
        bg="#379972"
        borderRadius="50%"
        width="4.4rem"
        height="4.4rem"
        margin="auto"
        position="relative"
      >
        <Img
          src="/svg/confirm white.svg"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </Box>
    </Box>
    <Flex mt="1rem" alignItems="center" justifyContent="center">
      <Button
        leftIcon={<Img boxSize="24px" mr="5px" src="/svg/Key.svg" />}
        variant="primary"
        type="submit"
        fontWeight="500"
        color="black"
        maxHeight="2.25rem"
        width="6.25rem"
        onClick={() => setScreen("login")}
      >
        Login
      </Button>
    </Flex>
  </Box>
);

export default ResetSuccessful;
