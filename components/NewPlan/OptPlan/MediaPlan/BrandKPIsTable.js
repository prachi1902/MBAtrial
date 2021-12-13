import React, { useState, useEffect } from "react";
import { Flex, Collapse, Box } from "@chakra-ui/react";

import { useMediaPlan } from "@/redux/MediaPlanSlice";
import ColumnBuilder from "components/common/ColumnBuilder";
import BrandKPIsRow from "./BrandKPIsRow";

const BrandKPIsTable = ({ selectedScenario }) => {
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

  const [optPlanValues, setOptPlanValues] = useState({
    spend: 0,
    nr: 0,
    maco: 0,
    volume: 0,
    roi: 0,
  });
  const [idealPlanValues, setIdealPlanValues] = useState({
    spend: 0,
    nr: 0,
    maco: 0,
    volume: 0,
    roi: 0,
  });

  const { mediaPlanState } = useMediaPlan();

  useEffect(() => {
    if (
      mediaPlanState.selectedPlan.spends &&
      mediaPlanState.selectedPlan.type === "opt"
    ) {
      let spend = 0;
      let nr = 0;
      let maco = 0;
      let volume = 0;
      mediaPlanState.selectedPlan.spends.forEach((data) => {
        spend += parseFloat(data.opt_planned_spend);
        volume += parseFloat(data.final_adjusted_volume);
        maco += parseFloat(data.final_maco);
        nr += parseFloat(data.final_nr);
      });
      setOptPlanValues({
        spend,
        volume,
        maco,
        nr,
        roi: maco / spend,
      });
    }
    if (mediaPlanState.idealPlanSpends.length) {
      let spend = 0;
      let nr = 0;
      let maco = 0;
      let volume = 0;
      mediaPlanState.idealPlanSpends.forEach((data) => {
        spend += parseFloat(data.opt_planned_spend);
        volume += parseFloat(data.final_adjusted_volume);
        maco += parseFloat(data.final_maco);
        nr += parseFloat(data.final_nr);
      });
      setIdealPlanValues({
        spend,
        volume,
        maco,
        nr,
        roi: maco / spend,
      });
    }
  }, [mediaPlanState.selectedPlan.spends, mediaPlanState.idealPlanSpends]);
  return (
    <Flex alignItems="center" flexDirection="column" mb="1rem" width="100%">
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
      {mediaPlanState.selectedPlan.type !== "ideal" && (
        <BrandKPIsRow
          tag
          spend={optPlanValues.spend}
          volume={optPlanValues.volume}
          maco={optPlanValues.maco}
          nr={optPlanValues.nr}
          roi={optPlanValues.roi}
          woa={mediaPlanState.selectedPlan?.otherDetails?.woa}
          qwoa={"NA"}
          hp={mediaPlanState.selectedPlan?.otherDetails?.hiatus_period}
          name="OPT PLAN"
        />
      )}
      <Box width="100%">
        <Collapse in={selectedScenario?.includes("Ideal")}>
          <BrandKPIsRow
            tag={mediaPlanState.selectedPlan.type === "ideal"}
            spend={idealPlanValues.spend}
            volume={idealPlanValues.volume}
            maco={idealPlanValues.maco}
            nr={idealPlanValues.nr}
            roi={idealPlanValues.roi}
            woa={mediaPlanState.listOfAllPlans[0]?.otherDetails?.woa}
            qwoa={"NA"}
            hp={mediaPlanState.listOfAllPlans[0]?.otherDetails?.hiatus_period}
            compareValues={{
              ...optPlanValues,
              woa: mediaPlanState.selectedPlan?.otherDetails?.woa,
              qwoa: null,
              hp: mediaPlanState.selectedPlan?.otherDetails?.hp,
            }}
            name="IDEAL"
          />
        </Collapse>
      </Box>
      <Box width="100%">
        <Collapse in={selectedScenario?.includes("LY")}>
          <BrandKPIsRow
            spend={mediaPlanState.lyDetails.totalSpend}
            volume={mediaPlanState.lyDetails.totalVolume}
            maco={mediaPlanState.lyDetails.totalMACO}
            nr={mediaPlanState.lyDetails.totalNR}
            hp={null}
            roi={
              mediaPlanState.lyDetails.totalMACO /
              mediaPlanState.lyDetails.totalSpend
            }
            compareValues={
              mediaPlanState.selectedPlan.type === "ideal"
                ? {
                    ...idealPlanValues,
                    woa: mediaPlanState.selectedPlan?.otherDetails?.woa,
                    qwoa: null,
                    hp: mediaPlanState.selectedPlan?.otherDetails?.hp,
                  }
                : {
                    ...optPlanValues,
                    woa: mediaPlanState.selectedPlan?.otherDetails?.woa,
                    qwoa: null,
                    hp: mediaPlanState.selectedPlan?.otherDetails?.hp,
                  }
            }
            name="LY"
          />{" "}
        </Collapse>
      </Box>
    </Flex>
  );
};

export default BrandKPIsTable;
