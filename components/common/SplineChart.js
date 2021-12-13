import React, { useEffect, useState } from "react";
import AnyChart from "anychart-react";
import styled from "@emotion/styled";
import { Flex, Text, Img, Box } from "@chakra-ui/react";
import anychart from "anychart";

const LineChart = ({
  boxProps,
  name,
  setOpen,
  dependencies = [],
  open,
  selectedBU = true,
  chartData = [],
  legendNames = [],
}) => {
  const [chartInstance, setChartInstance] = useState();
  useEffect(() => {
    console.log(legendNames);
    var data = anychart.data?.set(chartData);
    console.log(chartData);
    var seriesData_1 = data.mapAs({ x: 0, value: 1 });
    var seriesData_2 = data.mapAs({ x: 0, value: 2 });
    var chart = anychart.line();
    var series1 = chart.spline(seriesData_1);
    series1.name(legendNames[0]?.name);

    series1.normal().stroke("#811B1A", 3);
    var markers = series1.markers();
    markers.enabled(true);
    markers.size(6);
    markers.fill("#811B1A");
    markers.stroke("none");

    var hoverMarkers = series1.selected().markers();
    hoverMarkers.fill("#811B1A");
    hoverMarkers.size(8);
    hoverMarkers.stroke("rgba(129,27,26,0.3 )", 20);

    var series2 = chart.spline(seriesData_2);
    series2.name(legendNames[1]?.name);
    series2.normal().stroke("#2A9872", 3);
    var markers = series2.markers();

    markers.size(6);
    markers.enabled(true);
    markers.type("circle");
    markers.fill("#2A9872");
    markers.stroke("none");

    var hoverMarkers = series2.selected().markers();
    hoverMarkers.fill("#2A9872");
    hoverMarkers.size(8);
    hoverMarkers.stroke("rgba(42,152,114,0.3 )", 20);

    var yAxis = chart.yAxis();
    yAxis.title("SPEND (MM$)");
    var yTitle = yAxis.title();
    yTitle.fontColor("black");
    yAxis.ticks(null);
    yAxis.minorTicks(null);
    yAxis.stroke("black", 1.2);
    var yLabels = chart.yAxis().labels();
    yLabels.fontColor("gray");
    yLabels.fontWeight(600);

    var xAxis = chart.xAxis();
    xAxis.ticks(null);
    xAxis.minorTicks(null);
    xAxis.stroke("black", 1.2);
    var xLabels = chart.xAxis().labels();
    xLabels.fontColor("gray");
    xLabels.fontWeight(600);

    var marker = chart.lineMarker();
    marker.axis(xAxis);
    //    marker.value(10);
    marker.stroke({
      thickness: 10,
      color: "gray",
    });

    chart.yGrid().enabled(true);
    chart.yGrid().stroke("lightgray");
    chart.yScale().ticks().interval(5);
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
            type="line"
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

export default LineChart;
