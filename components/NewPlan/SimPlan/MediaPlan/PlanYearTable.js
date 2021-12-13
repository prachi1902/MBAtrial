import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@chakra-ui/react";

import Table from "./YearTable";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const PlanYearTable = ({ periodValue }) => {
  const { mediaPlanState } = useMediaPlan();
  const [digitalTotal, setDigitalTotal] = useState({});
  const [traditionalTotal, setTraditionalTotal] = useState({});
  const [digitalVehicles, setDigitalVehicles] = useState({});
  const [traditionalVehicles, setTraditionalVehicles] = useState({});
  const [total, setTotal] = useState({});

  useMemo(() => {
    let digitalTotal = {
      opt_planned_spend: 0,
      final_adjusted_volume: 0,
      final_maco: 0,
      final_nr: 0,
    };
    let traditionalTotal = {
      opt_planned_spend: 0,
      final_adjusted_volume: 0,
      final_maco: 0,
      final_nr: 0,
    };
    let total = {
      opt_planned_spend: 0,
      final_adjusted_volume: 0,
      final_maco: 0,
      final_nr: 0,
    };

    let digitalVehicles = {};
    let traditionalVehicles = {};

    const data = mediaPlanState.selectedPlan.hasExecuted
      ? mediaPlanState.selectedPlan.sim_spends
      : mediaPlanState.selectedPlan.opt_spends;

    data?.map((plan) => {
      if (plan.category === "DIGITAL") {
        if (digitalVehicles[plan.vehicle]) {
          digitalVehicles[plan.vehicle].opt_planned_spend += parseFloat(
            plan.opt_planned_spend
          );
          digitalVehicles[plan.vehicle].final_adjusted_volume += parseFloat(
            plan.final_adjusted_volume
          );
          digitalVehicles[plan.vehicle].final_maco += parseFloat(
            plan.final_maco
          );
          digitalVehicles[plan.vehicle].final_nr += parseFloat(plan.final_nr);
        } else {
          digitalVehicles[plan.vehicle] = {};
          digitalVehicles[plan.vehicle].opt_planned_spend = parseFloat(
            plan.opt_planned_spend
          );
          digitalVehicles[plan.vehicle].final_adjusted_volume = parseFloat(
            plan.final_adjusted_volume
          );
          digitalVehicles[plan.vehicle].final_maco = parseFloat(
            plan.final_maco
          );
          digitalVehicles[plan.vehicle].final_nr = parseFloat(plan.final_nr);
        }
        digitalTotal.opt_planned_spend += parseFloat(plan.opt_planned_spend);
        digitalTotal.final_adjusted_volume += parseFloat(
          plan.final_adjusted_volume
        );
        digitalTotal.final_maco += parseFloat(plan.final_maco);
        digitalTotal.final_nr += parseFloat(plan.final_nr);
      } else {
        if (traditionalVehicles[plan.vehicle]) {
          traditionalVehicles[plan.vehicle].opt_planned_spend += parseFloat(
            plan.opt_planned_spend
          );
          traditionalVehicles[plan.vehicle].final_adjusted_volume += parseFloat(
            plan.final_adjusted_volume
          );
          traditionalVehicles[plan.vehicle].final_maco += parseFloat(
            plan.final_maco
          );
          traditionalVehicles[plan.vehicle].final_nr += parseFloat(
            plan.final_nr
          );
        } else {
          traditionalVehicles[plan.vehicle] = {};
          traditionalVehicles[plan.vehicle].opt_planned_spend = parseFloat(
            plan.opt_planned_spend
          );
          traditionalVehicles[plan.vehicle].final_adjusted_volume = parseFloat(
            plan.final_adjusted_volume
          );
          traditionalVehicles[plan.vehicle].final_maco = parseFloat(
            plan.final_maco
          );
          traditionalVehicles[plan.vehicle].final_nr = parseFloat(
            plan.final_nr
          );
        }
        traditionalTotal.opt_planned_spend += parseFloat(
          plan.opt_planned_spend
        );
        traditionalTotal.final_adjusted_volume += parseFloat(
          plan.final_adjusted_volume
        );
        traditionalTotal.final_maco += parseFloat(plan.final_maco);
        traditionalTotal.final_nr += parseFloat(plan.final_nr);
      }
      total.opt_planned_spend += parseFloat(plan.opt_planned_spend);
      total.final_adjusted_volume += parseFloat(plan.final_adjusted_volume);
      total.final_maco += parseFloat(plan.final_maco);
      total.final_nr += parseFloat(plan.final_nr);
    });
    setDigitalTotal(digitalTotal);
    setDigitalVehicles(digitalVehicles);
    setTraditionalTotal(traditionalTotal);
    setTraditionalVehicles(traditionalVehicles);
    setTotal(total);
  }, [
    mediaPlanState.selectedPlan.opt_spends,
    mediaPlanState.selectedPlan.sim_spends,
  ]);

  return (
    <Box display={periodValue === "52 Week Plan" ? "none" : "block"}>
      <Table>
        <Table.Columns />
        <Table.CategoryRow values={total} title="TOTAL MEDIA" />
        <Table.CategoryRow values={digitalTotal} title="DIGITAL">
          {Object.keys(digitalVehicles).map((vehicle, i) => {
            return (
              <Table.Row
                values={digitalVehicles[vehicle]}
                key={i}
                title={vehicle}
              />
            );
          })}
        </Table.CategoryRow>
        <Table.CategoryRow values={traditionalTotal} title="TRADITIONAL">
          {Object.keys(traditionalVehicles).map((vehicle, i) => {
            return (
              <Table.Row
                values={traditionalVehicles[vehicle]}
                key={i}
                title={vehicle}
              />
            );
          })}
        </Table.CategoryRow>
      </Table>
    </Box>
  );
};

export default PlanYearTable;
