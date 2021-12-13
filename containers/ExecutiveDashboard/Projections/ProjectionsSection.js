import React, { useState, useEffect } from "react";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Section, Page } from "components/library";
import { NewSwitch } from "@/components/FormComponents";
import useAxios from "components/Hooks/useAxios";
import Loader from "components/Loader";
import ProjectionsLineChart from "@/components/ExecutiveDashboard/Projections/ProjectionsLineChart";

const ProjectionsSection = () => {
  const [graphData, setGraphData] = useState();
  const { control } = useForm();

  const { execute, response, error, isLoading } = useAxios({
    url: "/projections",
    method: "post",
  });

  useEffect(() => {
    execute({
      data: {
        country_id: 1,
        brands: [1, 2],
      },
    });
  }, []);

  useEffect(() => {
    if (response) {
      setGraphData(response.brands);
    }
  }, [response, error]);

  return (
    <Section mt="1rem">
      <Page py="1rem" pb="0.5rem">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          position="relative"
          px="1.5rem"
        >
          <Text>Projections</Text>
          <NewSwitch
            name="projectionsSwitch"
            control={control}
            options={["LOCAL", "REVENUE MGMT"]}
          />
        </Flex>
        {isLoading ? (
          <Loader size="xl" height="50px" />
        ) : (
          <ProjectionsLineChart
            dependencies={[graphData]}
            graphData={graphData}
            name="projections"
          />
        )}

        {/* {tableView ? (
          <ProjectionsTable />
        ) : (
          <Img src="/png/11-graph.png" width="100%" px="1rem" />
        )} */}
      </Page>
      <Box width="100%" mt="1.5rem">
        <Flex alignItems="center" width="max-content" mx="auto">
          <Button
            leftIcon={<Img src="/svg/category report.svg" />}
            mr="1rem"
            bg="#e8e8e8"
            px="1rem"
            border="none"
            color="#c1c1c1"
          >
            Category Report
          </Button>
          <Button
            leftIcon={<Img src="/svg/macro trends.svg" />}
            bg="#e8e8e8"
            px="1rem"
            border="none"
            color="#c1c1c1"
          >
            Macro Trends
          </Button>
        </Flex>
      </Box>
    </Section>
  );
};

export default ProjectionsSection;
