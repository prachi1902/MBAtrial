import React from "react";
import { Box, Img } from "@chakra-ui/react";

const AnimatedBeerJugs = ({ digitalHeight, traditionalHeight }) => {
  return (
    <Box height="12rem" width="100%" minW="490px" position="relative">
      <Img
        ml="3rem"
        bottom="20px"
        position="absolute"
        width="160px"
        height="auto"
        src="/png/barrell.png"
      />
      <Img
        left="200px"
        bottom="20px"
        width="53%"
        src="/png/lines 1.png"
        position="absolute"
      />
      <Box
        height="115px"
        width="93px"
        bottom="40px"
        left="53%"
        position="absolute"
      >
        <Box width="100%" zIndex="9" position="relative">
          <Img zIndex="2" src="/png/beer glass.png" height="115px" />
        </Box>
        <Box
          zIndex="0"
          position="absolute"
          height={`${digitalHeight * 85}px`}
          transition="height 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          left="32px"
          bottom="8px"
          borderBottomRadius="10px"
          width="49px"
          bg="#EF9F4B"
        />
      </Box>
      <Box
        height="115px"
        width="93px"
        bottom="40px"
        left="83%"
        position="absolute"
      >
        <Box width="100%" zIndex="9" position="relative">
          <Img zIndex="2" src="/png/beer glass.png" height="115px" />
        </Box>
        <Box
          zIndex="0"
          position="absolute"
          height={`${traditionalHeight * 85}px`}
          transition="height 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          left="32px"
          bottom="8px"
          borderBottomRadius="10px"
          width="49px"
          bg="#EF9F4B"
        />
      </Box>
    </Box>
  );
};

export default AnimatedBeerJugs;
