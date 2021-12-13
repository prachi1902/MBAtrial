import React from "react";
import NumberFormat from "react-number-format";
import { Box, FormLabel } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Controller } from "react-hook-form";

import Error from "./ErrorMessage";

export const StyledInput = styled(NumberFormat)`
  border: solid 1px;
  border-color: ${(props) => (props.borderColor ? props.borderColor : "#ccc")};
  border-radius: 5px;
  width: 100%;
  height: 100%;
  padding-left: 0.5rem;
  font-size: 0.875rem;
  &::placeholder {
    color: #bbb;
  }
  &:focus {
    box-shadow: none !important;
    outline: 0;
    border: solid 1px #ccc !important;
  }
`;

const FormatInput = ({
  label,
  errors = [],
  placeholder,
  disabled = false,
  name,
  control,
  rules,
  height = "38px",
  prefix = "$",
  suffix = "",
  boxProps,
  inputStyles,
  borderColor,
  defaultValue = "",
  allowNegative = false,
}) => {
  return (
    <Box {...boxProps}>
      {label && <FormLabel>{label}</FormLabel>}
      <Controller
        render={({ field }) => (
          <Box height={height}>
            <StyledInput
              thousandSeparator={true}
              prefix={prefix}
              suffix={suffix}
              allowNegative={allowNegative}
              isNumericString={true}
              inputmode="numeric"
              onValueChange={(values) => {
                const { floatValue } = values;
                field.onChange(floatValue);
              }}
              defaultValue={defaultValue}
              style={{ ...inputStyles }}
              value={field.value}
              ref={field.ref}
              onBlur={field.onBlur}
              disabled={disabled}
              placeholder={placeholder}
              borderColor={borderColor}
            />
          </Box>
        )}
        rules={rules}
        name={name}
        control={control}
      />
      <Error name={name} errors={errors} />
    </Box>
  );
};

FormatInput.displayName = "FormatInput";

export default FormatInput;
