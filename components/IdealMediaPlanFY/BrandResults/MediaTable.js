import React from "react";
import { Flex } from "@chakra-ui/react";
import ColumnBuilder from "components/common/ColumnBuilder";
import MediaRows from "./MediaRows";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

function MediaTable() {
  const { mediaPlanState } = useMediaPlan();

  const columnItems = [
    ["SCENARIOS", "10%", "left"],
    ["SPEND", "13%", "left"],
    ["INC. NR", "13%", "left"],
    ["INC. MACO", "11%", "left"],
    ["INC. VOLUME", "13%", "left"],
    ["MEDIA ROI", "11%", "left"],
    ["WOA", "9%", "left"],
    ["QWOA", "9%", "left"],
    ["HIATUS PERIOD", "11%", "left"],
  ];

  const data = [
    {
      name: "IDEAL PLAN",
      spend: { value: "$ 2.55MM", increment: "" },
      nr: {
        value: `$ ${mediaPlanState.idealMediaPlanResults.nr}MM` || "-",
        increment: "",
      },
      maco: {
        value: `$ ${mediaPlanState.idealMediaPlanResults.maco}` || "-",
        increment: "",
      },
      volume: { value: "500,500 HL", increment: "" },
      roi: {
        value: `$ ${mediaPlanState.idealMediaPlanResults.roi}` || "-",
        increment: "",
      },
      woa: {
        value: mediaPlanState.idealMediaPlanResults.woa || "-",
        increment: "",
      },
      qwoa: { value: "26", increment: "(32)" },
      hp: "4",
      tag: "true",
    },
    {
      name: "LY",
      spend: { value: "$ 2.15MM", increment: "0.4%" },
      nr: { value: "$ 45.55MM", increment: "0.4%" },
      maco: { value: "$ 3,255", increment: "0.4%" },
      volume: { value: "500,500 HL", increment: "0.4%" },
      roi: { value: "$ 1.25", increment: "$ 0.05" },
      woa: { value: "25", increment: "7w" },
      qwoa: { value: "20", increment: "7w" },
      hp: "5",
    },
  ];

  return (
    <Flex alignItems="center" flexDirection="column" mb="1.5rem" width="100%">
      <ColumnBuilder
        columnItems={columnItems}
        flexProps={{
          justifyContent: "center",
          p: "1rem 0rem",
          bg: "formBgGray",
          borderRadius: "4px",
          mt: "0rem",
          height: "2rem",
          mb: "0.7rem",
        }}
        textProps={{
          p: "0rem 0rem",
          fontSize: "0.75rem",
        }}
      />
      {data.map((d, i) => {
        return <MediaRows data={d} key={i} />;
      })}
    </Flex>
  );
}

export default MediaTable;
