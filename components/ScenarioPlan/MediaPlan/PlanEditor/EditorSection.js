import React from "react";
import { useForm } from "react-hook-form";
import { Flex, Text, Img, Box, Button } from "@chakra-ui/react";

import { Page } from "../../../library";
import { Tabs, EditorDropdown, NewSwitch } from "@/components/FormComponents";
import StackedChart from "@/components/common/StackedChart";
import LineAreaChart from "@/components/common/LineAreaChart";

function EditorSection() {
  const { control, watch } = useForm({
    defaultValues: {
      type: "Brand",
      duration: "Monthly",
    },
  });

  const planTypeValue = watch("type");
  const durationValue = watch("duration");

  return (
    <Page py="0.5rem" px="1rem" boxShadow="none" mb="-1.5rem" width="100%">
      <Flex align="flex-end" justifyContent="space-between">
        <Text>Plan Editor</Text>
        <Box position="absolute" left="50%" transform="translateX(-50%)">
          <Tabs
            options={["Brand", "Vehicle", "Format"]}
            height="32px"
            fontSize="0.875rem"
            name="type"
            control={control}
          />
        </Box>
        <Flex>
          <NewSwitch
            name="editorSwitch"
            control={control}
            options={["ALGO", "MANUAL"]}
            textProps={{ fontSize: "0.8rem", fontWeight: "500" }}
            defColor="primaryRed"
            gold={false}
            pr={0}
          />
          <Button
            variant="primary"
            leftIcon={<Img src="/svg/run plan.svg" />}
            height="2.3rem"
            fontSize="0.9rem"
            fontWeight="500"
            mr="0.6rem"
            ml="1rem"
          >
            Simulate
          </Button>
        </Flex>
      </Flex>

      {planTypeValue === "Brand" && null}

      {planTypeValue === "Vehicle" && (
        <Flex alignItems="center" margin="auto" width="max-content" mt="1rem">
          <EditorDropdown
            label="vehicle"
            placeholder="Select"
            name="vehicle"
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
            labelProps={{ variant: "bold", fontSize: "0.8rem" }}
            pl="0rem"
            pr="0rem"
            fontSize="0.9rem"
          />
          <EditorDropdown
            label="sub-vehicle"
            placeholder="Select"
            name="sub-vehicle"
            control={control}
            options={[
              { label: "Social Media", value: "mex" },
              { label: "Facebook", value: "ger" },
            ]}
            boxProps={{
              display: "flex",
              alignItems: "center",
            }}
            labelProps={{ variant: "bold", fontSize: "0.8rem" }}
            pl="0rem"
            pr="0rem"
            fontSize="0.9rem"
          />
        </Flex>
      )}

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

      <Box my="1rem" width="100%">
        {durationValue === "Monthly" ? (
          planTypeValue === "Brand" ? (
            <StackedChart
              name="stackChart"
              dependencies={[planTypeValue, durationValue]}
            />
          ) : planTypeValue === "Vehicle" ? (
            <LineAreaChart
              name="vehicleChart"
              dependencies={[planTypeValue, durationValue]}
            />
          ) : planTypeValue === "Format" ? (
            <LineAreaChart
              name="formatChart"
              dependencies={[planTypeValue, durationValue]}
            />
          ) : null
        ) : (
          <LineAreaChart
            name="weeklyChart"
            dependencies={[planTypeValue, durationValue]}
          />
        )}
      </Box>

      <Flex
        mt="0.8rem"
        alignItems="center"
        px="0.7rem"
        width="100%"
        justifyContent="space-between"
        position="relative"
      >
        <Box></Box>
        <Box position="absolute" left="50%" transform="translateX(-50%)">
          <Tabs
            height="32px"
            fontSize="0.875rem"
            name="duration"
            control={control}
            options={["Monthly", "Weekly"]}
          />
        </Box>
        <Text fontStyle="italic" color="gray" fontSize="0.87rem">
          Move spend points to edit the plan
        </Text>
      </Flex>
    </Page>
  );
}

export default EditorSection;
