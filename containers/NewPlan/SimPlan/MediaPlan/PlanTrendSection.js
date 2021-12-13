import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Page } from "@/components/library";
import { Box, Flex, Text } from "@chakra-ui/react";

import EditorDropdown from "@/components/FormComponents/EditorDropdown";
import { Tabs } from "@/components/FormComponents";
import StackedChart from "components/NewPlan/SimPlan/MediaPlan/PlanTrendBrandChart";
import BrandWeekly from "components/NewPlan/SimPlan/MediaPlan/PlanTrendBrandChartWeekly";
import VehicleMonthlyChart from "components/NewPlan/SimPlan/MediaPlan/VehicleMonthlyChart";
import VehicleWeeklyChart from "components/NewPlan/SimPlan/MediaPlan/VehicleWeeklyChart";

const PlanTrendSection = () => {
  const [duration, setDuration] = useState("Monthly");
  const { control, watch } = useForm({
    defaultValues: {
      type: "Brand",
      duration: "Monthly",
    },
  });

  const planTypeValue = watch("type");

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
        </Box>{" "}
        <Box width="72px" />
      </Flex>

      {planTypeValue === "Format" && (
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
      )}

      <Box width="100%" mt="2rem" mb="1rem">
        {duration === "Monthly" ? (
          planTypeValue === "Brand" ? (
            <StackedChart dependencies={[duration]} name="stackChart" />
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
          {["Monthly", "Weekly"].map((option, i) => (
            <Box
              cursor="pointer"
              key={i}
              px="1rem"
              py="0.3rem"
              borderLeftRadius={i === 0 && "8px"}
              borderRightRadius={i === 1 && "8px"}
              border={
                duration === option ? "solid 1px #B27831" : "solid 1px #cccccc"
              }
              borderLeft={
                duration === option
                  ? "solid 1px #B27831"
                  : ["Monthly", "Weekly"][i - 1]
                  ? "none"
                  : "solid 1px #cccccc"
              }
              color={option === duration ? "" : "darkGray"}
              bg={
                duration === option
                  ? "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)"
                  : "transparent"
              }
              onClick={() => {
                if (duration === option) {
                  null;
                }
                setDuration(option);
              }}
              fontSize="0.875rem"
            >
              {option}
            </Box>
          ))}
        </Flex>
      </Flex>
    </Page>
  );
};

export default PlanTrendSection;
