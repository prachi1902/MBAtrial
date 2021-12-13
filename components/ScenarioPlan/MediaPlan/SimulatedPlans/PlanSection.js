import React, { useState } from "react";
import { Container, Section, Page } from "../../../library";
import { Flex, Text, Img, Box } from "@chakra-ui/react";
import MediaSection from "../SocialMediaResults/MediaSection";
import EditorSection from "../PlanEditor/EditorSection";
import PlanTable from "./PlanTable";
import Donut from "../../../common/Donut";
import VehicleMixTable from "@/components/common/VehicleMixTable";

function PlanSection() {
  const [chartView, setChartView] = useState(true);

  const donut1Data = [
    { name: "Facebook", value: 20.55 },
    { name: "Youtube", value: 10.38 },
    { name: "Twitter", value: 15.82 },
    { name: "Instagram", value: 12.53 },
    { name: "OOH", value: 8.25 },
    { name: "Pay TV", value: 8.52 },
    { name: "Print", value: 6.55 },
    { name: "Cinema", value: 2.05 },
    { name: "Radio", value: 12.5 },
    { name: "Google Ads", value: 2.85 },
  ];

  return (
    <Section>
      <Page mt="1rem">
        <Box px="1.5rem" mb="1rem">
          <Text>Simulated Plan</Text>
        </Box>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex flexDirection="column">
            <Img ml="4rem" height="12rem" src="/png/barrell-plan.png" />
            <PlanTable />
          </Flex>
          <Container width="50%" mr="1.3rem" bg="#fafafa">
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
                    <Img
                      src="/svg/data view.svg"
                      onClick={() => setChartView(false)}
                    />
                  ) : (
                    <Img
                      src="/svg/chart.svg"
                      onClick={() => setChartView(true)}
                    />
                  )}
                </Flex>
                {chartView ? (
                  <Donut
                    heading="Vehicle Mix"
                    data={donut1Data}
                    boxProps={{
                      width: "100%",
                      borderRadius: "0.5rem",
                      paddingTop: "0.5rem",
                      height: "300px",
                    }}
                    height="260px"
                    flexProps={{
                      display: "flex",
                      alignItems: "center",
                      pb: "1.5rem",
                    }}
                  />
                ) : (
                  <VehicleMixTable />
                )}
              </Box>
            </Flex>
          </Container>
        </Flex>

        <MediaSection />
        <EditorSection />
      </Page>
    </Section>
  );
}

export default PlanSection;
