import React from "react";
import { Flex } from "@chakra-ui/react";
import ColumnBuilder from "components/common/ColumnBuilder";
import FinalizeScenarioRow from "./FinalizeScenarioRow";

const FinalizeScenarioTable = () => {
  const columnItems = [
    ["SCENARIOS", "11%", "left"],
    ["SPEND", "16%", "left"],
    ["INC. NR", "18%", "left"],
    ["INC. MACO", "16%", "left"],
    ["INC. VOLUME", "19%", "left"],
    ["MEDIA ROI", "15%", "left"],
    ["WOA", "15%", "left"],
    ["QWOA", "15%", "left"],
    ["HIATUS PERIOD", "15%", "left"],
  ];

  const data = [
    {
      name: "USER DEF 1",
      spend: { value: "$ 2.55MM" },
      nr: { value: "$ 45.55MM" },
      maco: { value: "$ 3,255" },
      volume: { value: "500,500 HL" },
      roi: { value: "$ 1.25" },
      woa: { value: "32" },
      qwoa: { value: "26", increment: "(32)" },
      hp: "4",
      tag: "true",
    },
  ];

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      py="0.7rem"
      width="100%"
      bg="#f2f2f2"
      px="1.5rem"
    >
      <ColumnBuilder
        columnItems={columnItems}
        flexProps={{
          justifyContent: "center",
          p: "0.5rem 0rem",
          bg: "#f2f2f2",
          borderRadius: "4px",
          mt: "0rem",
          height: "2rem",
          pr: "2rem",
        }}
        textProps={{
          p: "0rem 0rem",
          letterSpacing: "0.05rem",
          color: "gray",
        }}
      />
      {data.map((d, i) => {
        return <FinalizeScenarioRow data={d} key={i} />;
      })}
    </Flex>
  );
};

export default FinalizeScenarioTable;
