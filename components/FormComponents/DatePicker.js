import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

import { FormLabel, Box, Img } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatepicker = ({ label, boxProps, name, control }) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          <Box position="relative" mr="1rem" {...boxProps}>
            <FormLabel variant="bold">{label}</FormLabel>
            <DatePicker selected={field.value} {...field} />
            <Img src="/svg/date.svg" position="absolute" right="8%" top="50%" />
          </Box>
        );
      }}
      name={name}
      control={control}
    />
  );
};

export default CustomDatepicker;
