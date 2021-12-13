import React, { useEffect, useState, useMemo } from "react";
import AnyChart from "anychart-react";
import { Flex, Text, Img, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import anychart from "anychart";
import { useForm } from "react-hook-form";

import EditorDropdown from "@/components/FormComponents/EditorDropdown";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const VehicleWeeklyChart = ({ boxProps, name, dependencies = [] }) => {
  const [chartInstance, setChartInstance] = useState();
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const { mediaPlanState } = useMediaPlan();

  const { control, watch, setValue } = useForm({
    defaultValues: { vehicle: {} },
  });
  const vehicleValue = watch("vehicle");

  useMemo(() => {
    if (vehicleValue?.value) {
      const spend = {};
      const volume = {};
      const mappingData = mediaPlanState.selectedPlan.hasExecuted
        ? mediaPlanState.selectedPlan.sim_spends
        : mediaPlanState.selectedPlan.opt_spends;
      mappingData.forEach((plan) => {
        if (plan.vehicle === vehicleValue.value) {
          if (spend[plan.week]) {
            spend[plan.week] += parseFloat(plan.opt_planned_spend);
          } else {
            spend[plan.week] = parseFloat(plan.opt_planned_spend);
          }
          if (volume[plan.week]) {
            volume[plan.week] += parseFloat(plan.final_adjusted_volume);
          } else {
            volume[plan.week] = parseFloat(plan.final_adjusted_volume);
          }
        }
      });

      const final = Object.keys(spend).map((sp) => {
        return [sp, spend[sp], volume[sp].toFixed(2)];
      });

      var data = anychart.data.set(final);

      var seriesData_1 = data.mapAs({ x: 0, value: 1 });
      var seriesData_2 = data.mapAs({ x: 0, value: 2 });

      var chart = anychart.line();

      var series1 = chart.line(seriesData_1);
      var series2 = chart.area(seriesData_2);

      series1.name("Spend");
      series1.normal().stroke("#2A9872", 3);
      var markers = series1.markers();
      markers.enabled(true);
      markers.size(6);
      markers.stroke("none");

      series2.normal().fill("#F5E5D1");
      series2.normal().stroke("none");
      series2.name("Volume");

      var yAxis = chart.yAxis();
      yAxis.ticks(null);
      yAxis.minorTicks(null);
      yAxis.stroke("#958879", 1.5);
      var yLabels = chart.yAxis().labels();
      yLabels.fontColor("#bbb");
      yLabels.fontWeight(600);

      var xAxis = chart.xAxis();
      xAxis.ticks(null);
      xAxis.minorTicks(null);
      xAxis.stroke("#958879", 1.5);
      var xLabels = chart.xAxis().labels();
      xLabels.fontColor("#bbb");
      xLabels.fontWeight(600);
      xLabels.rotation(270);

      var yScale1 = anychart.scales.linear();

      var yAxis1 = chart.yAxis(1);
      yAxis1.orientation("right");
      yAxis1.ticks(null);
      yAxis1.minorTicks(null);
      yAxis1.stroke("none");
      yAxis1.scale(yScale1);

      var yLabels1 = yAxis1.labels();
      yLabels1.fontColor("#bbb");
      yLabels1.fontWeight(600);
      series2.yScale(yScale1);

      var tooltip = chart.tooltip();

      tooltip.separator(false);

      function tooltipSettings(tooltip) {
        tooltip.position("right-center");
        tooltip.anchor("center-bottom");
        tooltip.useHtml(true);
        tooltip.offsetX(0);
      }

      tooltip.titleFormat(
        "<div style='margin-bottom: 0.5rem;'><p style='text-align: center;'>Week {%x}</p></div>"
      );

      tooltip.format(
        "<div class='flex-div' style='width: 85%; justify-content: flex-start; margin-bottom: 0.6rem;'><div style='display: flex; align-items: center; margin-right: 6.65rem;'><div class='green-circle'></div><p>{%seriesName}</p></div><p style='font-weight: 600;'> $ {%value}{decimalsCount:2}</p></div>"
      );

      var diffTooltip = series2.tooltip();
      diffTooltip.format(
        "<div class='flex-div' style='width: 85%; justify-content: flex-start;'><div style='display: flex; align-items: center; margin-right: 7.15rem;'><div class='color-box'></div><p>{%seriesName}</p></div><p style='font-weight: 600;'>{%value}{groupsSeparator:\\,} HL</p></div></div>"
      );

      tooltipSettings(tooltip);

      chart.tooltip().onDomReady(function () {
        this.contentElement.style.width = "100%";
      });

      var legendItem1 = series1.legendItem();
      var legendItem2 = series2.legendItem();
      legendItem1.iconType("line");
      legendItem2.iconType("area");
      series1.name("SPEND	($)");
      series2.name("VOL (HL)");

      chart.animation(true);
      chart.yGrid().enabled(true);
      chart.yGrid().stroke("lightgray");
      setChartInstance(chart);
    }
  }, [vehicleValue]);

  useEffect(() => {
    const temp = {};
    const mappingData = mediaPlanState.selectedPlan.hasExecuted
      ? mediaPlanState.selectedPlan.sim_spends
      : mediaPlanState.selectedPlan.opt_spends;
    if (mappingData) {
      mappingData.forEach((plan) => {
        temp[plan.vehicle] = {};
      });
    }
    const final = Object.keys(temp).map((key) => {
      return { value: key, label: key };
    });
    setVehicleOptions(final);
    setValue("vehicle", final[0]);
  }, [
    mediaPlanState.selectedPlan.opt_spends,
    mediaPlanState.selectedPlan.sim_spends,
  ]);

  return (
    <>
      <Flex alignItems="center" margin="auto" width="max-content" my="1rem">
        <EditorDropdown
          label="vehicle"
          placeholder="Select"
          name="vehicle"
          control={control}
          options={vehicleOptions}
          boxProps={{
            display: "flex",
            alignItems: "center",
            mr: "1rem",
          }}
          labelProps={{ variant: "bold", fontSize: "0.8rem" }}
          pl="0rem"
          pr="0rem"
          fontSize="0.9rem"
        />
      </Flex>
      <Box bg="formBgGray" height="300px" width="100%" {...boxProps}>
        {vehicleValue.value ? (
          chartInstance && (
            <Wrapper position="relative" width="100%" height="100%">
              <Legend />
              <AnyChart
                instance={chartInstance}
                height={300}
                id={name}
                width="100%"
              />
            </Wrapper>
          )
        ) : (
          <Text pt="1rem" textAlign="center"></Text>
        )}
      </Box>
    </>
  );
};

const Wrapper = styled(Box)`
  tspan {
    color: #000;
  }
`;

export default VehicleWeeklyChart;

const Legend = () => (
  <>
    <Flex
      flexDirection="column"
      left="0px"
      bottom="-40px"
      transform="rotate(-90deg)"
      zIndex="2"
      position="absolute"
      fontSize="0.875rem"
      fontWeight="600"
    >
      <Flex
        fontWeight="600"
        fontSize="0.875rem"
        align="center"
        justify="flex-start"
      >
        <Box mr="10px" position="relative">
          <Box borderRadius="8px" height="35px" width="4px" bg="#2A9872" />
          <Box
            top="50%"
            left="50%"
            borderRadius="50%"
            transform="translate(-50%,-50%)"
            bg="#2A9872"
            position="absolute"
            height="12px"
            width="12px"
          />
        </Box>
        SPEND ($)
      </Flex>
    </Flex>
    <Flex
      flexDirection="column"
      right="0px"
      bottom="-40px"
      transform="rotate(-90deg)"
      zIndex="2"
      position="absolute"
      fontSize="0.875rem"
      fontWeight="600"
    >
      <Flex align="center" mb="25px">
        <Box width="15px" height="15px" mr="5px" ml="-5px" bg="#F5E5D1" />
        VOL (HL)
      </Flex>
    </Flex>
  </>
);
