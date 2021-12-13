import React, { useState } from "react";
import { Flex, Text, Img, Box } from "@chakra-ui/react";

import Donut from "../../Donut";
import VehicleMixTable from "@/components/common/VehicleMixTable";

const ChartTableSection = ({ donutData }) => {
  const [chartView, setChartView] = useState(true);
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
      borderRadius="10px"
      mb="1.5rem"
    >
      <Box bg="#fafafa" height="300px" width="100%">
        <Flex
          px="1.5rem"
          justifyContent="space-between"
          alignItems="center"
          mt="1rem"
        >
          <Text>Vehicle Mix</Text>
          {chartView ? (
            <Img src="/svg/data view.svg" onClick={() => setChartView(false)} />
          ) : (
            <Img src="/svg/chart.svg" onClick={() => setChartView(true)} />
          )}
        </Flex>
        {chartView ? (
          <Donut
            heading="Vehicle Mix"
            data={donutData}
            height="280px"
            flexProps={{
              display: "flex",
              alignItems: "center",
            }}
          />
        ) : (
          <VehicleMixTable data={donutData} />
        )}
      </Box>
    </Flex>
  );
};

export default ChartTableSection;
