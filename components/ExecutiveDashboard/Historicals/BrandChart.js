import React, { useState, useEffect } from "react";
import AnyChart from "anychart-react";
import styled from "@emotion/styled";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Img,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import anychart from "anychart";

import AddToDeckModal from "../AddToMyDeckModal";
import LineChartTable from "../LineChartTables";
import { returnProperty, chartColor, returnLabels } from "../utils";

const BrandLineChart = ({
  boxProps,
  name,
  dependencies = [],
  graphData = [],
  property = "Net Revenue",
  selectedBrands,
}) => {
  const [chartInstance, setChartInstance] = useState();
  const [graphBase64, setGraphBase64] = useState({ open: false, data: "" });
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    var chart = anychart.line();
    const formattedTableData = [];
    const temp = graphData.sort((a, b) =>
      a.chart_data[0]?.year > b.chart_data[0]?.year ? 1 : -1
    );
    temp.map((brand, i) => {
      const formattedData = brand?.chart_data?.map((data) => {
        const value = returnProperty(property, data.kpi_data);
        return [data.year, value];
      });
      console.log(brand.brand_name, formattedData);

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
          `;'></div><p>{%seriesName}</p></div><p style='font-weight:600; margin-left:5rem'>${
            returnLabels(property).prefix
          } {%value}{groupsSeparator:\\,, decimalsCount:2}${
            returnLabels(property).suffix
          }</p></div>`
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

    setTableData(formattedTableData);

    var crosshair = chart.crosshair();
    crosshair.enabled(true);
    crosshair.yLabel().enabled(false);
    crosshair.xLabel().enabled(false);
    crosshair.yStroke(null);
    crosshair.xStroke("#666666", 1.5);

    var yAxis = chart.yAxis();
    yAxis.title(returnLabels(property).yLabel);
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
    tooltip.titleFormat("{%x} Brands " + property);
    tooltip.fontColor("black");
    tooltip.separator(false);
    tooltip.useHtml(true);

    chart.legend(true);
    chart.legend().position("bottom");
    chart.legend().fontColor("black");
    chart.legend().itemsSpacing(20);
    chart.legend().padding(5, 20, 0, 20);

    chart.animation(true);

    setChartInstance(chart);
  }, [...dependencies, graphBase64, property, graphData]);

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
        title="Brand Metrics"
        property={property}
        data={graphBase64}
        setData={setGraphBase64}
        titleEnd={selectedBrands
          ?.map((brand, i) => {
            return ` | ${brand}`;
          })
          .join("")}
      />
      <Flex
        px="1.5rem"
        pr="1rem"
        mb="1.5rem"
        mt="1.5rem"
        align="center"
        justify="space-between"
      >
        <Text>{property}</Text>
        <Text fontStyle="italic" color="darkGray" fontSize="0.875rem">
          Tap on a data points to see spend cuts
        </Text>
        <Flex align="center">
          <Tooltip label={!showTable ? "View Data" : "Show Trend View"}>
            <IconButton
              variant="unstyled"
              width="2rem"
              icon={
                <Img src={showTable ? "/svg/chart.svg" : "/svg/data.svg"} />
              }
              onClick={() => setShowTable(!showTable)}
            />
          </Tooltip>
          {loading ? (
            <Spinner />
          ) : (
            <Tooltip label="Add to My Deck">
              <IconButton
                onClick={getPngBase64String}
                ml="0.75rem"
                width="2rem"
                variant="unstyled"
                icon={<Img src="/svg/Pin.svg" />}
              />
            </Tooltip>
          )}
        </Flex>
      </Flex>
      <Box bg="formBgGray" height="300px" width="100%" {...boxProps}>
        {showTable ? (
          <LineChartTable property={property} tableData={tableData} />
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

export default BrandLineChart;
