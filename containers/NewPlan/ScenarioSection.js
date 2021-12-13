import React, { useState } from "react";
import {
  Flex,
  Text,
  Img,
  Box,
  Button,
  Menu,
  MenuList,
  MenuButton,
  MenuGroup,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";

import axios, { responseHandler, errorHandler } from "@/lib/http";
import { Container } from "components/library";
import ScenarioCard from "components/NewPlan/ScenarioCard";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import FullScreenLoader from "@/components/common/FullScreenLoader";

const ScenarioSection = ({ italicsText = false, compareButton = false }) => {
  const { mediaPlanState, mediaPlanDispatch } = useMediaPlan();
  const [loading, setLoading] = useState(false);
  const newOptPlan = () => {
    setLoading(true);
    axios({
      url: "/opt_plan/",
      method: "post",
      data: {
        media_plan_id: mediaPlanState.newPlanDetails.id,
      },
    })
      .then(responseHandler)
      .then((res) => {
        mediaPlanDispatch.newOptPlan({
          id: res.opt_plan_id,
          title: res.opt_plan_name,
        });
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
  };

  const newSimPlanFromOptPlan = () => {
    setLoading(true);
    axios({
      url: "/sim_plan/",
      method: "post",
      data: {
        media_plan_id: mediaPlanState.newPlanDetails?.id,
        opt_plan_id: mediaPlanState.selectedPlan?.id,
      },
    })
      .then(responseHandler)
      .then((res) => {
        mediaPlanDispatch.newSimPlanFromOpt({
          id: res.sim_plan_id,
          title: res.sim_plan_name,
          opt_id: mediaPlanState.selectedPlan?.id,
          opt_plan_name: mediaPlanState.selectedPlan?.title,
          spends: mediaPlanState.selectedPlan?.spends,
          opt_plan_details: {
            woa: mediaPlanState.selectedPlan?.otherDetails?.woa,
            qwoa: mediaPlanState.selectedPlan?.otherDetails?.qwoa,
            hiatus_period:
              mediaPlanState.selectedPlan?.otherDetails?.hiatus_period,
          },
        });
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
  };

  const duplicateSim = () => {
    setLoading(true);
    axios({
      url: "/sim_plan/",
      method: "post",
      data: {
        media_plan_id: mediaPlanState.newPlanDetails?.id,
        opt_plan_id: mediaPlanState.selectedPlan?.opt_id,
      },
    })
      .then(responseHandler)
      .then((res) => {
        mediaPlanDispatch.newSimPlanFromOpt({
          id: res.sim_plan_id,
          title: res.sim_plan_name,
          opt_id: mediaPlanState.selectedPlan?.opt_id,
          opt_plan_name: mediaPlanState.selectedPlan?.opt_plan_name,
          spends: mediaPlanState.selectedPlan?.opt_spends,
          opt_plan_details: mediaPlanState.selectedPlan?.opt_plan_details,
        });
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
  };

  return (
    <Box
      width="100%"
      bg="url('/png/scenario bg.png') no-repeat"
      backgroundSize="cover"
      px="5rem"
      pt="0.5rem"
      pb="0.1rem"
      height="8.125rem"
      zIndex="100"
    >
      {loading && <FullScreenLoader />}
      <Container>
        <Flex alignItems="center" justifyContent="space-between" mb="0.7rem">
          <Flex alignItems="center">
            <Text
              color="white"
              textTransform="uppercase"
              fontSize="0.75rem"
              letterSpacing="0.05rem"
              py="0.6rem"
              fontWeight="600"
            >
              scenarios
            </Text>
            {italicsText && (
              <Text
                color="primaryYellow"
                fontSize="0.75rem"
                letterSpacing="0.02rem"
                ml="1.5rem"
              >
                <i>Select scenarios to compare</i>
              </Text>
            )}
          </Flex>
          <Flex>
            {mediaPlanState.selectedPlan.type === "ideal" &&
              mediaPlanState.selectedPlan.hasExecuted && (
                <Button
                  variant="primary"
                  leftIcon={
                    <Img src="/svg/add.svg" px="0.3rem" height="15px" />
                  }
                  fontSize="0.9rem"
                  fontWeight="normal"
                  mr="1.2rem"
                  p="1rem"
                  borderRadius="10px"
                  height="2.25rem !important"
                  onClick={newOptPlan}
                >
                  New Optimized Plan
                </Button>
              )}
            {compareButton && (
              <Button
                variant="primary"
                leftIcon={<Img src="/svg/adjustments.svg" />}
                fontSize="0.9rem"
                fontWeight="500"
                mr="0.9rem"
                height="20px !important"
              >
                Compare
              </Button>
            )}
            {mediaPlanState.selectedPlan?.type === "opt" &&
              mediaPlanState.selectedPlan?.hasExecuted &&
              !mediaPlanState.selectedPlan?.integrateMMM && (
                <Menu autoSelect={false} borderRadius="16px">
                  <MenuButton
                    as={Button}
                    leftIcon={
                      <Img src="/svg/add.svg" px="0.5rem" height="15px" />
                    }
                    rightIcon={
                      <Img src="/svg/new plan drop down.svg" px="0.3rem" />
                    }
                    fontWeight="500"
                    fontSize="0.9rem"
                    mr="1.2rem"
                    p="0.5rem"
                    borderRadius="12px"
                  >
                    Scenario Plan
                  </MenuButton>
                  <Box>
                    <MenuList
                      position="absolute"
                      top="-1rem"
                      left="0.5rem"
                      zIndex="10"
                      minWidth="10rem"
                      border="none"
                      background="rgba(255, 255, 255, 0.85)"
                      backdropFilter="blur(4px)"
                    >
                      <MenuGroup
                        title="simulation"
                        textTransform="uppercase"
                        color="darkGray"
                        letterSpacing="0.05rem"
                        fontWeight="600"
                        ml="0.8rem"
                        mb="0.3rem"
                        mt="0rem"
                        fontSize="0.7rem"
                      >
                        <MenuItem
                          fontSize="0.9rem"
                          py="0.2rem"
                          fontWeight="600"
                          onClick={newSimPlanFromOptPlan}
                        >
                          New From Optimized
                        </MenuItem>
                        <MenuItem
                          fontWeight="600"
                          fontSize="0.9rem"
                          py="0.2rem"
                          isDisabled
                          onClick={newSimPlanFromOptPlan}
                        >
                          New From LY
                        </MenuItem>
                        <MenuItem
                          fontSize="0.9rem"
                          py="0.4rem"
                          fontWeight="600"
                          onClick={newSimPlanFromOptPlan}
                        >
                          Upload Plan
                        </MenuItem>
                        <MenuItem
                          fontSize="0.9rem"
                          py="0.4rem"
                          pb="0rem"
                          fontWeight="600"
                          isDisabled
                        >
                          New From Scratch
                        </MenuItem>
                      </MenuGroup>
                      <MenuDivider opacity="1" color="#dddddd" />
                      <MenuGroup
                        title="optimization"
                        textTransform="uppercase"
                        color="darkGray"
                        letterSpacing="0.05rem"
                        fontWeight="600"
                        mb="0rem"
                        ml="0.8rem"
                        fontSize="0.7rem"
                      >
                        <MenuItem
                          onClick={newOptPlan}
                          fontSize="0.9rem"
                          pb="0rem"
                          fontWeight="600"
                        >
                          New Opt Scenario
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Box>
                </Menu>
              )}
            {/* <Box position="relative">
              <Text
                top="-15px"
                borderRadius="5px"
                color="white"
                px="0.5rem"
                py="0.1rem"
                bg="#6D7278"
                fontSize="0.75rem"
                mb="4px"
              >
                Coming Soon
              </Text>
              <Switch
                name="scenarioSwitch"
                control={control}
                options={["USD", "CAD"]}
                textProps={{ fontSize: "0.8rem" }}
                defColor="#FDC884"
                gold={true}
              />
            </Box> */}
          </Flex>
        </Flex>
        <Flex>
          {mediaPlanState.listOfAllPlans.map((plan, i) => {
            const current =
              plan.type === "ideal"
                ? mediaPlanState.selectedPlan.type === plan.type
                : mediaPlanState.selectedPlan.type === plan.type &&
                  mediaPlanState.selectedPlan.id === plan.id
                ? true
                : false;
            return (
              <ScenarioCard
                plan={plan}
                key={i}
                current={current}
                menu={false}
                newOptPlan={newOptPlan}
                duplicateSim={duplicateSim}
              />
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
};

export default ScenarioSection;
