import React from "react";
import AnyChart from "anychart-react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "@chakra-ui/react";

const Donut = ({
  data = [
    { id: "donutchart-1", name: "Work", value: 11 },
    { id: "donutchart-2", name: "Eat", value: 2 },
    { id: "donutchart-3", name: "Commute", value: 2 },
    { id: "donutchart-4", name: "Watch TV", value: 2 },
    { id: "donutchart-5", name: "Sleep", value: 7 },
  ],
  heading,
  height,
  flexProps,
}) => {
  const chartColor = [
    "#971B1E",
    "#E02124",
    "#F7951D",
    "#00C0C7",
    "#5144D3",
    "#DA3490",
    "#9089FA",
    "#47E26F",
    "#2780EB",
    "#DFBF03",
    "#CB6F10",
  ];

  const newData = data.map((point, i) => ({
    ...point,
    normal: { fill: chartColor[i] },
  }));
  return (
    <Wrapper {...flexProps}>
      <AnyChart
        colors={chartColor}
        type="pie"
        id={heading}
        background={{ fill: "none" }}
        legend={false}
        labels={{
          position: "outside",
          fontColor: "#000",
        }}
        padding={0}
        height={height}
        innerRadius="60%"
        radius="100%"
        data={newData}
        width={460}
      />
      <Box mr="1rem" maxH="200px" overflowY="auto">
        {data.map((point, i) => (
          <Flex mb="0.5rem" key={point.id} align="center">
            <Box
              mr="5px"
              bg={chartColor[i]}
              height="15px"
              borderRadius="50%"
              width="15px"
              minWidth="15px"
            />
            <Text wordBreak="break-word" fontSize="0.875rem">
              {point.name}
            </Text>
          </Flex>
        ))}
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  tspan {
    color: #000;
  }
`;

export default Donut;
