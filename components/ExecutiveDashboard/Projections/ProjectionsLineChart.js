import React, { useState, useEffect } from "react";
import AnyChart from "anychart-react";
import styled from "@emotion/styled";
import {
  Flex,
  Text,
  IconButton,
  Img,
  Box,
  Spinner,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import anychart from "anychart";

// import AddToDeckModal from "./AddToDeckModal";
import LineChartTable from "components/common/LineChartTables";
import AddToDeckModal from "../AddToMyDeckModal";

const ProjectionsLineChart = ({
  boxProps,
  name,
  dependencies = [],
  graphData = [],
  property = "Net Revenue",
  timeFrame,
}) => {
  const options = [
    { label: "Volume", value: "total_volume" },
    { label: "Net Revenue", value: "total_revenue" },
    { label: "MaCo", value: "maco" },
  ];
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
  ];
  const [chartInstance, setChartInstance] = useState();
  const [graphBase64, setGraphBase64] = useState({ open: false, data: "" });
  const [loading, setLoading] = useState(false);
  const [lowestValue, setLowestValue] = useState(0);
  const [highestValue, setHighestValue] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedType, setSelectedType] = useState("total_volume");

  useEffect(() => {
    var chart = anychart.line();
    const formattedTableData = [];
    setHighestValue(0);
    setLowestValue(0);
    graphData.map((brand, i) => {
      const formattedData = brand?.data?.past_data?.map((data) => {
        const value = data.data[selectedType];
        if (value < lowestValue) {
          setLowestValue(value);
        }
        if (value > highestValue) {
          setHighestValue(value);
        }
        return [data.year, value];
      });

      formattedTableData.push({ name: brand.brand_name, data: formattedData });

      var data = anychart.data?.set(formattedData);
      var seriesData = data.mapAs({ x: 0, value: 1 });
      var series = chart.line(seriesData);
      series.name(brand.brand_name);
      series.normal().stroke(chartColor[i], 2);

      var individualTooltip = series.tooltip();
      individualTooltip.format(
        "<div style='display: flex; align-items: center; justify-content:space-between; margin-top:0.5rem'><div style='display:flex; align-items:center'><div class='green-circle' style='background-color:" +
          chartColor[i] +
          ";'></div><p>{%seriesName}</p></div><p style='font-weight:600; margin-left:5rem'>$ {%value}MM</p></div>"
      );

      var markers = series.markers();
      markers.enabled(true);
      markers.type("circle");
      markers.size(6);
      markers.fill(chartColor[i]);

      var hoverMarkers = series.selected().markers();
      hoverMarkers.fill(chartColor[i]);
      hoverMarkers.size(8);
      hoverMarkers.stroke("rgba(129,27,26,0 )", 0);

      var legendItem = series.legendItem();
      legendItem.iconType("circle");
    });

    graphData.map((brand, i) => {
      const formattedData = brand?.data?.future_data?.map((data) => {
        const value = data.data[selectedType];
        if (value < lowestValue) {
          setLowestValue(value);
        }
        if (value > highestValue) {
          setHighestValue(value);
        }
        return [data.year, value];
      });

      formattedTableData.push({ name: brand.brand_name, data: formattedData });

      var data = anychart.data?.set(formattedData);
      var seriesData = data.mapAs({ x: 0, value: 1 });
      var series = chart.line(seriesData);
      series.name(brand.brand_name);
      series.normal().stroke({ color: chartColor[i], dash: "10 2" });

      var individualTooltip = series.tooltip();
      individualTooltip.format(
        "<div style='display: flex; align-items: center; justify-content:space-between; margin-top:0.5rem'><div style='display:flex; align-items:center'><div class='green-circle' style='background-color:" +
          chartColor[i] +
          ";'></div><p>{%seriesName}</p></div><p style='font-weight:600; margin-left:5rem'>$ {%value}MM</p></div>"
      );

      var markers = series.markers();
      markers.enabled(true);
      markers.type("circle");
      markers.size(6);
      markers.fill(chartColor[i]);

      var hoverMarkers = series.selected().markers();
      hoverMarkers.fill(chartColor[i]);
      hoverMarkers.size(8);
      hoverMarkers.stroke("rgba(129,27,26,0 )", 0);

      series.legendItem(false);
    });

    setTableData(formattedTableData);

    var crosshair = chart.crosshair();
    crosshair.enabled(true);
    crosshair.yLabel().enabled(false);
    crosshair.xLabel().enabled(false);
    crosshair.yStroke(null);
    crosshair.xStroke("#666666", 1.5);

    var yAxis = chart.yAxis();
    yAxis.title("MM$");
    yAxis.title().fontColor("#000");
    yAxis.title().fontSize("16px");
    yAxis.ticks(null);
    yAxis.stroke("black", 1.2);

    var yLabels = chart.yAxis().labels();
    yLabels.fontColor("#888");
    yLabels.fontWeight(400);
    yLabels.padding(0, 20, 0, 0);

    var xAxis = chart.xAxis();
    xAxis.ticks(null);
    xAxis.minorTicks(null);
    xAxis.stroke("black", 1.2);

    var xLabels = xAxis.labels();
    xLabels.fontColor("#888");
    xLabels.fontWeight(400);

    chart.yGrid().stroke("#ccc");

    var tooltip = chart.tooltip();
    tooltip.fontColor("black");
    tooltip.separator(false);
    tooltip.useHtml(true);
    tooltip.allowLeaveStage(true);
    tooltip.titleFormat(function () {
      const type =
        selectedType === "total_volume"
          ? "Volume"
          : selectedType === "maco"
          ? "MaCo"
          : "Net Revenue";
      if (this.points[0].x >= graphData[0]?.data?.future_data[0]?.year) {
        return this.points[0].x + " Projected " + type;
      } else {
        return this.points[0].x + " Recorded " + type;
      }
    });

    chart.animation(true);

    chart.legend(true);
    chart.legend().position("bottom");
    chart.legend().fontColor("black");
    chart.legend().itemsSpacing(20);
    chart.legend().padding(5, 20, 0, 20);

    chart.yScale().softMinimum(parseInt(lowestValue) - 50);
    chart.yScale().softMaximum(parseInt(highestValue) + 50);

    setChartInstance(chart);
  }, [...dependencies, graphBase64, selectedType]);

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
        title="Projections"
        property={
          selectedType === "total_volume"
            ? "Volume"
            : selectedType === "maco"
            ? "MaCo"
            : "Net Revenue"
        }
        data={graphBase64}
        setData={setGraphBase64}
      />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        my="1rem"
        px="1.5rem"
      >
        <Flex alignItems="center">
          {options.map((option, i) => {
            if (option.value === selectedType) {
              return (
                <Button
                  key={i}
                  borderRadius="6px"
                  fontWeight="400"
                  borderWidth="2px"
                  px="1rem"
                  maxHeight="2.1rem"
                >
                  {option.label}
                </Button>
              );
            } else {
              return (
                <Text
                  key={i}
                  cursor="pointer"
                  color="darkGray"
                  fontSize="0.9rem"
                  px="1rem"
                  onClick={() => setSelectedType(option.value)}
                >
                  {option.label}
                </Text>
              );
            }
          })}
        </Flex>
        <Flex alignItems="center">
          {showTable ? (
            <IconButton
              variant="unstyled"
              icon={<Img src="/svg/chart.svg" />}
              onClick={() => setShowTable(false)}
            />
          ) : (
            <IconButton
              variant="unstyled"
              icon={<Img src="/svg/data.svg" />}
              onClick={() => setShowTable(true)}
            />
          )}
          <IconButton
            variant="unstyled"
            icon={<Img src="/svg/Pin.svg" />}
            minWidth="auto"
            mr="0.3rem"
            isLoading={loading}
            onClick={getPngBase64String}
          />
        </Flex>
      </Flex>
      <Box bg="formBgGray" height="300px" width="100%" {...boxProps}>
        {showTable ? (
          <LineChartTable tableData={tableData} />
        ) : (
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

export default ProjectionsLineChart;
