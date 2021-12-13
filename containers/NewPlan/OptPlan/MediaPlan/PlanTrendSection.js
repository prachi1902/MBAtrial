import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Page } from "@/components/library";
import { Box, Flex, Text } from "@chakra-ui/react";

import EditorDropdown from "@/components/FormComponents/EditorDropdown";
import { Tabs } from "@/components/FormComponents";
import StackedChart from "components/NewPlan/OptPlan/MediaPlan/PlanTrendBrandChart";
import BrandWeekly from "components/NewPlan/OptPlan/MediaPlan/PlanTrendBrandChartWeekly";
import VehicleMonthlyChart from "components/NewPlan/OptPlan/MediaPlan/VehicleMonthlyChart";
import VehicleWeeklyChart from "components/NewPlan/OptPlan/MediaPlan/VehicleWeeklyChart";

const PlanTrendSection = () => {
  const { control, watch } = useForm({
    defaultValues: {
      type: "Brand",
      duration: "Monthly",
    },
  });

  const [planTypeValue, duration] = watch(["type", "duration"]);

  return (
    <Page py="1rem" boxShadow="none" mb="-1.5rem">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        position="relative"
        pt="0.5rem"
        px="1.5rem"
      >
        <Text>Plan Trend</Text>
        <Box position="relative">
          <Text
            borderRadius="5px"
            color="white"
            top="-15px"
            right="-25px"
            position="absolute"
            px="0.5rem"
            py="0.1rem"
            bg="#6D7278"
            mb="1rem"
            fontSize="0.875rem"
          >
            Coming Soon
          </Text>
          <Tabs
            disabled={["Format"]}
            options={["Brand", "Vehicle", "Format"]}
            height="32px"
            fontSize="0.875rem"
            name="type"
            control={control}
          />
        </Box>
        <Box width="72px" />
      </Flex>

      {/* {planTypeValue === "Format" && (
        <Flex alignItems="center" justifyContent="center" mt="1rem">
          <EditorDropdown
            label="vehicle"
            placeholder="Select"
            name="format-vehicle"
            control={control}
            options={[
              { label: "Social Media", value: "mex" },
              { label: "Facebook", value: "ger" },
            ]}
            boxProps={{
              display: "flex",
              alignItems: "center",
              mr: "1rem",
            }}
            labelProps={{ variant: "bold" }}
            pl="0rem"
            pr="0rem"
            fontSize="0.9rem"
          />
          <EditorDropdown
            label="sub-vehicle"
            placeholder="Select"
            name="format-sub-vehicle"
            control={control}
            options={[
              { label: "Social Media", value: "mex" },
              { label: "Facebook", value: "ger" },
            ]}
            boxProps={{
              display: "flex",
              alignItems: "center",
              mr: "1rem",
            }}
            labelProps={{ variant: "bold" }}
            pl="0rem"
            pr="0rem"
            fontSize="0.9rem"
          />
          <EditorDropdown
            label="format"
            placeholder="Select"
            name="format"
            control={control}
            options={[
              { label: "Social Media", value: "mex" },
              { label: "Facebook", value: "ger" },
            ]}
            boxProps={{
              display: "flex",
              alignItems: "center",
              mr: "1rem",
            }}
            labelProps={{ variant: "bold" }}
            pl="0rem"
            pr="0rem"
            fontSize="0.9rem"
          />
        </Flex>
      )} */}

      <Box width="100%" mt="2rem" mb="1rem">
        {duration === "Monthly" ? (
          planTypeValue === "Brand" ? (
            <StackedChart name="stackChart" />
          ) : planTypeValue === "Vehicle" ? (
            <VehicleMonthlyChart name="vehicleChartMonthly" />
          ) : null
        ) : planTypeValue === "Brand" ? (
          <BrandWeekly name="brandWeekly" />
        ) : (
          <VehicleWeeklyChart name="vehicleWeekly" />
        )}
      </Box>

      <Flex pt="0.8rem" alignItems="center" justifyContent="center">
        <Flex>
          <Tabs
            options={["Monthly", "Weekly"]}
            height="32px"
            fontSize="0.875rem"
            name="duration"
            control={control}
          />
        </Flex>
      </Flex>
    </Page>
  );
};

export default PlanTrendSection;
