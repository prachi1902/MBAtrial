import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Section, Page } from "@/components/library";
import { Box, Flex, Text, Img, Button } from "@chakra-ui/react";

import WeeklySpend from "./WeeklySpend";
import WOASettings from "./WOASettings";
import NewScenarioModal from "./NewScenarioModal";
import UnlockVehiclesModal from "./UnlockVehiclesModal";

const ResponseCurves = () => {
  const { control } = useForm();
  const tabs = ["Volume", "Reach", "ROI", "Custom"];
  const [tab, setTab] = useState("Volume");
  const [woaSettings, setWoaSettings] = useState(false);
  const [newScenarioModal, setNewScenarioModal] = useState(false);
  const [unlockVehiclesModal, setUnlockVehiclesModal] = useState(false);

  return (
    <>
      <Page py="1rem" boxShadow="none" mb="-1.5rem">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          position="relative"
          pt="0.5rem"
          px="1.5rem"
        >
          <Text>Response Curves</Text>
          <Text
            fontStyle="italic"
            color="darkGray"
            fontSize="0.9rem"
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
          >
            Move spend points for each vehicle along the response curve
          </Text>
          <Flex alignItems="center">
            <Button
              variant="secondary"
              leftIcon={<Img src="/svg/reset.svg" />}
              mr="1rem"
              fontWeight="500"
              fontSize="0.9rem"
            >
              Reset to Opt Mix
            </Button>
            <Button
              variant="primary"
              leftIcon={<Img src="/svg/add.svg" />}
              fontWeight="500"
              fontSize="0.9rem"
              onClick={() => setNewScenarioModal(true)}
            >
              Create New Scenario
            </Button>
          </Flex>
        </Flex>

        <Flex
          py="0.5rem"
          alignItems="center"
          justifyContent="space-between"
          px="1.5rem"
          pb="1rem"
        >
          <Flex>
            {tabs.map((data, i) => (
              <Button
                key={i}
                variant={tab === data ? "primary" : "basic"}
                onClick={() => {
                  if (tab === data) {
                    null;
                  } else {
                    setTab(data);
                  }
                }}
                size="sm"
                border={tab === data ? "solid 1px #B27831" : "none"}
                color={tab === data ? "buttonText" : "darkGray"}
                boxShadow="none"
                fontWeight="normal"
                borderRadius="4px"
              >
                {data}
              </Button>
            ))}
          </Flex>
          <Flex alignItems="center" mr="0.5rem">
            <Img src="/svg/warning.svg" mr="0.5rem" />
            <Box color="primaryRed">
              <Text textTransform="uppercase" fontSize="0.8rem" mb="0.05rem">
                warning
              </Text>
              <Text fontSize="0.75rem">Above budget by $ 70,000</Text>
            </Box>
          </Flex>
        </Flex>

        <Img src="/png/51-graph.png" margin="auto" />

        <Flex
          alignItems="center"
          justifyContent="flex-end"
          position="relative"
          px="1.5rem"
          py="1rem"
          pt="0.5rem"
        >
          <Text
            fontStyle="italic"
            color="darkGray"
            fontSize="0.9rem"
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
          >
            Select vehicles to plot on response curve. Lock vehicles that are
            not to be modified.
          </Text>
          <Button
            variant="secondary"
            leftIcon={<Img src="/svg/date.svg" />}
            fontWeight="500"
            onClick={() => setWoaSettings(true)}
          >
            WoA Settings
          </Button>
        </Flex>

        <WeeklySpend />
      </Page>
      {woaSettings && <WOASettings setWoaSettings={setWoaSettings} />}
      {newScenarioModal && (
        <NewScenarioModal
          setNewScenarioModal={setNewScenarioModal}
          setUnlockVehiclesModal={setUnlockVehiclesModal}
        />
      )}
      {unlockVehiclesModal && (
        <UnlockVehiclesModal setUnlockVehiclesModal={setUnlockVehiclesModal} />
      )}
    </>
  );
};

export default ResponseCurves;
