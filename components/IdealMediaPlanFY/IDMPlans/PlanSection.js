import React, { useEffect, useState } from "react";
import { Container, Section, Page } from "../../library";
import { Flex, Text, Img, Box, Tooltip } from "@chakra-ui/react";
import MediaSection from "../BrandResults/MediaSection";
import EditorSection from "../PlanTrend/EditorSection";

import Donut from "../../common/Donut";
import VehicleMixTable from "@/components/common/VehicleMixTable";
import useAxios from "@/components/Hooks/useAxios";
import Loader from "@/components/Loader";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import { useUser } from "@/redux/UserSlice";

function PlanSection({ chartResponse, chartError }) {
  const [chartView, setChartView] = useState(true);
  const [donutData, setDonutData] = useState([]);
  const { mediaPlanDispatch, mediaPlanState } = useMediaPlan();
  const { userState } = useUser();

  const { execute, error, response, isLoading } = useAxios({
    url: "/media_results",
    method: "get",
    manual: true,
  });

  useEffect(() => {
    execute({
      options: {
        headers: {
          Authorization: `Bearer ${userState.access_token}`,
        },
      },
      params: {
        //  media_plan_id: mediaPlanState.newMediaPlanId,
        media_plan_id: 1,
        type: "IDL",
      },
    });
  }, []);

  useEffect(() => {
    if (response) {
      console.log(response);
      setDonutData([
        ...response?.spend?.spend?.digital?.vehicles,
        ...response?.spend?.spend?.traditional?.vehicles,
      ]);

      mediaPlanDispatch.setIdealMediaPlanResults(response.spend);
    } else {
      console.log(error);
    }
  }, [response, error]);

  const donut2Data = donutData?.map((donut, i) => {
    return { name: donut.Vehicle_name, value: donut.total };
  });

  const tempTableData = donutData?.map((row, i) => {
    return [
      row.Vehicle_name,
      row.total,
      ((row.total / response?.spend?.spend?.total) * 100).toFixed(2),
    ];
  });

  return (
    <Section>
      <Page mt="1rem" pt="1.5rem">
        <Box px="1.5rem" mb="1rem">
          <Text>Ideal Media Plan</Text>
        </Box>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Img ml="4.5rem" height="12rem" src="/png/barrell-plan.png" />
            <Flex justifyContent="space-between" height="7rem" width="100%">
              <Flex
                width="15%"
                flexDirection="column"
                height="5.5rem"
                ml="1rem"
                py="0.5rem"
              >
                <Box height="1.5rem" />
                <Text color="gray" fontSize="0.75rem" mb="0.55rem">
                  IDEAL
                </Text>
                <Text color="gray" fontSize="0.75rem">
                  LY
                </Text>
              </Flex>
              <Flex justifyContent="space-between" width="85%">
                <Flex
                  flexDirection="column"
                  height="5.5rem"
                  alignItems="center"
                  width="28%"
                  bg="#ebe4d8"
                  borderRadius="8px"
                  py="0.5rem"
                  textAlign="center"
                >
                  <Text
                    color="gray"
                    fontSize="0.75rem"
                    letterSpacing="0.05rem"
                    textTransform="uppercase"
                    mb="0.3rem"
                  >
                    media budget
                  </Text>
                  <Flex alignItems="center" mb="0.25rem">
                    {isLoading ? (
                      <Loader size="sm" />
                    ) : (
                      <Text
                        fontSize="0.95rem"
                        letterSpacing="0.03rem"
                        fontWeight="600"
                      >
                        {`$ ${response?.spend?.spend?.total}MM` || "-"}
                      </Text>
                    )}
                  </Flex>
                  <Flex alignItems="center">
                    <Text color="gray" fontSize="0.9rem">
                      -
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  flexDirection="column"
                  height="5.5rem"
                  py="0.5rem"
                  ml="3rem"
                  alignItems="center"
                  width="30%"
                  textAlign="center"
                >
                  <Text
                    color="gray"
                    fontSize="0.75rem"
                    letterSpacing="0.05rem"
                    mb="0.3rem"
                  >
                    DIGITAL
                  </Text>
                  <Flex alignItems="center" mb="0.25rem">
                    {isLoading ? (
                      <Loader size="sm" />
                    ) : (
                      <>
                        <Text fontSize="0.95rem" mr="0.7rem" fontWeight="600">
                          {`$ ${response?.spend?.spend?.digital?.total}MM` ||
                            "-"}
                        </Text>
                        <Text fontSize="0.9rem" color="#45A584">
                          {`${response?.spend?.spend?.digital?.percentage}%` ||
                            "-"}
                        </Text>
                      </>
                    )}
                  </Flex>
                  <Flex alignItems="center">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      -
                    </Text>
                    <Text fontSize="0.9rem" color="gray">
                      -
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  flexDirection="column"
                  height="5.5rem"
                  py="0.5rem"
                  mr="-1rem"
                  alignItems="center"
                  width="31%"
                  textAlign="center"
                >
                  <Text
                    color="gray"
                    fontSize="0.75rem"
                    letterSpacing="0.05rem"
                    mb="0.3rem"
                  >
                    TRADITIONAL
                  </Text>
                  <Flex alignItems="center" mb="0.25rem">
                    {isLoading ? (
                      <Loader size="sm" />
                    ) : (
                      <>
                        <Text fontSize="0.91rem" mr="0.7rem" fontWeight="600">
                          {`$ ${response?.spend?.spend?.traditional?.total}MM` ||
                            "-"}
                        </Text>
                        <Text fontSize="0.9rem" color="#45A584">
                          {`${response?.spend?.spend?.traditional?.percentage}%` ||
                            "-"}
                        </Text>
                      </>
                    )}
                  </Flex>
                  <Flex alignItems="center">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      -
                    </Text>
                    <Tooltip label="Vs LY">
                      <Text fontSize="0.9rem" color="gray">
                        -
                      </Text>
                    </Tooltip>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Box>
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
                    <Tooltip label="Show table view">
                      <Img
                        src="/svg/data view.svg"
                        onClick={() => setChartView(false)}
                      />
                    </Tooltip>
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
                    data={donut2Data}
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
                  <VehicleMixTable data={tempTableData} />
                )}
              </Box>
            </Flex>
          </Container>
        </Flex>
        {/* <MediaSection /> */}
        {/* <EditorSection response={chartResponse} error={chartError} /> */}
      </Page>
    </Section>
  );
}

export default PlanSection;
