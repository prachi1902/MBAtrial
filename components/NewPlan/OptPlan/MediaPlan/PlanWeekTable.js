import React, { useState, useMemo } from "react";

import Table from "./WeekTable";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const PlanYearTable = () => {
  const { mediaPlanState } = useMediaPlan();
  const [digitalTotal, setDigitalTotal] = useState({});
  const [traditionalTotal, setTraditionalTotal] = useState({});
  const [digitalVehicles, setDigitalVehicles] = useState({});
  const [traditionalVehicles, setTraditionalVehicles] = useState({});

  useMemo(() => {
    let digitalTotal = { ...initial };
    let traditionalTotal = { ...initial };

    let digitalVehicles = {};
    let traditionalVehicles = {};
    if (mediaPlanState.selectedPlan.type === "opt") {
      mediaPlanState.selectedPlan.spends?.map((plan) => {
        if (plan.category?.toUpperCase() === "DIGITAL") {
          digitalTotal[plan.week] += parseFloat(plan.opt_planned_spend);
          digitalTotal.total += parseFloat(plan.opt_planned_spend);
          if (digitalVehicles[plan.vehicle]) {
            digitalVehicles[plan.vehicle]["total"] += parseFloat(
              plan.opt_planned_spend
            );
            if (digitalVehicles[plan.vehicle][plan.week]) {
              digitalVehicles[plan.vehicle][plan.week] += parseFloat(
                plan.opt_planned_spend
              );
            } else {
              digitalVehicles[plan.vehicle][plan.week] = parseFloat(
                plan.opt_planned_spend
              );
            }
          } else {
            digitalVehicles[plan.vehicle] = {};
            digitalVehicles[plan.vehicle][plan.week] = parseFloat(
              plan.opt_planned_spend
            );
            digitalVehicles[plan.vehicle]["total"] = parseFloat(
              plan.opt_planned_spend
            );
          }
        } else {
          traditionalTotal[plan.week] += parseFloat(plan.opt_planned_spend);
          traditionalTotal.total += parseFloat(plan.opt_planned_spend);
          if (traditionalVehicles[plan.vehicle]) {
            traditionalVehicles[plan.vehicle]["total"] += parseFloat(
              plan.opt_planned_spend
            );
            if (traditionalVehicles[plan.vehicle][plan.week]) {
              traditionalVehicles[plan.vehicle][plan.week] += parseFloat(
                plan.opt_planned_spend
              );
            } else {
              traditionalVehicles[plan.vehicle][plan.week] = parseFloat(
                plan.opt_planned_spend
              );
            }
          } else {
            traditionalVehicles[plan.vehicle] = {};
            traditionalVehicles[plan.vehicle][plan.week] = parseFloat(
              plan.opt_planned_spend
            );
            traditionalVehicles[plan.vehicle]["total"] = parseFloat(
              plan.opt_planned_spend
            );
          }
        }
      });
    } else {
      mediaPlanState.idealPlanSpends?.map((plan) => {
        if (plan.category === "DIGITAL") {
          digitalTotal[plan.week] += parseFloat(plan.opt_planned_spend);
          digitalTotal.total += parseFloat(plan.opt_planned_spend);
          if (digitalVehicles[plan.vehicle]) {
            digitalVehicles[plan.vehicle]["total"] += parseFloat(
              plan.opt_planned_spend
            );
            if (digitalVehicles[plan.vehicle][plan.week]) {
              digitalVehicles[plan.vehicle][plan.week] += parseFloat(
                plan.opt_planned_spend
              );
            } else {
              digitalVehicles[plan.vehicle][plan.week] = parseFloat(
                plan.opt_planned_spend
              );
            }
          } else {
            digitalVehicles[plan.vehicle] = {};
            digitalVehicles[plan.vehicle][plan.week] = parseFloat(
              plan.opt_planned_spend
            );
            digitalVehicles[plan.vehicle]["total"] = parseFloat(
              plan.opt_planned_spend
            );
          }
        } else {
          traditionalTotal[plan.week] += parseFloat(plan.opt_planned_spend);
          traditionalTotal.total += parseFloat(plan.opt_planned_spend);
          if (traditionalVehicles[plan.vehicle]) {
            traditionalVehicles[plan.vehicle]["total"] += parseFloat(
              plan.opt_planned_spend
            );
            if (traditionalVehicles[plan.vehicle][plan.week]) {
              traditionalVehicles[plan.vehicle][plan.week] += parseFloat(
                plan.opt_planned_spend
              );
            } else {
              traditionalVehicles[plan.vehicle][plan.week] = parseFloat(
                plan.opt_planned_spend
              );
            }
          } else {
            traditionalVehicles[plan.vehicle] = {};
            traditionalVehicles[plan.vehicle][plan.week] = parseFloat(
              plan.opt_planned_spend
            );
            traditionalVehicles[plan.vehicle]["total"] = parseFloat(
              plan.opt_planned_spend
            );
          }
        }
      });
    }
    setDigitalTotal(digitalTotal);
    setDigitalVehicles(digitalVehicles);
    setTraditionalTotal(traditionalTotal);
    setTraditionalVehicles(traditionalVehicles);
  }, [mediaPlanState.selectedPlan.spends, mediaPlanState.idealPlanSpends]);

  return (
    <Table>
      <Table.Columns />
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
  );
};

export default PlanYearTable;

const initial = {
  total: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
  18: 0,
  19: 0,
  20: 0,
  21: 0,
  22: 0,
  23: 0,
  24: 0,
  25: 0,
  26: 0,
  27: 0,
  28: 0,
  29: 0,
  30: 0,
  31: 0,
  32: 0,
  33: 0,
  34: 0,
  35: 0,
  36: 0,
  37: 0,
  38: 0,
  39: 0,
  40: 0,
  41: 0,
  42: 0,
  43: 0,
  44: 0,
  45: 0,
  46: 0,
  47: 0,
  48: 0,
  49: 0,
  50: 0,
  51: 0,
  52: 0,
};
