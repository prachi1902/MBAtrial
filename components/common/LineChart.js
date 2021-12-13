import React, { useEffect, useState } from "react";
import AnyChart from "anychart-react";
import styled from "@emotion/styled";
import { Flex, Text, Img, Box, IconButton } from "@chakra-ui/react";
import anychart from "anychart";

import AddToDeckModal from "../ExecutiveDashboard/AddToMyDeckModal";

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
  const [graphBase64, setGraphBase64] = useState({ open: false, data: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var data = anychart.data?.set(chartData);
    console.log(chartData);
    var seriesData_1 = data.mapAs({ x: 0, value: 1 });
    var seriesData_2 = data.mapAs({ x: 0, value: 2 });
    var chart = anychart.line();
    var series1 = chart.line(seriesData_1);
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

    var series2 = chart.line(seriesData_2);
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
  }, [...dependencies, graphBase64]);

  const getPngBase64String = () => {
    setLoading(true);
    chartInstance.getJpgBase64String(
      function (response) {
        setGraphBase64({ open: true, data: response });
        setLoading(false);
      },
      null,
      1250,
      320,
      0.999
    );
  };

  return (
    <>
      <AddToDeckModal
        title="Historicals Brand Metrics"
        data={graphBase64}
        setData={setGraphBase64}
      />
      <Flex
        mb="0rem"
        mt="0.5rem"
        align="center"
        justify="space-between"
        position="relative"
        px="1rem"
        pt="0.5rem"
      >
        <Text>Media Spend</Text>
        {true && (
          <Text
            fontStyle="italic"
            color="darkGray"
            fontSize="0.9rem"
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
          >
            Tap on a data point to see spend mix
          </Text>
        )}
        <Flex>
          {false ? (
            <IconButton
              variant="unstyled"
              icon={<Img src="/svg/chart.svg" />}
              // onClick={() => setTableView(false)}
            />
          ) : (
            <IconButton
              variant="unstyled"
              icon={<Img src="/svg/data.svg" />}
              // onClick={() => setTableView(true)}
            />
          )}
          <IconButton
            variant="unstyled"
            onClick={getPngBase64String}
            isLoading={loading}
            icon={<Img src="/svg/Pin.svg" />}
            minWidth="auto"
            mr="0.3rem"
          />
        </Flex>
      </Flex>
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
    </>
  );
};

const Wrapper = styled(Box)`
  tspan {
    color: #000;
  }
`;

export default LineChart;
