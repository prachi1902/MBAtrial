import React from "react";
import { Flex, Text, Img, Box, IconButton, Skeleton } from "@chakra-ui/react";

const PresentGraph = ({ handle, slidesData, slideNumber, setSliderNumber }) => {
  return (
    <Box bg="white" width="100%" height="100%">
      <Flex
        justify="space-between"
        position="relative"
        height="15vh"
        align="center"
      >
        <Flex width="175px" height="100%">
          <Img
            position="absolute"
            height="100%"
            top="0"
            src="/svg/presentation-left.svg"
          />
          <Flex
            align="center"
            height="50%"
            left="50px"
            top="0"
            position="absolute"
          >
            <Img height="35%" mr="5px" src="/svg/ABI logo color.svg" />
            <Img height="35%" src="/svg/mba logo red.svg" />
          </Flex>
        </Flex>
        <Text fontSize="2rem">{slidesData[slideNumber]?.page_title}</Text>
        <Flex width="175px" alignItems="center" ml="1rem">
          <IconButton
            icon={<Img src="/svg/left.svg" />}
            bg="lightGray"
            border="none"
            isRound={true}
            mr="0.5rem"
            size="sm"
            onClick={() => {
              if (slideNumber) setSliderNumber(slideNumber - 1);
            }}
          />
          <Text mr="0.5rem">
            {slideNumber + 1}/{slidesData?.length}
          </Text>
          <IconButton
            icon={<Img src="/svg/right.svg" />}
            bg="lightGray"
            border="none"
            isRound={true}
            size="sm"
            onClick={() => {
              if (slideNumber + 1 < slidesData?.length)
                setSliderNumber(slideNumber + 1);
            }}
          />
          <IconButton
            ml="1rem"
            mr="2rem"
            bg="lightGray"
            border="none"
            isRound={true}
            size="xs"
            icon={<Img src="/svg/close2.svg" />}
            onClick={handle.exit}
          />
        </Flex>
      </Flex>
      <Box mx="auto" my="2rem">
        {slidesData[slideNumber]?.page_pic ? (
          <Img
            height="40vh"
            maxHeight="432px"
            maxWidth="100%"
            mx="auto"
            src={`data:image/png;base64,${slidesData[slideNumber]?.page_pic}`}
          />
        ) : (
          <Skeleton mx="auto" width="1250px" height="280px" />
        )}
      </Box>
      <Box bg="primaryRed" px="4rem" py="2rem" height="100%">
        <Text color="white">{slidesData[slideNumber]?.page_note}</Text>
      </Box>
    </Box>
  );
};

export default PresentGraph;
