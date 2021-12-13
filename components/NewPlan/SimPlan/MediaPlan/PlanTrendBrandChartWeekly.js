import React, { useState, useMemo } from "react";
import AnyChart from "anychart-react";
import styled from "@emotion/styled";
import { Box, Flex } from "@chakra-ui/react";
import anychart from "anychart";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const StackedChart = ({ boxProps, name, dependencies = [] }) => {
  const [chartInstance, setChartInstance] = useState();

  const { mediaPlanState } = useMediaPlan();

  useMemo(() => {
    const chartColor = [
      "#971B1E",
      "#2A9872",
      "#E02124",
      "#F7951D",
      "#00C0C7",
      "#5144D3",
      "#DA3490",
      "#9089FA",
      "#47E26F",
      "#2780EB",
      "#DFBF03",
      "#CB6F10",
      "#000",
    ];
    const weeks = {};
    const volumeData = {};
    const spendsTotal = {};

    const mappingData = mediaPlanState.selectedPlan.hasExecuted
      ? mediaPlanState.selectedPlan.sim_spends
      : mediaPlanState.selectedPlan.opt_spends;

    mappingData.forEach((plan) => {
      if (weeks[plan.week]) {
        volumeData[plan.week] += parseInt(plan.final_adjusted_volume);
        spendsTotal[plan.week] += parseInt(plan.opt_planned_spend);
        if (weeks[plan.week][plan.vehicle]) {
          weeks[plan.week][plan.vehicle] += parseFloat(plan.opt_planned_spend);
        } else {
          weeks[plan.week][plan.vehicle] = parseFloat(plan.opt_planned_spend);
        }
      } else {
        weeks[plan.week] = {};
        weeks[plan.week][plan.vehicle] = parseFloat(plan.opt_planned_spend);
        volumeData[plan.week] = parseInt(plan.final_adjusted_volume);
        spendsTotal[plan.week] = parseInt(plan.opt_planned_spend);
      }
    });

    const temp = [];
    Object.keys(weeks).forEach((week) => {
      const format = Object.keys(weeks[week]).map((veh) => weeks[week][veh]);
      const format2 = [week, ...format];
      temp.push(format2);
    });

    var data = anychart.data.set(temp);
    var chart = anychart.column();
    chart.yScale().stackMode("value");

    const formatted = Object.keys(volumeData).map((week) => {
      return [week, volumeData[week]];
    });
    var volume_data = anychart.data.set(formatted);
    var volumeChart = chart.area(volume_data.mapAs({ x: 0, value: 1 }));
    volumeChart.normal().fill("#F5E5D1");
    volumeChart.normal().stroke("none");
    volumeChart.name("Volume");
    for (let index = 0; index < temp[0]?.length - 1; index++) {
      var seriesData = data.mapAs({ x: 0, value: index + 1 });
      var series = chart.column(seriesData);
      series.fill(chartColor[index]);
      series.stroke("none");
      series.name(Object.keys(weeks["1"])[index]);
      var individualTooltip = series.tooltip();
      individualTooltip.format(
        "<div class='flex-div' style='width: 47%; margin: 0 auto; margin-bottom: 0.3rem;'><div style='display: flex; align-items: center;'><div class='green-circle' style='background-color:" +
          chartColor[index] +
          ";'></div><p>{%seriesName}</p></div><p>{%yPercentOfCategory}{decimalsCount:2}%</p></div>"
      );
    }

    chart.pointWidth(22);

    var xAxis = chart.xAxis();
    xAxis.ticks(null);
    xAxis.minorTicks(null);
    xAxis.stroke("black", 1.2);
    var xLabels = chart.xAxis().labels();
    xLabels.fontColor("#bbb");
    xLabels.fontWeight(600);
    xLabels.rotation(270);

    var yAxis = chart.yAxis();
    yAxis.ticks(null);
    yAxis.minorTicks(null);
    yAxis.stroke("black", 1.2);
    var yLabels = chart.yAxis().labels();
    yLabels.fontColor("#bbb");
    yLabels.fontWeight(600);

    var yScale1 = anychart.scales.linear();
    volumeChart.yScale(yScale1);

    var yAxis1 = chart.yAxis(1);
    yAxis1.orientation("right");
    yAxis1.ticks(null);
    yAxis1.minorTicks(null);
    yAxis1.stroke("none");
    yAxis1.scale(yScale1);

    var tooltip = chart.tooltip();
    tooltip.displayMode("union");

    tooltip.separator(false);

    function tooltipSettings(tooltip) {
      tooltip.useHtml(true);
      tooltip.offsetX(0);
    }

    tooltip.titleFormat((props) => {
      return `<div class='flex-div' style='margin-bottom: 0.5rem; width: 100%;'><div style='display: flex; align-items: center;'><p>${
        props.x
      } Media Spend</p></div><p style='font-weight: 600;'> ${spendsTotal[
        props.x
      ].toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}</p></div>`;
    });

    var volumeTooltip = volumeChart.tooltip();

    volumeTooltip.format(
      "<div class='flex-div' style='margin-bottom: 0.5rem; width: 100%;'><div style='display: flex; align-items: center;'><div class='color-box'></div><p>Week {%x} {%seriesName}</p></div><p style='font-weight: 600;'> {%value}{groupsSeparator:\\,, decimalsCount:2} HL</p></div>"
    );

    tooltipSettings(tooltip);

    chart.tooltip().onDomReady(function () {
      this.contentElement.style.width = "100%";
      this.contentElement.style.display = "flex !important";
      this.contentElement.classList.add("stacked-tooltip");
    });
    chart.animation(true);

    setChartInstance(chart);
  }, [
    mediaPlanState.selectedPlan.opt_spends,
    mediaPlanState.selectedPlan.sim_spends,
  ]);

  return (
    <Box bg="formBgGray" height="300px" width="100%" {...boxProps}>
      {chartInstance && (
        <Wrapper position="relative" width="100%" height="100%">
          <Legend />
          <AnyChart
            instance={chartInstance}
            height={300}
            id={name}
            width="100%"
          />
        </Wrapper>
      )}
    </Box>
  );
};

const Wrapper = styled(Box)`
  tspan {
    color: #000;
  }
`;

export default StackedChart;

const Legend = () => (
  <>
    <Flex
      flexDirection="column"
      left="15px"
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
          <Box
            top="50%"
            left="50%"
            borderRadius="50%"
            transform="translate(-50%,-50%)"
            bg="#888888"
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
      right="5px"
      bottom="-40px"
      transform="rotate(-90deg)"
      zIndex="2"
      position="absolute"
      fontSize="0.875rem"
      fontWeight="600"
    >
      <Flex align="center" mb="20px">
        <Box width="15px" height="15px" mr="5px" ml="-5px" bg="#F5E5D1" />
        VOL (HL)
      </Flex>
    </Flex>
  </>
);
