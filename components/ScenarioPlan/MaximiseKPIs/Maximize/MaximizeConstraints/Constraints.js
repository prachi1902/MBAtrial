import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";

import { Container, Section, Page } from "@/components/library";
import {
  InputBudget,
  Tabs,
  Slider2,
  SelectDropdown,
} from "@/components/FormComponents";
import VehicleTable from "./VehicleTable";
import SpendOverride from "./SpendOverride";
import VehicleOverride from "./VehicleOverride";
import FormatOverride from "./FormatOverride";

const Constraints = () => {
  const [tab, setTab] = useState("General");
  const [overrideTab, setOverrideTab] = useState("Vehicle");

  const { watch, control } = useForm({
    defaultValues: {
      constraintTab: "General",
      overrideTabs: "Vehicle",
    },
  });

  const tabValue = watch("constraintTab");
  const overrideTabValue = watch("overrideTabs");

  useEffect(() => {
    if (tabValue !== tab) {
      setTab(tabValue);
    }
  }, [tabValue]);

  useEffect(() => {
    if (overrideTabValue !== overrideTab) {
      setOverrideTab(overrideTabValue);
    }
  }, [overrideTabValue]);

  return (
    <Section as="section" mt="1rem">
      <Page bg={tab === "General" ? "#f8f8f8" : "white"} pt="1.5rem">
        <Flex
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          position="relative"
          px="1.5rem"
          mb="1.5rem"
        >
          <Text>Maximization Constraints</Text>
          <Box position="absolute" left="50%" transform="translateX(-50%)">
            <Tabs
              options={["General", "Overrides"]}
              name="constraintTab"
              control={control}
            />
          </Box>
        </Flex>

        {tab === "General" ? (
          <Flex
            width="100%"
            px="1.5rem"
            py="1rem"
            pb="2.5rem"
            alignItems="center"
          >
            <Box width="60%" margin="auto">
              <Box width="67%" margin="auto" ml="9rem">
                <Text mb="2.5rem">Define Vehicle Spend Range</Text>
                <Slider2 />
              </Box>
            </Box>
            <Box width="40%" margin="auto">
              <Box width="60%" margin="auto">
                <Text mb="1rem">Minimum Weekly Reach (%)</Text>
                <InputBudget
                  flexProps={{ height: "60px", width: "66%", margin: "0" }}
                  flexInsideProps={{ width: "100%" }}
                  inputProps={{ width: "100%", border: "none" }}
                />
              </Box>
            </Box>
          </Flex>
        ) : (
          <>
            <Box
              bg="#f2f2f2"
              p="1rem"
              width="98.5%"
              margin="auto"
              mb="1rem"
              borderRadius="4px"
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                position="relative"
                mb="1rem"
                px="0.5rem"
                pt="0.7rem"
              >
                <Text>New Override</Text>
                <Box
                  position="absolute"
                  left="50%"
                  transform="translateX(-50%)"
                >
                  <Tabs
                    options={["Vehicle", "Format"]}
                    name="overrideTabs"
                    control={control}
                  />
                </Box>
                <Flex>
                  {overrideTab === "Format" && (
                    <Button
                      variant="seconday"
                      leftIcon={<Img src="/svg/reset.svg" mr="0.3rem" />}
                      fontWeight="500"
                      maxHeight="2.25rem"
                      bg="#dddddd"
                      mr="1rem"
                    >
                      Clear
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    leftIcon={<Img src="/svg/save.svg" mr="0.3rem" />}
                    fontWeight="500"
                    maxHeight="2.25rem"
                  >
                    Save
                  </Button>
                </Flex>
              </Flex>
              {overrideTab === "Vehicle" ? (
                <VehicleOverride />
              ) : (
                <FormatOverride />
              )}
            </Box>
            <SpendOverride />
          </>
        )}
      </Page>
    </Section>
  );
};

export default Constraints;
