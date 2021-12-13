import React, { useEffect, useState } from "react";
import AnyChart from "anychart-react";
import {
  Flex,
  Text,
  Box,
  Spinner,
  Tooltip,
  IconButton,
  Img,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import anychart from "anychart";
import { useForm } from "react-hook-form";

import AddToDeckModal from "../AddToMyDeckModal";
import EditorDropdown from "@/components/FormComponents/EditorDropdown";
import { returnProperty, returnLabels } from "../utils";

const CustomBrandChart = ({ boxProps, name, graphData = [] }) => {
  const [chartInstance, setChartInstance] = useState();
  const [graphBase64, setGraphBase64] = useState({ open: false, data: "" });
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");

  const { control, watch } = useForm({
    defaultValues: {
      trend1: { label: "Spend", value: "Spend" },
      trend2: { label: "Volume", value: "Volume" },
    },
  });
  const [trend1, trend2] = watch(["trend1", "trend2"]);

  useEffect(() => {
    let formattedData = [];
    formattedData = selectedBrand?.chart_data?.map((data) => {
      const value1 = returnProperty(trend1.value, data.kpi_data);
      const value2 = returnProperty(trend2.value, data.kpi_data);
      return [data.year, value1, value2];
    });
    var data = anychart.data.set(formattedData);

    var seriesData_1 = data.mapAs({ x: 0, value: 1 });
    var seriesData_2 = data.mapAs({ x: 0, value: 2 });

    var chart = anychart.line();

    var series1 = chart.line(seriesData_1);
    var series2 = chart.area(seriesData_2);

    series1.name(trend1.value);
    series1.normal().stroke("#2A9872", 3);
    var markers = series1.markers();
    markers.enabled(true);
    markers.size(6);
    markers.stroke("none");

    series2.normal().fill("#F5E5D1");
    series2.normal().stroke("none");
    series2.name(trend2.value);

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
      "<div style='margin-bottom: 0.5rem;'><p style='text-align: center;'>Year {%x}</p></div>"
    );

    tooltip.format(
      `<div class='flex-div' style='width: 95%;  margin-bottom: 0.6rem;'><div style='display: flex; align-items: center; margin-right: 6.65rem;'><div class='green-circle'></div><p>{%seriesName}</p></div><p style='font-weight: 600;'> ${
        returnLabels(trend1.value).prefix
      } {%value}{groupsSeparator:\\,, decimalsCount:2}${
        returnLabels(trend1.value).suffix
      }</p></div>`
    );

    var diffTooltip = series2.tooltip();
    diffTooltip.format(
      `<div class='flex-div' style='width: 95%; '><div style='display: flex; align-items: center; margin-right: 7.15rem;'><div class='color-box'></div><p>{%seriesName}</p></div><p style='font-weight: 600;'>${
        returnLabels(trend2.value).prefix
      } {%value}{groupsSeparator:\\,, decimalsCount:2} ${
        returnLabels(trend2.value).suffix
      }</p></div></div>`
    );

    tooltipSettings(tooltip);

    chart.tooltip().onDomReady(function () {
      this.contentElement.style.width = "100%";
    });

    var legendItem1 = series1.legendItem();
    var legendItem2 = series2.legendItem();
    legendItem1.iconType("line");
    legendItem2.iconType("area");
    series1.name(trend1.value);
    series2.name(trend2.value);

    chart.animation(true);
    chart.yGrid().enabled(true);
    chart.yGrid().stroke("lightgray");
    setChartInstance(chart);
  }, [selectedBrand, trend1, trend2, showTable]);

  useEffect(() => {
    setSelectedBrand(graphData[0]);
  }, [graphData]);

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
        data={graphBase64}
        setData={setGraphBase64}
        titleEnd={""}
      />
      <Flex
        bg="bgGray"
        width="100%"
        alignItems="center"
        margin="auto"
        justify="space-between"
        my="1rem"
        p="1rem"
      >
        <Text>Custom Trend</Text>
        <Flex>
          <EditorDropdown
            label="Trend 1"
            placeholder="Select"
            name="trend1"
            control={control}
            options={[
              { label: "Spend", value: "Spend" },
              { label: "Volume", value: "Volume" },
              { label: "Net Revenue", value: "Net Revenue" },
              { label: "MaCo", value: "MaCo" },
              { label: "ROI", value: "ROI" },
            ]}
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
          <EditorDropdown
            label="Trend 2"
            placeholder="Select"
            name="trend2"
            control={control}
            options={[
              { label: "Spend", value: "Spend" },
              { label: "Volume", value: "Volume" },
              { label: "Net Revenue", value: "Net Revenue" },
              { label: "MaCo", value: "MaCo" },
              { label: "ROI", value: "ROI" },
            ]}
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
        <Flex align="center">
          <Tooltip label="View Data">
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
      <Box pl="1rem" bg="white" height="320px" width="100%" {...boxProps}>
        {chartInstance && (
          <Wrapper position="relative" width="100%" height="100%">
            <Legend trend1={trend1.value} trend2={trend2.value} />
            <AnyChart
              instance={chartInstance}
              height={300}
              id={name}
              width="100%"
            />
          </Wrapper>
        )}
      </Box>
      <Flex py="2rem" justify="center">
        {graphData?.map((brand, i) => (
          <Text
            mr="1rem"
            cursor="pointer"
            onClick={() => setSelectedBrand(brand)}
            key={i}
          >
            {brand?.brand_name}
          </Text>
        ))}
      </Flex>
    </>
  );
};

const Wrapper = styled(Box)`
  tspan {
    color: #000;
  }
`;

export default CustomBrandChart;

const Legend = ({ trend1, trend2 }) => (
  <Flex
    flexDirection="column"
    left="-10px"
    bottom="-50px"
    transform="rotate(-90deg)"
    zIndex="2"
    position="absolute"
    fontSize="0.875rem"
    fontWeight="600"
  >
    <Flex align="center" mb="10px">
      <Box width="15px" height="15px" mr="5px" ml="-5px" bg="#F5E5D1" />
      {trend2}({returnLabels(trend2).yLabel})
    </Flex>
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
      {trend1}({returnLabels(trend1).yLabel})
    </Flex>
  </Flex>
);
