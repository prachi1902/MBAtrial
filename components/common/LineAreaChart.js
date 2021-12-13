import React, { useEffect, useState } from "react";
import AnyChart from "anychart-react";
import styled from "@emotion/styled";
import { Flex, Text, Img, Box } from "@chakra-ui/react";
import anychart from "anychart";

const LineAreaChart = ({ boxProps, name, dependencies = [] }) => {
  const [chartInstance, setChartInstance] = useState();

  useEffect(() => {
    var data = anychart.data.set([
      ["JAN 2021", 10000, 3000],
      ["FEB 2021", 6000, 1500],
      ["MAR 2021", 6000, 2000],
      ["APR 2021", 6000, 1800],
      ["MAY 2021", 4300, 2100],
      ["JUN 2021", 6800, 1000],
      ["JUL 2021", 8000, 3500],
      ["AUG 2021", 7100, 2590],
      ["SEP 2021", 5000, 2000],
      ["OCT 2021", 3400, 5000],
      ["NOV 2021", 9000, 900],
      ["DEC 2021", 9500, 4500],
      // ["Jan 2021", 10000, 3000],
      // ["Feb 2021", 6000, 1500],
      // ["Mar 2021", 6000, 2000],
      // ["Apr 2021", 6000, 1800],
      // ["May 2021", 4300, 2100],
      // ["Jun 2021", 6800, 1000],
      // ["Jul 2021", 8000, 3500],
      // ["Aug 2021", 7100, 2590],
      // ["Sep 2021", 5000, 2000],
      // ["Oct 2021", 3400, 5000],
      // ["Nov 2021", 9000, 900],
      // ["Dec 2021", 9500, 4500],
    ]);

    var seriesData_1 = data.mapAs({ x: 0, value: 1 });
    var seriesData_2 = data.mapAs({ x: 0, value: 2 });

    var chart = anychart.line();

    //  chart.xScroller(true);
    //  chart.xZoom().setTo(0, 0.5);
    //	chart.xZoom().setToPointsCount(12, true);

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
      "<div class='flex-div' style='width: 75%; justify-content: flex-start; margin-bottom: -0.6rem;'><div style='display: flex; align-items: center; margin-right: 6.65rem;'><div class='green-circle'></div><p>{%seriesName}</p></div><p style='font-weight: 600;'> $ {%value}</p></div>"
    );

    var diffTooltip = series2.tooltip();
    diffTooltip.format(
      "<div class='flex-div' style='width: 76%; justify-content: flex-start;'><div style='display: flex; align-items: center; margin-right: 7.15rem;'><div class='color-box'></div><p>{%seriesName}</p></div><p style='font-weight: 600;'>{%value} HL</p></div><div class='flex-div' style='width: 85%; justify-content: flex-start;'><div style='display: flex; align-items: center; margin-right: 8.1rem; margin-left: 1.5rem;'><p>Reach</p></div><p style='font-weight: 600;'>25%</p></div><div class='flex-div' style='width: 85%; justify-content: flex-start;'><div style='display: flex; align-items: center; margin-right: 6.1rem; margin-left: 1.5rem;'><p>Reco Reach</p></div><p style='font-weight: 600;'>30% to 40%</p></div>"
    );

    tooltipSettings(tooltip);

    chart.tooltip().onDomReady(function () {
      this.contentElement.style.width = "100%";
    });

    //    chart.legend(true);
    //    chart.legend().useHtml(true);
    //    chart.legend().position("left");
    //    chart.legend().align("bottom");
    var legendItem1 = series1.legendItem();
    var legendItem2 = series2.legendItem();
    legendItem1.iconType("line");
    legendItem2.iconType("area");
    series1.name("SPEND	($)");
    series2.name("VOL (HL)");

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
            // type="line"
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

export default LineAreaChart;
