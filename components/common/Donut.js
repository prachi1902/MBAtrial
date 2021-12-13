import React from "react";
import AnyChart from "anychart-react";
import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

const Donut = ({
  data = [
    { name: "Work", value: 11 },
    { name: "Eat", value: 2 },
    { name: "Commute", value: 2 },
    { name: "Watch TV", value: 2 },
    { name: "Sleep", value: 7 },
  ],
  headingValue,
  heading,
  height,
  boxProps,
  flexProps,
  headingProps,
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
  const legend = data.map((point, i) => ({
    text: point.name,
    iconType: "circle",
    iconFill: chartColor[i],
    fontColor: "#000",
  }));

  return (
    <Wrapper {...flexProps}>
      <AnyChart
        colors={chartColor}
        type="pie"
        id={heading}
        background={{ fill: "#fafafa" }}
        legend={{
          items: legend,
          position: "right",
          height: 160,
          width: 260,
          align: "center",
          itemsLayout: "vertical-expandable",
          padding: 0,
        }}
        labels={{
          position: "outside",
          fontColor: "#000",
        }}
        padding={0}
        // connectorStroke={false}
        height={height}
        innerRadius="60%"
        radius="100%"
        data={newData}
        width={600}
      />
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  tspan {
    color: #000;
  }
`;

export default Donut;
