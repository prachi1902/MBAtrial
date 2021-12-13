import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import Table from "./YearTable";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const PlanYearTable = () => {
  const { mediaPlanState } = useMediaPlan();
  const [digitalTotal, setDigitalTotal] = useState({});
  const [traditionalTotal, setTraditionalTotal] = useState({});
  const [digitalVehicles, setDigitalVehicles] = useState({});
  const [traditionalVehicles, setTraditionalVehicles] = useState({});
  const [total, setTotal] = useState({});

  useMemo(() => {
    let digitalTotal = {
      spend: 0,
      volume: 0,
      final_maco: 0,
      final_nr: 0,
    };
    let traditionalTotal = {
      spend: 0,
      volume: 0,
      final_maco: 0,
      final_nr: 0,
    };
    let total = {
      spend: 0,
      volume: 0,
      final_maco: 0,
      final_nr: 0,
    };
    let digitalVehicles = {};
    let traditionalVehicles = {};
    if (mediaPlanState.selectedPlan.type === "opt") {
      mediaPlanState.selectedPlan.spends?.map((plan) => {
        if (plan.category?.toUpperCase() === "DIGITAL") {
          if (digitalVehicles[plan.vehicle]) {
            digitalVehicles[plan.vehicle].spend += parseFloat(
              plan.opt_planned_spend
            );
            digitalVehicles[plan.vehicle].volume += parseFloat(
              plan.final_adjusted_volume
            );
            digitalVehicles[plan.vehicle].final_maco += parseFloat(
              plan.final_maco
            );
            digitalVehicles[plan.vehicle].final_nr += parseFloat(plan.final_nr);
          } else {
            digitalVehicles[plan.vehicle] = {};
            digitalVehicles[plan.vehicle].spend = parseFloat(
              plan.opt_planned_spend
            );
            digitalVehicles[plan.vehicle].volume = parseFloat(
              plan.final_adjusted_volume
            );
            digitalVehicles[plan.vehicle].final_maco = parseFloat(
              plan.final_maco
            );
            digitalVehicles[plan.vehicle].final_nr = parseFloat(plan.final_nr);
          }
          digitalTotal.spend += parseFloat(plan.opt_planned_spend);
          digitalTotal.volume += parseFloat(plan.final_adjusted_volume);
          digitalTotal.final_maco += parseFloat(plan.final_maco);
          digitalTotal.final_nr += parseFloat(plan.final_nr);
        } else {
          if (traditionalVehicles[plan.vehicle]) {
            traditionalVehicles[plan.vehicle].spend += parseFloat(
              plan.opt_planned_spend
            );
            traditionalVehicles[plan.vehicle].volume += parseFloat(
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
            traditionalVehicles[plan.vehicle].spend = parseFloat(
              plan.opt_planned_spend
            );
            traditionalVehicles[plan.vehicle].volume = parseFloat(
              plan.final_adjusted_volume
            );
            traditionalVehicles[plan.vehicle].final_maco = parseFloat(
              plan.final_maco
            );
            traditionalVehicles[plan.vehicle].final_nr = parseFloat(
              plan.final_nr
            );
          }
          traditionalTotal.spend += parseFloat(plan.opt_planned_spend);
          traditionalTotal.volume += parseFloat(plan.final_adjusted_volume);
          traditionalTotal.final_maco += parseFloat(plan.final_maco);
          traditionalTotal.final_nr += parseFloat(plan.final_nr);
        }
        total.spend += parseFloat(plan.opt_planned_spend);
        total.volume += parseFloat(plan.final_adjusted_volume);
        total.final_maco += parseFloat(plan.final_maco);
        total.final_nr += parseFloat(plan.final_nr);
      });
    } else {
      mediaPlanState.idealPlanSpends.map((plan) => {
        if (plan.category === "DIGITAL") {
          if (digitalVehicles[plan.vehicle]) {
            digitalVehicles[plan.vehicle].spend += parseFloat(
              plan.opt_planned_spend
            );
            digitalVehicles[plan.vehicle].volume += parseFloat(
              plan.final_adjusted_volume
            );
            digitalVehicles[plan.vehicle].final_maco += parseFloat(
              plan.final_maco
            );
            digitalVehicles[plan.vehicle].final_nr += parseFloat(plan.final_nr);
          } else {
            digitalVehicles[plan.vehicle] = {};
            digitalVehicles[plan.vehicle].spend = parseFloat(
              plan.opt_planned_spend
            );
            digitalVehicles[plan.vehicle].volume = parseFloat(
              plan.final_adjusted_volume
            );
            digitalVehicles[plan.vehicle].final_maco = parseFloat(
              plan.final_maco
            );
            digitalVehicles[plan.vehicle].final_nr = parseFloat(plan.final_nr);
          }
          digitalTotal.spend += parseFloat(plan.opt_planned_spend);
          digitalTotal.volume += parseFloat(plan.final_adjusted_volume);
          digitalTotal.final_maco += parseFloat(plan.final_maco);
          digitalTotal.final_nr += parseFloat(plan.final_nr);
        } else {
          if (traditionalVehicles[plan.vehicle]) {
            traditionalVehicles[plan.vehicle].spend += parseFloat(
              plan.opt_planned_spend
            );
            traditionalVehicles[plan.vehicle].volume += parseFloat(
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
            traditionalVehicles[plan.vehicle].spend = parseFloat(
              plan.opt_planned_spend
            );
            traditionalVehicles[plan.vehicle].volume = parseFloat(
              plan.final_adjusted_volume
            );
            traditionalVehicles[plan.vehicle].final_maco = parseFloat(
              plan.final_maco
            );
            traditionalVehicles[plan.vehicle].final_nr = parseFloat(
              plan.final_nr
            );
          }
          traditionalTotal.spend += parseFloat(plan.opt_planned_spend);
          traditionalTotal.volume += parseFloat(plan.final_adjusted_volume);
          traditionalTotal.final_maco += parseFloat(plan.final_maco);
          traditionalTotal.final_nr += parseFloat(plan.final_nr);
        }
        total.spend += parseFloat(plan.opt_planned_spend);
        total.volume += parseFloat(plan.final_adjusted_volume);
        total.final_maco += parseFloat(plan.final_maco);
        total.final_nr += parseFloat(plan.final_nr);
      });
    }
    setDigitalTotal(digitalTotal);
    setDigitalVehicles(digitalVehicles);
    console.log(traditionalTotal);
    setTraditionalTotal(traditionalTotal);
    setTraditionalVehicles(traditionalVehicles);
    setTotal(total);
  }, [mediaPlanState.selectedPlan.spends, mediaPlanState.idealPlanSpends]);

  return (
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
  );
};

export default PlanYearTable;
