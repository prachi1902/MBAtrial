import React, { useState } from "react";
import { Flex, Box, Img, Text } from "@chakra-ui/react";

import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetSuccessful from "./ResetSuccessful";
import ResetPassword from "./ResetPassword";

const LoginLayout = () => {
  const [screen, setScreen] = useState("login");

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      backgroundImage="url('png/login_bg.png')"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        mb="15rem"
        // height="auto"
        borderRadius="7px"
        width="405px"
        boxShadow="0px 5px 15px rgba(0,0,0,0.075)"
        bg="#fafafa"
        zIndex="10"
      >
        <Box p="1.5rem" pt="1.35rem">
          <Flex
            width="100%"
            alignItems="center"
            justifyContent="center"
            mb="1.3rem"
          >
            <Img src="/svg/ABI logo color.svg" mr="0.7rem" />
            <Img src="/svg/mba logo red.svg" />
          </Flex>

          <Flex position="relative" mb="2.5rem">
            <Box
              position="absolute"
              borderTop="1px solid lightGray"
              width="110px"
              left="-24px"
              top="9px"
            ></Box>
            <Text
              textTransform="uppercase"
              letterSpacing="0.05rem"
              fontSize="0.8rem"
              color="black"
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
            >
              media budget allocator
            </Text>
            <Box
              position="absolute"
              borderTop="1px solid lightGray"
              width="110px"
              top="9px"
              right="-24px"
            ></Box>
          </Flex>
          {screen === "login" ? (
            <Login setScreen={setScreen} />
          ) : screen === "forgot" ? (
            <ForgotPassword setScreen={setScreen} />
          ) : screen === "reset" ? (
            <ResetPassword setScreen={setScreen} />
          ) : (
            <ResetSuccessful setScreen={setScreen} />
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginLayout;
