import React from "react";
import { Flex } from "@chakra-ui/react";
import ColumnBuilder from "components/common/ColumnBuilder";
import BrandResultsTableRows from "./BrandResultsTableRows";

function BrandResultsTable() {
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
      name: "SIM PLAN 1",
      spend: { value: "$ 2.55MM", increment: "" },
      nr: { value: "$ 45.55MM", increment: "" },
      maco: { value: "$ 3,255", increment: "" },
      volume: { value: "500,500 HL", increment: "" },
      roi: { value: "$ 1.25", increment: "" },
      woa: { value: "32", increment: "" },
      qwoa: { value: "26", increment: "(32)" },
      hp: "4",
      tag: "true",
    },
    {
      name: "OPT PLAN 1",
      spend: { value: "$ 2.15MM", decrement: "0.4%" },
      nr: { value: "$ 45.55MM", decrement: "0.4%" },
      maco: { value: "$ 3,255", decrement: "0.4%" },
      volume: { value: "500,500 HL", decrement: "0.4%" },
      roi: { value: "$ 1.25", decrement: "$ 0.05" },
      woa: { value: "25", increment: "7w" },
      qwoa: { value: "20", increment: "7w" },
      hp: "5",
    },
  ];

  return (
    <Flex alignItems="center" flexDirection="column" mb="1rem" width="95%">
      <ColumnBuilder
        columnItems={columnItems}
        flexProps={{
          justifyContent: "center",
          p: "1rem 0rem",
          bg: "white",
          borderRadius: "4px",
          mt: "0rem",
          height: "2rem",
          mb: "0.5rem",
        }}
        textProps={{
          p: "0rem 0rem",
          letterSpacing: "0.05rem",
          color: "gray",
        }}
      />
      {data.map((d, i) => {
        return <BrandResultsTableRows data={d} key={i} />;
      })}
    </Flex>
  );
}

export default BrandResultsTable;
