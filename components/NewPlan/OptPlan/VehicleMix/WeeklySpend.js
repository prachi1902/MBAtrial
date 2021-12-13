import React from "react";
import { Flex, Text, Box, Img } from "@chakra-ui/react";
import { CircularCheckbox } from "@/components/FormComponents";

const WeeklySpend = () => {
  return (
    <Box width="100%" mb="2rem">
      <Flex width="75%" margin="auto">
        <Box width="25%" mr="1rem">
          <Flex alignItems="center" mb="0.8rem">
            <CircularCheckbox backgroundColor="#379972" onCheckBG="#379972" />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>Youtube</Text>
              <Text>24.55%</Text>
            </Flex>
            <Img src="/svg/unlock.svg" />
          </Flex>
          <Flex alignItems="center" mb="0.8rem">
            <CircularCheckbox backgroundColor="#f5a73b" onCheckBG="#f5a73b" />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>Facebook</Text>
              <Text>4.25%</Text>
            </Flex>
            <Img src="/svg/unlock.svg" />
          </Flex>
          <Flex alignItems="center">
            <CircularCheckbox backgroundColor="#535bc9" onCheckBG="#535bc9" />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>TV</Text>
              <Text>8.98%</Text>
            </Flex>
            <Img src="/svg/unlock.svg" />
          </Flex>
        </Box>
        <Box width="25%" mr="1rem" borderRight="1px solid #cccccc">
          <Flex alignItems="center" mb="0.8rem">
            <CircularCheckbox border="1px solid darkGray" />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>Vehicle Name</Text>
              <Text>24.55%</Text>
            </Flex>
            <Img src="/svg/lock.svg" />
          </Flex>
          <Flex alignItems="center" mb="0.8rem">
            <CircularCheckbox
              backgroundColor="white"
              border="1px solid darkGray"
            />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>Vehicle Name</Text>
              <Text>4.25%</Text>
            </Flex>
            <Img src="/svg/lock.svg" />
          </Flex>
          <Flex alignItems="center">
            <CircularCheckbox
              backgroundColor="white"
              border="1px solid darkGray"
            />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>Vehicle Name</Text>
              <Text>8.98%</Text>
            </Flex>
            <Img src="/svg/lock.svg" />
          </Flex>
        </Box>
        <Box width="25%" mr="1rem" borderRight="1px solid #cccccc">
          <Flex alignItems="center" mb="0.8rem">
            <CircularCheckbox
              backgroundColor="white"
              border="1px solid darkGray"
            />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>Vehicle Name</Text>
              <Text>24.55%</Text>
            </Flex>
            <Img src="/svg/lock.svg" />
          </Flex>
          <Flex alignItems="center" mb="0.8rem">
            <CircularCheckbox
              backgroundColor="white"
              border="1px solid darkGray"
            />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>Vehicle Name</Text>
              <Text>4.25%</Text>
            </Flex>
            <Img src="/svg/lock.svg" />
          </Flex>
          <Flex alignItems="center">
            <CircularCheckbox
              backgroundColor="white"
              border="1px solid darkGray"
            />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>Vehicle Name</Text>
              <Text>8.98%</Text>
            </Flex>
            <Img src="/svg/lock.svg" />
          </Flex>
        </Box>
        <Box width="25%">
          <Flex alignItems="center" mb="0.8rem">
            <CircularCheckbox
              backgroundColor="white"
              border="1px solid darkGray"
            />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>Vehicle Name</Text>
              <Text>24.55%</Text>
            </Flex>
            <Img src="/svg/lock.svg" />
          </Flex>
          <Flex alignItems="center" mb="0.8rem">
            <CircularCheckbox
              backgroundColor="white"
              border="1px solid  darkGray"
            />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>Vehicle Name</Text>
              <Text>4.25%</Text>
            </Flex>
            <Img src="/svg/lock.svg" />
          </Flex>
          <Flex alignItems="center">
            <CircularCheckbox
              backgroundColor="white"
              border="1px solid  darkGray"
            />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              ml="0.8rem"
              width="65%"
              fontSize="0.87rem"
              mr="0.8rem"
            >
              <Text>Vehicle Name</Text>
              <Text>8.98%</Text>
            </Flex>
            <Img src="/svg/lock.svg" />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default WeeklySpend;
