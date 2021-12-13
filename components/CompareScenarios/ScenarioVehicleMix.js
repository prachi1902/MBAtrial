import React, { useState } from "react";
import { Container, Section, Page } from "@/components/library";
import { Flex, Text, Box, Img } from "@chakra-ui/react";
import ScenarioVehicleTable from "./ScenarioVehicleTable";

const ScenarioVehicleMix = () => {
  const [chartView, setChartView] = useState(true);

  return (
    <Section mt="1rem" pb="4rem">
      <Page p="1rem 1.5rem">
        <Flex alignItems="center" justifyContent="space-between">
          <Text>Scenario Vehicle Mix</Text>
          {chartView ? (
            <Img src="/svg/data.svg" onClick={() => setChartView(false)} />
          ) : (
            <Img src="/svg/chart.svg" onClick={() => setChartView(true)} />
          )}
        </Flex>
        {chartView ? (
          <Img src="/png/72-graph(1).png" margin="auto" />
        ) : (
          <Flex alignItems="center" justifyContent="center" py="1rem">
            <ScenarioVehicleTable mr="1rem" title="ideal plan" bg="#379972" />
            <ScenarioVehicleTable mr="1rem" title="opt plan 1" bg="#821E1C" />
            <ScenarioVehicleTable title="sim plan 1" bg="#DD8935" />
          </Flex>
        )}
      </Page>
    </Section>
  );
};

export default ScenarioVehicleMix;
