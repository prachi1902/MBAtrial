import React, { useEffect, useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

import { useMediaPlan } from "@/redux/MediaPlanSlice";
import helper from "@/lib/helper";

const FinalizeScenarioRow = ({ data }) => {
  const { mediaPlanState } = useMediaPlan();
  const [values, setValues] = useState({
    spend: 0,
    nr: 0,
    maco: 0,
    volume: 0,
    roi: 0,
    woa: 0,
    hp: 0,
    qwoa: "-",
  });
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
      setValues({
        spend,
        volume,
        maco,
        nr,
        roi: maco / spend,
        woa: mediaPlanState.selectedPlan?.otherDetails?.woa,
        hp: mediaPlanState.selectedPlan?.otherDetails?.hiatus_period,
      });
    }
    if (
      mediaPlanState.idealPlanSpends.length &&
      mediaPlanState.selectedPlan.type === "ideal"
    ) {
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
      setValues({
        spend,
        volume,
        maco,
        nr,
        roi: maco / spend,
        woa: mediaPlanState.listOfAllPlans[0]?.otherDetails?.woa,
        hp: mediaPlanState.listOfAllPlans[0]?.otherDetails?.hiatus_period,
      });
    }
    if (
      mediaPlanState.selectedPlan?.sim_spends?.length &&
      mediaPlanState.selectedPlan?.type === "sim"
    ) {
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
      setValues({
        spend,
        volume,
        maco,
        nr,
        roi: maco / spend,
        woa: mediaPlanState.selectedPlan?.otherDetails?.woa,
        hp: mediaPlanState.selectedPlan?.otherDetails?.hiatus_period,
      });
    }
  }, [mediaPlanState.selectedPlan.spends, mediaPlanState.idealPlanSpends]);
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      py="1rem"
      width="100%"
      height="1rem"
      pr="2rem"
    >
      <Box pr="1rem" width="10%">
        <Text color="gray" fontSize="0.7rem">
          {mediaPlanState?.selectedPlan?.type[0]?.toUpperCase() +
            mediaPlanState?.selectedPlan?.type.slice(1)}
        </Text>
      </Box>
      <Box px="0rem" width="15%">
        <Text fontSize="1.1rem">{helper.currencyFormatter(values.spend)}</Text>
      </Box>
      <Box pr="1.5rem" width="16%">
        <Text fontSize="1.1rem">{helper.currencyFormatter(values.nr)}</Text>
      </Box>
      <Box px="0rem" width="15%">
        <Text fontSize="1.1rem">{helper.currencyFormatter(values.maco)}</Text>
      </Box>
      <Box px="0.5rem" width="18%">
        <Text fontSize="1.1rem">
          {(values.volume / 1000).toFixed(0) + "K HL"}
        </Text>
      </Box>
      <Box px="0.5rem" width="15%">
        <Text fontSize="1.1rem">{helper.currencyFormatter(values.roi)}</Text>
      </Box>
      <Box px="0.3rem" width="11%" mr="1.5rem">
        <Text fontSize="1.1rem">{values.woa}</Text>
      </Box>
      <Box px="0.5rem" width="12%" mr="0.5rem">
        <Flex alignItems="center">
          <Text fontSize="1.1rem">-</Text>
        </Flex>
      </Box>
      <Box px="0.5rem" width="15%">
        <Text fontSize="1.1rem">{values.hp}</Text>
      </Box>
    </Flex>
  );
};

export default FinalizeScenarioRow;
