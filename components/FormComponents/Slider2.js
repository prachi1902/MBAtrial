import React from "react";
import {
  Text,
  Box,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

const Slider2 = () => {
  return (
    <Flex>
      <Slider isReversed step={1} aria-label="slider-ex-4" defaultValue={0}>
        <SliderTrack borderRightRadius="4px" height="7px" bg="#dddddd">
          <SliderFilledTrack bg="#F7951D" />
        </SliderTrack>
        <SliderThumb
          ml="-7.5px"
          bg="#FBC078"
          width="15px"
          height="35px"
          border="solid 1px #B27831"
          borderRadius="4px"
          boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
        />
      </Slider>
      <Box position="relative">
        <Text
          fontWeight="600"
          fontSize="0.75rem"
          width="160px"
          position="absolute"
          left="-12"
          top="-25"
          textTransform="uppercase"
          color="textGray"
          letterSpacing="0.03rem"
        >
          LY Vehicle Spend
        </Text>
        <Box
          zIndex="9"
          height="35px"
          borderRadius="4px"
          bg="primaryRed"
          width="4px"
        />
      </Box>
      <Slider ml="0.5px" step={1} aria-label="slider-ex-4" defaultValue={0}>
        <SliderTrack borderRightRadius="4px" height="7px" bg="#dddddd">
          <SliderFilledTrack bg="#F7951D" />
        </SliderTrack>
        <SliderThumb
          ml="7.5px"
          bg="#FBC078"
          width="15px"
          height="35px"
          border="solid 1px #B27831"
          borderRadius="4px"
          boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
        />
      </Slider>
    </Flex>
  );
};

export default Slider2;
