import React, { useEffect, useState } from "react";
import AnyChart from "anychart-react";
import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";
import anychart from "anychart";

const CustomStackedChart = ({
  boxProps,
  name,
  customData = [],
  customData2 = [],
  tooltipInfo = [],
  mediaSpend = [],
  dependencies = [],
}) => {
  const [chartInstance, setChartInstance] = useState();

  useEffect(() => {
    var data = anychart.data.set(customData);
    var data2 = anychart.data.set(customData2);

    var seriesData_1 = data.mapAs({ x: 0, value: 1 });
    var seriesData_2 = data.mapAs({ x: 0, value: 2 });
    var seriesData_3 = data.mapAs({ x: 0, value: 3 });
    var seriesData_4 = data.mapAs({ x: 0, value: 4 });
    var seriesData_5 = data.mapAs({ x: 0, value: 5 });
    var seriesData_6 = data.mapAs({ x: 0, value: 6 });
    var seriesData_7 = data.mapAs({ x: 0, value: 7 });
    var seriesData_8 = data.mapAs({ x: 0, value: 8 });
    var seriesData_9 = data.mapAs({ x: 0, value: 9 });
    var seriesData_10 = data.mapAs({ x: 0, value: 10 });

    var seriesData_12 = data2.mapAs({ x: 0, value: 1 });
    var chart = anychart.column();

    var yScale2 = anychart.scales.linear();
    yScale2.stackMode("value");

    var series12 = chart.area(seriesData_12);
    series12.normal().fill("#F5E5D1");
    series12.normal().stroke("none");

    var series1 = chart.column(seriesData_1).yScale(yScale2);
    series1.fill("#CB7130");
    series1.stroke("none");

    var series2 = chart.column(seriesData_2).yScale(yScale2);
    series2.fill("#DFC033");
    series2.stroke("none");

    var series3 = chart.column(seriesData_3).yScale(yScale2);
    series3.fill("#5CE270");
    series3.stroke("none");

    var series4 = chart.column(seriesData_4).yScale(yScale2);
    series4.fill("#9089FA");
    series4.stroke("none");

    var series5 = chart.column(seriesData_5).yScale(yScale2);
    series5.fill("#DB5190");
    series5.stroke("none");

    var series6 = chart.column(seriesData_6).yScale(yScale2);
    series6.fill("#565FD3");
    series6.stroke("none");

    var series7 = chart.column(seriesData_7).yScale(yScale2);
    series7.fill("#3CC1C8");
    series7.stroke("none");

    var series8 = chart.column(seriesData_8).yScale(yScale2);
    series8.fill("#F7963D");
    series8.stroke("none");

    var series9 = chart.column(seriesData_9).yScale(yScale2);
    series9.fill("#E13B38");
    series9.stroke("none");

    var series10 = chart.column(seriesData_10).yScale(yScale2);
    series10.fill("#982523");
    series10.stroke("none");

    var i = 0;
    while (chart.getSeriesAt(i + 1)) {
      chart.getSeriesAt(i + 1).name(tooltipInfo[i]);
      i++;
    }

    series12.name("Seasonality");

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

    var yAxis1 = chart.yAxis(1);
    yAxis1.orientation("left");
    yAxis1.ticks(null);
    yAxis1.minorTicks(null);
    yAxis1.stroke("none");

    var tooltip = chart.tooltip();
    tooltip.displayMode("union");

    tooltip.separator(false);

    function tooltipSettings(tooltip) {
      tooltip.position("right-center");
      tooltip.anchor("center-bottom");
      tooltip.useHtml(true);
      tooltip.offsetX(0);
    }

    tooltip.titleFormat(
      "<div class='flex-div'><p>{%x} Media Spend</p><p style='font-weight: 600;'> $ 250,800</p></div>"
    );

    tooltip.format(
      "<div class='flex-div' style='width: 47%; margin: 0 auto; margin-bottom: 0.3rem;'><div style='display: flex; align-items: center;'><div class='green-circle'></div><p>{%seriesName}</p></div><p>{%yPercentOfCategory}{decimalsCount:2}%</p></div>"
    );

    var diffTooltip = series12.tooltip();

    diffTooltip.format(
      "<div class='flex-div' style='margin-bottom: 0.5rem; width: 100%;'><div style='display: flex; align-items: center;'><div class='color-box'></div><p>{%x} {%seriesName}</p></div><p style='font-weight: 600;'> {%value} HL</p></div>"
    );

    tooltipSettings(tooltip);

    chart.tooltip().onDomReady(function () {
      this.contentElement.style.width = "100%";
      this.contentElement.style.display = "flex !important";
      this.contentElement.classList.add("stacked-tooltip");
    });

    chart.area();

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

export default CustomStackedChart;
