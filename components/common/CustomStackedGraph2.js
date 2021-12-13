import React, { useEffect, useState } from "react";
import AnyChart from "anychart-react";
import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";
import anychart from "anychart";

const CustomStackedChart2 = ({
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

    let max = 1;
    for (var i = 0; i < customData.length; i++) {
      if (max < customData[i].length) max = customData[i].length;
    }

    var colorsArray = [
      "#CB7130",
      "#DFC033",
      "#5CE270",
      "#9089FA",
      "#DB5190",
      "#565FD3",
      "#3CC1C8",
      "#F7963D",
      "#E13B38",
      "#982523",
    ];

    var chart = anychart.column();
    for (let i = 0; i < max - 1; i++) {
      chart.addSeries(data.mapAs({ x: 0, value: i + 1 }));
    }

    var seriesData_12 = data2.mapAs({ x: 0, value: 1 });
    var series12 = chart.area(seriesData_12);
    series12.normal().fill("#F5E5D1");
    series12.normal().stroke("none");

    var yScale2 = anychart.scales.linear();
    yScale2.stackMode("value");

    let x = 0;
    while (chart.getSeriesAt(x)) {
      chart.getSeriesAt(x).yScale(yScale2);
      chart.getSeriesAt(x).fill(colorsArray[x]);
      chart.getSeriesAt(x).stroke("none");
      chart.getSeriesAt(x).name(tooltipInfo[x]);
      x++;
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

    var j = 0;
    while (chart.getSeriesAt(j)) {
      var individualTooltip = chart.getSeriesAt(j).tooltip();
      individualTooltip.format(
        "<div class='flex-div' style='width: 47%; margin: 0 auto; margin-bottom: 0.3rem;'><div style='display: flex; align-items: center;'><div class='green-circle' style='background-color:" +
          colorsArray[j] +
          ";'></div><p>{%seriesName}</p></div><p>{%yPercentOfCategory}{decimalsCount:2}%</p></div>"
      );
      j++;
    }

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

export default CustomStackedChart2;
