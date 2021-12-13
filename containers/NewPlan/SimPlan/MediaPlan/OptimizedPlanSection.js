import React, { useState, useEffect, useMemo } from "react";
import { Flex, Text, Img, Box } from "@chakra-ui/react";

import { Container, Section, Page } from "components/library";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import BrandKPIsSection from "./BrandKPIsSection";
import PlanTrendSection from "./PlanTrendSection";
import ChartTableSection from "components/NewPlan/SimPlan/MediaPlan/ChartTableSection";
import helper from "@/lib/helper";
import AnimatedBeerJugs from "@/components/NewPlan/AnimatedBeerJugs";

function OptimizedPlan() {
  const [included, setIncluded] = useState(false);
  const [donutData, setDonutData] = useState([]);
  const [optTotal, setOptTotal] = useState();
  const [optDigitalTotal, setOptDigitalTotal] = useState(0);
  const [optTraditionalTotal, setOptTraditionalTotal] = useState(0);
  const [simTotal, setSimTotal] = useState(0);
  const [simDigitalTotal, setSimDigitalTotal] = useState(0);
  const [simTraditionalTotal, setSimTraditionalTotal] = useState(0);
  const [idealTotal, setIdealTotal] = useState(0);
  const [idealDigitalTotal, setIdealDigitalTotal] = useState(0);
  const [idealTraditionalTotal, setIdealTraditionalTotal] = useState(0);

  const { mediaPlanState } = useMediaPlan();

  useEffect(() => {
    setSimTotal(0);
    setSimDigitalTotal(0);
    setSimTraditionalTotal(0);
    setDonutData([]);
    setOptTotal(0);
    setOptDigitalTotal(0);
    setOptTraditionalTotal(0);
    if (mediaPlanState.selectedPlan.opt_spends) {
      const temp = {};
      let total = 0;
      let digitalTotal = 0;
      let traditionalTotal = 0;
      mediaPlanState.selectedPlan.opt_spends.forEach((plan) => {
        total += parseFloat(plan.opt_planned_spend);
        if (plan.category === "TRADITIONAL") {
          traditionalTotal += parseFloat(plan.opt_planned_spend);
        } else {
          digitalTotal += parseFloat(plan.opt_planned_spend);
        }
        if (temp[plan.vehicle]) {
          temp[plan.vehicle] += parseFloat(plan.opt_planned_spend);
        } else {
          temp[plan.vehicle] = parseFloat(plan.opt_planned_spend);
        }
      });
      const final = Object.keys(temp).map((vehicle) => {
        return {
          name: vehicle,
          value: temp[vehicle]?.toFixed(2),
        };
      });
      setDonutData(final);
      setOptTotal(total);
      setOptDigitalTotal(digitalTotal);
      setOptTraditionalTotal(traditionalTotal);
    }
    if (mediaPlanState.selectedPlan.hasExecuted) {
      const temp = {};
      let total = 0;
      let digitalTotal = 0;
      let traditionalTotal = 0;
      mediaPlanState.selectedPlan.sim_spends.forEach((plan) => {
        total += parseFloat(plan.opt_planned_spend);
        if (plan.category === "TRADITIONAL") {
          traditionalTotal += parseFloat(plan.opt_planned_spend);
        } else {
          digitalTotal += parseFloat(plan.opt_planned_spend);
        }
        if (temp[plan.vehicle]) {
          temp[plan.vehicle] += parseFloat(plan.opt_planned_spend);
        } else {
          temp[plan.vehicle] = parseFloat(plan.opt_planned_spend);
        }
      });
      const final = Object.keys(temp).map((vehicle) => {
        return {
          name: vehicle,
          value: temp[vehicle]?.toFixed(2),
        };
      });
      setDonutData(final);
      setSimTotal(total);
      setSimDigitalTotal(digitalTotal);
      setSimTraditionalTotal(traditionalTotal);
    }
  }, [
    mediaPlanState.selectedPlan.opt_spends,
    mediaPlanState.selectedPlan.sim_spends,
    mediaPlanState.selectedPlan.id,
  ]);

  useMemo(() => {
    let total = 0;
    let digitalTotal = 0;
    let traditionalTotal = 0;
    mediaPlanState.idealPlanSpends.forEach((plan) => {
      total += parseFloat(plan.opt_planned_spend);
      if (plan.category === "TRADITIONAL") {
        traditionalTotal += parseFloat(plan.opt_planned_spend);
      } else {
        digitalTotal += parseFloat(plan.opt_planned_spend);
      }
    });
    console.log(total);
    setIdealTotal(total);
    setIdealDigitalTotal(digitalTotal);
    setIdealTraditionalTotal(traditionalTotal);
  }, [mediaPlanState.idealPlanSpends]);

  return (
    <Section>
      <Page mt="1rem" py="1.2rem">
        <Box px="1.5rem" mb="0.8rem">
          <Text>Optimized Plan</Text>
        </Box>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex flexDirection="column">
            <AnimatedBeerJugs
              traditionalHeight={
                simTraditionalTotal ? simTraditionalTotal / simTotal : 0
              }
              digitalHeight={simDigitalTotal ? simDigitalTotal / simTotal : 0}
            />
            <Flex justifyContent="space-between" height="9rem" width="100%">
              <Flex
                width="15%"
                flexDirection="column"
                height="9.5rem"
                ml="1rem"
                py="0.5rem"
              >
                <Box height="1.5rem" />
                <Text color="gray" fontSize="0.75rem" mb="0.55rem">
                  SIM
                </Text>
                <Text color="gray" fontSize="0.75rem" mb="0.55rem">
                  OPT
                </Text>
                <Text color="gray" fontSize="0.75rem" mb="0.55rem">
                  IDEAL
                </Text>
                <Text color="gray" fontSize="0.75rem" mb="0.55rem">
                  LY
                </Text>
              </Flex>
              <Flex justifyContent="space-between" width="85%">
                <Flex
                  flexDirection="column"
                  height="8.5rem"
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
                    <Text
                      fontSize="0.95rem"
                      letterSpacing="0.03rem"
                      fontWeight="600"
                    >
                      {simTotal ? helper.currencyFormatter(simTotal) : "-"}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" mb="0.25rem">
                    <Text color="gray" fontSize="0.9rem">
                      {helper.currencyFormatter(optTotal)}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" mb="0.25rem">
                    <Text color="gray" fontSize="0.9rem">
                      {helper.currencyFormatter(idealTotal)}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text color="gray" fontSize="0.9rem">
                      {helper.currencyFormatter(
                        mediaPlanState.lyDetails?.totalSpend
                      )}
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  flexDirection="column"
                  height="7rem"
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
                    <Text fontSize="0.95rem" mr="0.7rem" fontWeight="600">
                      {simDigitalTotal
                        ? helper.currencyFormatter(simDigitalTotal)
                        : "-"}
                    </Text>
                    <Text fontSize="0.9rem" color="activeGreen">
                      {simDigitalTotal / simTotal
                        ? ((simDigitalTotal / simTotal) * 100).toFixed(2) + "%"
                        : "-"}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" mb="0.25rem">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      {helper.currencyFormatter(optDigitalTotal)}
                    </Text>
                    <Text fontSize="0.9rem" color="gray">
                      {((optDigitalTotal / optTotal) * 100).toFixed(2) + "%"}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" mb="0.25rem">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      {helper.currencyFormatter(idealDigitalTotal)}
                    </Text>
                    <Text fontSize="0.9rem" color="gray">
                      {((idealDigitalTotal / idealTotal) * 100).toFixed(2) +
                        "%"}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      {helper.currencyFormatter(
                        mediaPlanState.lyDetails?.digitalSpend
                      )}
                    </Text>
                    <Text fontSize="0.9rem" color="gray">
                      {(
                        (mediaPlanState.lyDetails?.digitalSpend /
                          mediaPlanState.lyDetails?.totalSpend) *
                        100
                      ).toFixed(2) + "%"}
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  flexDirection="column"
                  height="7rem"
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
                    <Text fontSize="0.95rem" mr="0.7rem" fontWeight="600">
                      {simTraditionalTotal
                        ? helper.currencyFormatter(simTraditionalTotal)
                        : "-"}
                    </Text>
                    <Text fontSize="0.9rem" color="activeGreen">
                      {simTraditionalTotal / simTotal
                        ? ((simTraditionalTotal / simTotal) * 100).toFixed(2) +
                          "%"
                        : "-"}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" mb="0.25rem">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      {helper.currencyFormatter(optTraditionalTotal)}
                    </Text>
                    <Text fontSize="0.9rem" color="gray">
                      {((optTraditionalTotal / optTotal) * 100).toFixed(2) +
                        "%"}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      {helper.currencyFormatter(idealTraditionalTotal)}
                    </Text>
                    <Text fontSize="0.9rem" color="gray">
                      {((idealTraditionalTotal / idealTotal) * 100).toFixed(2) +
                        "%"}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      {helper.currencyFormatter(
                        mediaPlanState.lyDetails?.traditionalSpend
                      )}
                    </Text>
                    <Text fontSize="0.9rem" color="gray">
                      {(
                        (mediaPlanState.lyDetails?.traditionalSpend /
                          mediaPlanState.lyDetails?.totalSpend) *
                        100
                      ).toFixed(2) + "%"}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            {/*<Flex
              mt="-2rem"
              ml="2rem"
              alignItems="center"
              justifyContent="center"
              py="1rem"
            >
              <Text
                textTransform="uppercase"
                fontSize="0.7rem"
                color="darkGray"
                width="22%"
                lineHeight="15px"
                letterSpacing="0.03rem"
              >
                Incremental Budget required
              </Text>
              {included ? (
                <Flex flexDirection="column" alignItems="center">
                  <Text
                    px="0.5rem"
                    color="gray"
                    fontSize="1rem"
                    fontWeight="600"
                    textDecoration="line-through"
                    pl="0.5rem"
                  >
                    $ 60,000
                  </Text>
                  <Text color="orange" fontSize="0.75rem">
                    included
                  </Text>
                </Flex>
              ) : (
                <Text px="0.5rem" mr="0.5rem" fontSize="1rem" fontWeight="600">
                  $ 60,000
                </Text>
              )}
              {included ? (
                <Button
                  ml="1rem"
                  variant="secondary"
                  leftIcon={
                    <Img src="/svg/reset.svg" mr="0.3rem" height="25px" />
                  }
                  height="2.3rem"
                  fontSize="0.9rem"
                  fontWeight="600"
                  mr="1.2rem"
                  px="0.8rem"
                  onClick={() => setIncluded(false)}
                  fontWeight="400"
                >
                  Undo Inclusion
                </Button>
              ) : (
                <Button
                  variant="primary"
                  leftIcon={
                    <Img src="/svg/include.svg" mr="0.3rem" height="25px" />
                  }
                  height="2.3rem"
                  fontSize="0.9rem"
                  fontWeight="600"
                  mr="1.2rem"
                  px="0.8rem"
                  onClick={() => setIncluded(true)}
                  fontWeight="400"
                >
                  Include in Media Budget
                </Button>
              )}
            </Flex>*/}
          </Flex>
          <Container width="50%" mr="1.3rem" bg="#fafafa">
            <ChartTableSection donutData={donutData} />
          </Container>
        </Flex>
        <BrandKPIsSection />
        <PlanTrendSection />
      </Page>
    </Section>
  );
}

export default OptimizedPlan;
