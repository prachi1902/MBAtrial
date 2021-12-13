import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Table from "./EditableWeekTable";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const PlanYearTable = ({ periodValue, data, setData }) => {
  const { mediaPlanState } = useMediaPlan();
  const [digitalVehicles, setDigitalVehicles] = useState({});
  const [traditionalVehicles, setTraditionalVehicles] = useState({});
  const [digitalTotal, setDigitalTotal] = useState({});
  const [traditionalTotal, setTraditionalTotal] = useState({});

  useEffect(() => {
    let digitalVehicles = {};
    let traditionalVehicles = {};
    let digitalTotal = {};
    let traditionalTotal = {};

    const data = mediaPlanState.selectedPlan.hasExecuted
      ? mediaPlanState.selectedPlan.sim_spends
      : mediaPlanState.selectedPlan.opt_spends;

    data?.map((plan) => {
      if (plan.category === "DIGITAL") {
        if (digitalTotal[plan.week]) {
          digitalTotal[plan.week] += parseFloat(plan.opt_planned_spend);
        } else {
          digitalTotal[plan.week] = parseFloat(plan.opt_planned_spend);
        }
        if (digitalVehicles[plan.vehicle]) {
          digitalVehicles[plan.vehicle].push(plan);
        } else {
          digitalVehicles[plan.vehicle] = [];
          digitalVehicles[plan.vehicle].push(plan);
        }
      } else {
        if (traditionalTotal[plan.week]) {
          traditionalTotal[plan.week] += parseFloat(plan.opt_planned_spend);
        } else {
          traditionalTotal[plan.week] = parseFloat(plan.opt_planned_spend);
        }
        if (traditionalVehicles[plan.vehicle]) {
          traditionalVehicles[plan.vehicle].push(plan);
        } else {
          traditionalVehicles[plan.vehicle] = [];
          traditionalVehicles[plan.vehicle].push(plan);
        }
      }
    });
    const tempAll = { ...traditionalVehicles, ...digitalVehicles };
    const temp = {};
    Object.keys(tempAll).forEach((key) => {
      tempAll[key].forEach((item) => {
        temp[item.vehicle + item.week] = {
          country: item.country,
          brand: item.brand,
          vehicle: item.vehicle,
          week: item.week,
          planned_spend: parseFloat(item?.opt_planned_spend).toFixed(2) || 0,
          month: item.month,
          maco_per_hl: item.maco_per_hl,
          nr_per_hl: item.nr_per_hl,
          bvt: item.bvt,
          mi: item.mi,
          volume: item.final_adjusted_volume,
          past_year_spend: item.planned_spend,
        };
      });
    });
    setData(temp);
    setDigitalVehicles(digitalVehicles);
    setTraditionalVehicles(traditionalVehicles);
    setDigitalTotal(digitalTotal);
    setTraditionalTotal(traditionalTotal);
  }, [
    mediaPlanState.selectedPlan.opt_spends,
    mediaPlanState.selectedPlan.sim_spends,
    mediaPlanState.selectedPlan.hasExecuted,
  ]);
  return (
    <Box display={periodValue === "52 Week Plan" ? "block" : "none"}>
      <Table>
        {Object.keys(data).length && (
          <>
            <Table.Columns />
            <Table.CategoryRow
              setData={setData}
              total={digitalTotal}
              data={data}
              vehicles={digitalVehicles}
              title="DIGITAL"
            />
            <Table.CategoryRow
              setData={setData}
              data={data}
              total={traditionalTotal}
              vehicles={traditionalVehicles}
              title="TRADITIONAL"
            />
          </>
        )}
      </Table>
    </Box>
  );
};

export default PlanYearTable;
