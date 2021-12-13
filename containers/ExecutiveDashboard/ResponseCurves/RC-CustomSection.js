import React from "react";
import { Container, Section, Page } from "../../../components/library";
import { Flex, Text, Img, Box, IconButton } from "@chakra-ui/react";
import {
  CircularCheckbox,
  EditorDropdown,
  Tabs,
  TabsMultiSelect,
} from "@/components/FormComponents";
import { useForm } from "react-hook-form";

const RC_CustomSection = () => {
  const { control } = useForm();

  return (
    <Box>
      <Flex
        mb="1.5rem"
        mt="0.5rem"
        align="center"
        justify="space-between"
        position="relative"
        px="1.5rem"
        bg="#efefef "
        py="0.8rem"
      >
        <Text>Custom Response Curve</Text>
        <TabsMultiSelect
          options={["Volume", "ROI", "Reach"]}
          name="responseTabs"
          control={control}
          flexProps={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <IconButton variant="unstyled" icon={<Img src="/svg/Pin.svg" />} />
      </Flex>
      <Img src="/png/15-graph.png" width="100%" />
      <Box my="1rem">
        <Text
          fontStyle="italic"
          color="darkGray"
          fontSize="0.9rem"
          margin="auto"
          width="max-content"
        >
          Select a vehicle to display
        </Text>
      </Box>
      <Box width="100%" mb="2rem">
        <Flex width="65%" margin="auto">
          <Box width="25%" mr="2rem">
            <Flex alignItems="center" mb="0.5rem">
              <CircularCheckbox
                backgroundColor="#379972"
                black={true}
                border="solid 1px #F9AA4A"
              />
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
              <CircularCheckbox
                backgroundColor="#f5a73b"
                black={true}
                border="solid 1px #F9AA4A"
              />
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
              <CircularCheckbox
                backgroundColor="#535bc9"
                black={true}
                border="solid 1px #F9AA4A"
              />
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
              <CircularCheckbox black={true} border="solid 1px #F9AA4A" />
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
                black={true}
                border="solid 1px #F9AA4A"
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
                black={true}
                border="solid 1px #F9AA4A"
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
                black={true}
                border="solid 1px #F9AA4A"
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
                black={true}
                border="solid 1px #F9AA4A"
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
                black={true}
                border="solid 1px #F9AA4A"
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
                black={true}
                border="solid 1px #F9AA4A"
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
                black={true}
                border="solid 1px #F9AA4A"
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
                black={true}
                border="solid 1px #F9AA4A"
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

export default RC_CustomSection;
