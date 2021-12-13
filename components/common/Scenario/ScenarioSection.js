import React, { useEffect } from "react";
import { Container, Section, Page } from "../../library";
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
import { useForm } from "react-hook-form";

// import ScenarioCard from "./ScenarioCard";
import { Switch } from "../../FormComponents";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import { useUser } from "@/redux/UserSlice";
import { useRouter } from "next/router";
import useAxios from "@/components/Hooks/useAxios";

const ScenarioSection = ({
  italicsText = false,
  optimizedPlanButton = false,
  scenarioCardDetails,
  compareButton = false,
  scenarioPlanButton = false,
}) => {
  const { control } = useForm();
  const router = useRouter();
  const { mediaPlanState, mediaPlanDispatch } = useMediaPlan();
  const { userState } = useUser();

  const { execute, isLoading, response, error } = useAxios({
    url: "/opt_plan/",
    method: "post",
    showToast: true,
    toastMessage: "success",
  });

  const {
    execute: simExe,
    isLoading: simLoad,
    response: simRes,
    error: simError,
  } = useAxios({
    url: "/sim_plan/",
    method: "post",
    showToast: true,
    toastMessage: "Success",
  });

  useEffect(() => {
    if (response) {
      console.log(response);
      mediaPlanDispatch.setNewOptPlanId(response?.opt_plan_id);
      mediaPlanDispatch.changeStep({ step: "opt" });
    }
    if (error) {
      console.log(error);
    }
  }, [response, error]);

  useEffect(() => {
    if (simRes) {
      console.log(simRes);
      mediaPlanDispatch.setNewSimPlanId(simRes?.sim_plan_id);
      mediaPlanDispatch.setNewSimPlanName(simRes?.sim_plan_name);
      mediaPlanDispatch.changeStep({ step: "scenario" });
    }
    if (simError) {
      console.log(simError);
    }
  }, [simRes, simError]);

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
            {optimizedPlanButton && (
              <Button
                variant="primary"
                leftIcon={<Img src="/svg/add.svg" px="0.3rem" height="15px" />}
                fontSize="0.9rem"
                fontWeight="normal"
                mr="1.2rem"
                p="1rem"
                borderRadius="10px"
                height="2.25rem !important"
                onClick={() => {
                  execute({
                    options: {
                      headers: {
                        Authorization: `Bearer ${userState.access_token}`,
                      },
                    },
                    data: {
                      media_plan_id: mediaPlanState.newMediaPlanId,
                    },
                  });
                }}
                isLoading={isLoading}
                // onClick={() => router.push("/opt-plan")}
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
            {scenarioPlanButton && (
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
                        onClick={() => {
                          simExe({
                            options: {
                              headers: {
                                Authorization: `Bearer ${userState.access_token}`,
                              },
                            },
                            data: {
                              media_plan_id: mediaPlanState.newMediaPlanId,
                              opt_plan_id: mediaPlanState.newOptPlanId,
                            },
                          });
                          mediaPlanDispatch.updateSimPlanData(
                            mediaPlanState.optPlanData
                          );
                          // setOptPlan(false);
                          // setSimScenario(true);
                        }}
                      >
                        New From Optimized
                      </MenuItem>
                      <MenuItem fontSize="0.9rem" py="0.4rem" fontWeight="600">
                        Upload Plan
                      </MenuItem>
                      <MenuItem
                        fontWeight="600"
                        fontSize="0.9rem"
                        py="0.2rem"
                        onClick={() => {
                          setOptPlan(false);
                          setSimScenario(true);
                        }}
                      >
                        New From LY
                      </MenuItem>
                      <MenuItem
                        fontSize="0.9rem"
                        py="0.4rem"
                        pb="0rem"
                        fontWeight="600"
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
                      <MenuItem fontSize="0.9rem" pb="0rem" fontWeight="600">
                        New Opt Scenario
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Box>
              </Menu>
            )}
            <Box position="relative">
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
            </Box>
          </Flex>
        </Flex>
        <Flex>
          {/* {scenarioCardDetails.map((scenario, index) => (
            <ScenarioCard
              key={index}
              title={scenario.title}
              bg={scenario.bg}
              tagBg={scenario.tagBg}
              menu={scenario.menu}
              current={scenario.current}
              tag={scenario.tag}
              subheading={scenario.subheading}
              subhead={scenario.subhead}
              subheadColor={scenario.subheadColor}
              finalized={scenario.finalized}
            />
          ))} */}
        </Flex>
      </Container>
    </Box>
  );
};

export default ScenarioSection;
