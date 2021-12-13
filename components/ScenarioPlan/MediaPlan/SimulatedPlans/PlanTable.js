import React from "react";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";
import PlanRows from "./PlanRows";

function PlanTable() {
  const data = [
    {
      name: "SIM",
      mediaValue: "$ 1.552MM",
      digitalValue: {
        value: "$ 82.55MM",
        percentage: "75.29%",
      },
      traditionalValue: {
        value: "$ 229.45MM",
        percentage: "25.29%",
      },
      tag: "true",
    },
    {
      name: "OPT",
      mediaValue: "$ 82.55MM",
      digitalValue: {
        value: "$ 82.55MM",
        percentage: "75.29%",
      },
      traditionalValue: {
        value: "$ 229.45MM",
        percentage: "25.29%",
      },
      tag: "false",
    },
    {
      name: "IDEAL",
      mediaValue: "$ 82.55MM",
      digitalValue: {
        value: "$ 82.55MM",
        percentage: "75.29%",
      },
      traditionalValue: {
        value: "$ 229.45MM",
        percentage: "25.29%",
      },
      tag: "false",
    },
    {
      name: "LY",
      mediaValue: "$ 82.55MM",
      digitalValue: {
        value: "$ 82.55MM",
        percentage: "75.29%",
      },
      traditionalValue: {
        value: "$ 229.45MM",
        percentage: "25.29%",
      },
      tag: "false",
    },
  ];

  return (
    <>
      <Flex
        px="0.5rem"
        py="1rem"
        position="relative"
        alignItems="center"
        flexDirection="column"
        mb="1.5rem"
      >
        <Box
          bg="#ebe4d8"
          borderRadius="8px"
          zIndex="1"
          position="absolute"
          width="8rem"
          left="15.2%"
          top="8%"
          bottom="4%"
        >
          <Box
            bg="white"
            borderRadius="6px"
            zIndex="100"
            position="absolute"
            left="10%"
            top="21%"
            height="20%"
            width="81%"
          ></Box>
        </Box>
        <Flex
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          pb="0.3rem"
        >
          <Text width="12%" />
          <Text
            width="16%"
            textAlign="center"
            color="darkGray"
            fontWeight="500"
            fontSize="0.8rem"
            // ml="1rem"
            zIndex="100"
          >
            MEDIA BUDGET
          </Text>
          <Text
            width="25%"
            textAlign="center"
            color="darkGray"
            fontWeight="500"
            fontSize="0.8rem"
            pl="5rem"
          >
            DIGITAL
          </Text>
          <Text
            width="27%"
            textAlign="center"
            color="darkGray"
            fontWeight="500"
            fontSize="0.8rem"
            // ml="1rem"
          >
            TRADITIONAL
          </Text>
        </Flex>
        {data.map((d, i) => {
          return <PlanRows data={d} key={i} />;
        })}
      </Flex>
    </>
  );
}

export default PlanTable;
