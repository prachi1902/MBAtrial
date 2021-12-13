import React from "react";
import { useForm } from "react-hook-form";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";

import {
  InputBudget,
  Tabs,
  SelectDropdown,
  CustomDatepicker,
} from "@/components/FormComponents";

const VehicleOverride = () => {
  const { control, watch } = useForm();

  return (
    <Flex width="83.5%" margin="auto" as="form">
      <SelectDropdown
        label="vehicle"
        placeholder="Select"
        name="country"
        control={control}
        options={[]}
        boxProps={{ width: "16%", mr: "1rem" }}
        labelProps={{ variant: "bold" }}
        pl="0rem"
        pr="0rem"
        fontSize="0.9rem"
        height="55px"
      />
      <SelectDropdown
        label="sub-vehicle"
        placeholder="Select"
        name="brand"
        control={control}
        options={[]}
        boxProps={{ width: "16%", mr: "1rem" }}
        labelProps={{ variant: "bold" }}
        pl="0rem"
        pr="0rem"
        fontSize="0.9rem"
        height="55px"
      />
      <CustomDatepicker
        label="start date"
        boxProps={{ width: "16%" }}
        name="startDate"
        control={control}
      />
      <CustomDatepicker
        label="end date"
        boxProps={{ width: "16%" }}
        name="endDate"
        control={control}
      />
      <InputBudget
        label="min spend change (%)"
        labelProps={{ variant: "bold" }}
        placeholder="Enter Min Spend %"
        height="55px"
        mr="1rem"
        width="16%"
      />
      <InputBudget
        label="max spend change (%)"
        labelProps={{ variant: "bold" }}
        placeholder="Enter Max Spend %"
        height="55px"
        width="16%"
      />
    </Flex>
  );
};

export default VehicleOverride;
