import React, { useState, useEffect } from "react";
import { Flex, Collapse, Box } from "@chakra-ui/react";

import axios, { responseHandler, errorHandler } from "lib/http";
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
  const [simPlanValues, setSimPlanValues] = useState({
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

  const { mediaPlanState, mediaPlanDispatch } = useMediaPlan();

  useEffect(() => {
    if (mediaPlanState.selectedPlan.hasExecuted && mediaPlanState.createNew) {
      axios({
        url: "/hitausperiod",
        method: "post",
        params: { id: mediaPlanState.selectedPlan.id },
      })
        .then(responseHandler)
        .then((data) => {
          mediaPlanDispatch.updateSelectedPlan({
            otherDetails: {
              woa: data.response.woa,
              qwoa: data.response.woa,
              hiatus_period: data.response.hiatus_period,
            },
          });
        })
        .catch(errorHandler);
    }
  }, [mediaPlanState.selectedPlan.id, mediaPlanState.selectedPlan.hasExecuted]);

  useEffect(() => {
    if (mediaPlanState.selectedPlan.opt_spends) {
      let spend = 0;
      let nr = 0;
      let maco = 0;
      let volume = 0;
      mediaPlanState.selectedPlan.opt_spends.forEach((data) => {
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
        woa: 45,
        qwoa: 40,
        hp: 1,
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
        woa: 45,
        qwoa: 40,
        hp: 1,
      });
    }
  }, [mediaPlanState.selectedPlan.opt_spends]);

  useEffect(() => {
    setSimPlanValues({
      spend: 0,
      volume: 0,
      maco: 0,
      nr: 0,
      roi: 0,
      woa: 0,
      qwoa: 0,
      hp: null,
    });
    if (mediaPlanState.selectedPlan.sim_spends.length) {
      let spend = 0;
      let nr = 0;
      let maco = 0;
      let volume = 0;
      mediaPlanState.selectedPlan.sim_spends.forEach((data) => {
        spend += parseFloat(data.opt_planned_spend);
        volume += parseFloat(data.final_adjusted_volume);
        maco += parseFloat(data.final_maco);
        nr += parseFloat(data.final_nr);
      });
      setSimPlanValues({
        spend,
        volume,
        maco,
        nr,
        roi: maco / spend,
        woa: 45,
        qwoa: 40,
        hp: 1,
      });
    }
  }, [mediaPlanState.selectedPlan.sim_spends]);
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
      <BrandKPIsRow
        tag
        spend={simPlanValues.spend}
        volume={simPlanValues.volume}
        maco={simPlanValues.maco}
        nr={simPlanValues.nr}
        roi={simPlanValues.roi}
        woa={mediaPlanState.selectedPlan?.otherDetails?.woa}
        qwoa={"NA"}
        hp={mediaPlanState.selectedPlan?.otherDetails?.hiatus_period}
        name="SIM PLAN"
      />
      <Box width="100%">
        <Collapse in={selectedScenario?.includes("Opt Plan")}>
          <BrandKPIsRow
            {...optPlanValues}
            hp={mediaPlanState.selectedPlan?.opt_plan_details?.hiatus_period}
            woa={mediaPlanState.selectedPlan?.opt_plan_details?.woa}
            qwoa={"NA"}
            compareValues={{
              ...simPlanValues,
              woa: mediaPlanState.selectedPlan?.otherDetails?.woa,
              qwoa: null,
              hiatus: mediaPlanState.selectedPlan?.otherDetails?.hiatus_period,
            }}
            name="OPT PLAN"
          />
        </Collapse>
      </Box>
      <Box width="100%">
        <Collapse in={selectedScenario?.includes("Ideal")}>
          <BrandKPIsRow
            {...idealPlanValues}
            woa={mediaPlanState.listOfAllPlans[0]?.otherDetails?.woa}
            qwoa={"NA"}
            hp={mediaPlanState.listOfAllPlans[0]?.otherDetails?.hiatus_period}
            compareValues={{
              ...simPlanValues,
              woa: mediaPlanState.selectedPlan?.otherDetails?.woa,
              qwoa: null,
              hiatus: mediaPlanState.selectedPlan?.otherDetails?.hiatus_period,
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
            compareValues={{
              ...simPlanValues,
              woa: mediaPlanState.selectedPlan?.otherDetails?.woa,
              qwoa: mediaPlanState.selectedPlan?.otherDetails?.qwoa,
              hp: mediaPlanState.selectedPlan?.otherDetails?.hp,
            }}
            name="LY"
          />
        </Collapse>
      </Box>
    </Flex>
  );
};

export default BrandKPIsTable;
