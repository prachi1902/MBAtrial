import React from "react";
import { Flex, Text, Img, Box, IconButton } from "@chakra-ui/react";
import { CircularCheckbox } from "@/components/FormComponents";
import SplineChart from "components/common/SplineChart";

const RC_VolumeSection = () => {
  return (
    <Box>
      <Flex
        mb="1.5rem"
        mt="0.5rem"
        align="center"
        justify="space-between"
        position="relative"
        px="1.5rem"
      >
        <Text>Vol vs Weekly Avg Spend</Text>
        <IconButton variant="unstyled" icon={<Img src="/svg/Pin.svg" />} />
      </Flex>
      <SplineChart />
      {/* <Img src="/png/14-graph.png" width="100%" px="1rem" /> */}

      <Box my="1rem">
        <Text
          fontStyle="italic"
          color="darkGray"
          fontSize="0.9rem"
          margin="auto"
          width="max-content"
        >
          Select vehicles to plot on response curve
        </Text>
      </Box>

      <Box width="100%" mb="2rem">
        <Flex width="65%" margin="auto">
          <Box width="25%" mr="2rem">
            <Flex alignItems="center" mb="0.5rem">
              <CircularCheckbox backgroundColor="#379972" onCheckBG="#379972" />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                ml="0.8rem"
                width="65%"
                fontSize="0.87rem"
              >
                <Text>Youtube</Text>
                <Text>24.55%</Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" mb="0.5rem">
              <CircularCheckbox backgroundColor="#f5a73b" onCheckBG="#f5a73b" />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                ml="0.8rem"
                width="65%"
                fontSize="0.87rem"
              >
                <Text>Facebook</Text>
                <Text>4.25%</Text>
              </Flex>
            </Flex>
            <Flex alignItems="center">
              <CircularCheckbox backgroundColor="#535bc9" onCheckBG="#535bc9" />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                ml="0.8rem"
                width="65%"
                fontSize="0.87rem"
              >
                <Text>TV</Text>
                <Text>8.98%</Text>
              </Flex>
            </Flex>
          </Box>
          <Box width="25%" mr="1.5rem" borderRight="1px solid #cccccc">
            <Flex alignItems="center" mb="0.5rem">
              <CircularCheckbox border="1px solid darkGray" />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                ml="0.8rem"
                width="65%"
                fontSize="0.87rem"
              >
                <Text>Vehicle Name</Text>
                <Text>24.55%</Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" mb="0.5rem">
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
              >
                <Text>Vehicle Name</Text>
                <Text>4.25%</Text>
              </Flex>
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
              >
                <Text>Vehicle Name</Text>
                <Text>8.98%</Text>
              </Flex>
            </Flex>
          </Box>
          <Box width="25%" mr="1.5rem" borderRight="1px solid #cccccc">
            <Flex alignItems="center" mb="0.5rem">
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
              >
                <Text>Vehicle Name</Text>
                <Text>24.55%</Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" mb="0.5rem">
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
              >
                <Text>Vehicle Name</Text>
                <Text>4.25%</Text>
              </Flex>
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
              >
                <Text>Vehicle Name</Text>
                <Text>8.98%</Text>
              </Flex>
            </Flex>
          </Box>
          <Box width="25%">
            <Flex alignItems="center" mb="0.5rem">
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
              >
                <Text>Vehicle Name</Text>
                <Text>24.55%</Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" mb="0.5rem">
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
              >
                <Text>Vehicle Name</Text>
                <Text>4.25%</Text>
              </Flex>
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
              >
                <Text>Vehicle Name</Text>
                <Text>8.98%</Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default RC_VolumeSection;
