import React, { useEffect, useState } from "react";
import AnyChart from "anychart-react";
import styled from "@emotion/styled";
import { Flex, Text, Img, Box } from "@chakra-ui/react";
import anychart from "anychart";

const CustomLineAreaChart = ({
  boxProps,
  name,
  customData = [],
  customData2 = [],
  dependencies = [],
}) => {
  const [chartInstance, setChartInstance] = useState();

  useEffect(() => {
    var data = anychart.data.set(customData);
    var data2 = anychart.data.set(customData2);

    var seriesData_1 = data.mapAs({ x: 0, value: 1 });
    var seriesData_2 = data2.mapAs({ x: 0, value: 1 });

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
    series2.name("Seasonality");

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

    // yLabels.format("{%value}");

    var yScale1 = anychart.scales.linear();
    yScale1.minimum(0);
    yScale1.maximum(5000);

    var yAxis1 = chart.yAxis(1);
    yAxis1.orientation("left");
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
      "<div style='margin-bottom: 0.5rem;'><p style='text-align: center;'>{%x} </p></div>"
    );

    tooltip.format(
      "<div class='flex-div' style='width: 69.5%; margin-bottom: 0.6rem;'><div style='display: flex; align-items: center;'><div class='green-circle'></div><p>{%seriesName}</p></div><p style='font-weight: 600;'> $ {%value}</p></div>"
    );

    var diffTooltip = series2.tooltip();
    diffTooltip.format(
      "<div class='flex-div' style='width: 75%;'><div style='display: flex; align-items: center;'><div class='color-box'></div><p>{%seriesName}</p></div><p style='font-weight: 600;'>{%value} HL</p></div><div class='flex-div' style='width: 85%; justify-content: flex-start;'><div style='display: flex; align-items: center; margin-right: 8.1rem; margin-left: 1.5rem;'><p>Reach</p></div><p style='font-weight: 600;'>25%</p></div><div class='flex-div' style='width: 85%; justify-content: flex-start;'><div style='display: flex; align-items: center; margin-right: 6.1rem; margin-left: 1.5rem;'><p>Reco Reach</p></div><p style='font-weight: 600;'>30% to 40%</p></div>"
    );

    tooltipSettings(tooltip);

    chart.tooltip().onDomReady(function () {
      this.contentElement.style.width = "100%";
    });

    chart.area();

    chart.yGrid().enabled(true);
    chart.yGrid().stroke("lightgray");
    chart.yScale().ticks().interval(2000);
    yScale1.ticks().interval(1000);
    setChartInstance(chart);
  }, [...dependencies]);

  return (
    <Box bg="formBgGray" height="300px" width="100%" {...boxProps}>
      {chartInstance && (
        <Wrapper width="100%" height="100%">
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

export default CustomLineAreaChart;
