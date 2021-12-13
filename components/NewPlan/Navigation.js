import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  IconButton,
  Img,
  MenuList,
  MenuItem,
  Box,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Container, Section } from "components/library";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import { useUser } from "redux/UserSlice";
import FinalizeScenarioModal from "../Navbar/FinalizeScenarioModal";
import helper from "@/lib/helper";
import BetaTagWrapper from "components/common/BetaTagWrapper";

const Navigation = ({ setFinalized }) => {
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [showFlag, setShowFlag] = useState(true);
  const { mediaPlanState } = useMediaPlan();
  const { userState, userDispatch } = useUser();
  const router = useRouter();

  useEffect(() => {
    setShowFlag(true);
    setShowLogo(true);
  }, [mediaPlanState.newPlanDetails]);

  return (
    <>
      <Section
        as="nav"
        width="100%"
        position="relative"
        zIndex="3"
        alignItems="center"
        backgroundColor="primaryRed"
        boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
      >
        <Container
          display="flex"
          height="4rem"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Flex alignItems="center">
            <a href="/media-planner">
              <IconButton
                variant="primary"
                isRound={true}
                icon={<Img src="/svg/home.svg" />}
              />
            </a>
            <Flex ml="2rem" alignItems="center">
              <Box position="relative" cursor="pointer">
                <Img src="/svg/current step.svg" height="1.8rem" />
                <Text
                  position="absolute"
                  color="primaryRed"
                  fontSize="0.75rem"
                  mr="2rem"
                  width="100%"
                  top="5px"
                  left="13.5px"
                  fontWeight="600"
                >
                  Ideal Plan
                </Text>
              </Box>
              <Box position="relative" cursor="pointer">
                <Img
                  src={
                    mediaPlanState.selectedPlan?.type === "opt" ||
                    mediaPlanState.selectedPlan?.type === "sim"
                      ? "/svg/current step.svg"
                      : "/svg/next step.svg"
                  }
                  height="1.8rem"
                />
                <Text
                  position="absolute"
                  color={
                    mediaPlanState.selectedPlan?.type === "opt" ||
                    mediaPlanState.selectedPlan?.type === "sim"
                      ? "primaryRed"
                      : "#DF6261"
                  }
                  fontSize="0.75rem"
                  mr="2rem"
                  width="100%"
                  top="5px"
                  fontWeight="600"
                  left={
                    mediaPlanState.selectedPlan?.type === "opt" ||
                    mediaPlanState.selectedPlan?.type === "sim"
                      ? "18.5px"
                      : "13.5px"
                  }
                >
                  Opt Plan
                </Text>
              </Box>
              <Box position="relative" cursor="pointer">
                <Img
                  src={
                    mediaPlanState.selectedPlan?.type === "sim"
                      ? "/svg/current step.svg"
                      : "/svg/next step.svg"
                  }
                  height="1.8rem"
                />
                <Text
                  position="absolute"
                  color={
                    mediaPlanState.selectedPlan?.type === "sim"
                      ? "primaryRed"
                      : "#DF6261"
                  }
                  fontSize="0.75rem"
                  mr="2rem"
                  width="100%"
                  top="5px"
                  left={
                    mediaPlanState.selectedPlan?.type === "sim"
                      ? "18.5px"
                      : "13.5px"
                  }
                  fontWeight="600"
                >
                  Scenarios
                </Text>
              </Box>
            </Flex>
          </Flex>
          {mediaPlanState.newPlanDetails?.brand ? (
            <Flex alignItems="center" ml="-9rem">
              {showLogo ? (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  height="3.25rem"
                  width="5rem"
                  mr="1rem"
                  bg="white"
                  borderRadius="8px"
                  overflow="hidden"
                >
                  <Img
                    borderRadius="8px"
                    onError={() => setShowLogo(false)}
                    maxH="100%"
                    maxW="90%"
                    src={`/Logos/Brand_Logos/${helper.toTitleCase(
                      mediaPlanState.newPlanDetails?.brand
                    )}.png`}
                  />
                </Flex>
              ) : (
                <Text
                  textTransform="uppercase"
                  mr="1rem"
                  color="white"
                  fontSize="0.9rem"
                >
                  {helper.toTitleCase(mediaPlanState.newPlanDetails?.brand)}
                </Text>
              )}
              {showFlag ? (
                <Img
                  mr="1rem"
                  border="solid 3px #fff"
                  onError={() => setShowFlag(false)}
                  maxH="3.25rem"
                  borderRadius="8px"
                  maxW="5rem"
                  src={`/Logos/Flags/${helper.toTitleCase(
                    mediaPlanState.newPlanDetails?.country
                  )}.png`}
                />
              ) : (
                <Text mr="1rem" color="white" fontSize="0.9rem">
                  {helper.toTitleCase(mediaPlanState.newPlanDetails?.country)}
                </Text>
              )}
              <Text
                textTransform="uppercase"
                mr="1rem"
                color="white"
                fontSize="0.9rem"
              >
                {mediaPlanState.newPlanDetails?.period}
              </Text>
              <Text fontSize="0.9rem" color="white">
                {mediaPlanState.newPlanDetails?.year}
              </Text>
            </Flex>
          ) : (
            <Flex alignItems="center" mr="8rem">
              <Text color="white">New media plan</Text>
            </Flex>
          )}
          <Flex alignItems="center">
            <IconButton
              variant="primary"
              isRound={true}
              icon={<Img src="/svg/world2.svg" />}
            />
            <IconButton
              ml="1.5rem"
              isRound={true}
              icon={<Img src="/svg/Notification.svg" />}
              variant="primary"
            />
            <Menu autoSelect={false}>
              <MenuButton
                as={IconButton}
                ml="1.5rem"
                isRound={true}
                icon={<Img src="/svg/Menu.svg" />}
                variant="primary"
              />
              <MenuList
                zIndex="10"
                border="none"
                position="absolute"
                top="-1.5rem"
                right="-1.5rem"
                py="0rem"
                borderRadius="8px"
                boxShadow="0 2px 2px 0 rgba(0,0,0,0.2)"
              >
                <Box
                  bg="linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)"
                  p="1rem"
                  pb="0.7rem"
                  borderTopRadius="8px"
                >
                  <Flex alignItems="center" mb="1.2rem">
                    <Avatar name={userState.name} bg="primaryRed" mr="0.6rem" />
                    <Box>
                      <Text fontSize="0.9rem">
                        {fullNameToUppercase(userState.name)}
                      </Text>
                      {/* <Text
                        color="primaryRed"
                        textTransform="uppercase"
                        fontSize="0.75rem"
                        letterSpacing="0.01rem"
                      >
                        connections manager
                      </Text> */}
                    </Box>
                  </Flex>
                  {/* <Flex alignItems="center" justifyContent="space-between">
                    <Text
                      color="primaryRed"
                      textTransform="uppercase"
                      fontSize="0.75rem"
                    >
                      last login
                    </Text>
                    <Text fontSize="0.75rem">5:30 PM, 04 / 02 / 2020</Text>
                  </Flex> */}
                </Box>
                <Box p="0.8rem" pb="1.2rem">
                  <MenuItem px="0.5rem" pr="1rem">
                    <Button
                      leftIcon={
                        <Img
                          src="/svg/final scenario badge.svg"
                          boxSize="1.5rem"
                        />
                      }
                      variant="primary"
                      fontWeight="500"
                      width="100%"
                      px="0rem"
                      maxHeight="2.25rem"
                      disabled={!mediaPlanState.selectedPlan.hasExecuted}
                      onClick={() => setShowFinalizeModal(true)}
                    >
                      <Text pl="0.2rem">Finalize Scenario</Text>
                    </Button>
                  </MenuItem>
                  <BetaTagWrapper type="coming">
                    <MenuItem
                      icon={<Img src="/svg/share.svg" mr="-0.2rem" />}
                      fontSize="0.9rem"
                      px="1.8rem"
                      pr="1rem"
                      py="0.5rem"
                    >
                      Share Plan
                    </MenuItem>
                  </BetaTagWrapper>
                  <MenuItem
                    onClick={() => router.push("/users")}
                    icon={<Img src="/svg/user management.svg" mr="-0.1rem" />}
                    fontSize="0.9rem"
                    px="1.8rem"
                    pr="1rem"
                    py="0.5rem"
                  >
                    User Management
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => router.push("/data-management")}
                    icon={<Img src="/svg/data management.svg" mr="0.15rem" />}
                    fontSize="0.9rem"
                    px="1.8rem"
                    pr="1rem"
                    py="0.5rem"
                  >
                    Data Management
                  </MenuItem> */}
                  <MenuItem
                    icon={<Img src="/svg/Logout.svg" mr="0.15rem" />}
                    fontSize="0.9rem"
                    px="1.8rem"
                    pr="1rem"
                    py="0.5rem"
                    onClick={() => {
                      userDispatch.logoutUser();
                      router.push("/");
                    }}
                  >
                    Logout
                  </MenuItem>
                </Box>
              </MenuList>
            </Menu>
          </Flex>
          <Box
            position="absolute"
            height="100%"
            width="22.5rem"
            right="0"
            zIndex="-1"
            bgImage="url(/png/gra_header.png)"
            bgSize="100% 100%"
          ></Box>
        </Container>
      </Section>
      {showFinalizeModal && (
        <FinalizeScenarioModal
          setShowFinalizeModal={setShowFinalizeModal}
          setFinalized={setFinalized}
        />
      )}
    </>
  );
};

export default Navigation;

const fullNameToUppercase = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
