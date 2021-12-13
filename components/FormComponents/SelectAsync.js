import React from "react";
import styled from "@emotion/styled";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { Box, Img, FormLabel } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

import Error from "./ErrorMessage";

const StyledSelect = styled(AsyncSelect)`
  .Select__control {
    height: ${(props) => (props.height ? props.height : "35px")};
    width: ${(props) => (props.width ? props.width : "100%")};
    border: ${(props) => (props.border ? props.border : "1px solid #cccccc")};
    border-radius: 5px;
    /* padding-left: ${(props) => (props.pl ? props.pl : "0.5rem")}; */
    /* padding-right: ${(props) => (props.pr ? props.pr : "0.5rem")}; */
    cursor: pointer;
    font-size: 14px;
    background-color: ${(props) =>
      props.backgroundColor ? props.backgroundColor : "white"};
  }

  .Select__control:hover {
    outline: 0px;
    border: 1px solid;
    border-color: #cccccc !important;
  }

  .Select__control--is-focused {
    outline: 0px;
    border: ${(props) =>
      props.onFocusBorder ? props.onFocusBorder : "1px solid #cccccc"};
    box-shadow: none !important;
  }

  .Select__menu-list {
    border-radius: 4px;
    padding: 0.5rem;
  }

  .Select__option {
    text-transform: ${(props) => (props.capitalizeLabel ? "uppercase" : "")};
  }

  .Select__control:hover {
    border-color: gray;
  }

  .Select__option--is-focused {
    background-color: #f3eee8;
    border-radius: 4px;
  }

  .Select__control--menu-is-open {
    border: ${(props) =>
      props.onFocusBorder ? props.onFocusBorder : "1px solid #cccccc"};
  }

  .Select__option--is-selected {
    background-color: ${(props) =>
      props.selectedBg ? props.selectedBg : "#821e1c"};
    border-radius: 4px;
    color: ${(props) => (props.selectedText ? props.selectedText : "white")};
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__menu {
    color: #3c3d3e;
    z-index: 999;
    min-width: 100%;
    width: ${(props) => (props.menuListWidth ? props.menuListWidth : "auto")};
  }

  .Select__clear-indicator {
    display: ${(props) => (props.noValues ? "none" : "flex")};
  }

  .Select__multi-value__remove {
    background-color: transparent !important;
  }
  .Select__multi-value {
    background: linear-gradient(180deg, #fcd5a5 0%, #f9aa4a 100%);
    border-radius: 10px;
    padding: 0px 4px;
  }
`;

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Img src="/svg/dropdown 2.svg" />
    </components.DropdownIndicator>
  );
};

const AsyncSelectDropdown = ({
  name,
  control,
  options = [],
  label,
  placeholder,
  multiSelect = false,
  boxProps,
  rules = {},
  labelProps,
  errors = [],
  disabled = false,
  capitalizeLabel = false,
  optionLabel = "label",
  optionValue = "value",
  ...props
}) => {
  return (
    <>
      <Controller
        render={({ field }) => (
          <Box {...boxProps}>
            {label && <FormLabel {...labelProps}>{label}</FormLabel>}
            <StyledSelect
              components={{ DropdownIndicator }}
              classNamePrefix="Select"
              placeholder={placeholder}
              options={options}
              isSearchable={false}
              isMulti={multiSelect}
              isDisabled={disabled}
              menuPlacement="auto"
              controlShouldRenderValue={!props.noValues}
              capitalizeLabel={capitalizeLabel}
              getOptionLabel={(option) => option[optionLabel]}
              getOptionValue={(option) => option[optionValue]}
              {...props}
              {...field}
            />
          </Box>
        )}
        rules={rules}
        name={name}
        control={control}
      />
      <Error name={name} errors={errors} />
    </>
  );
};

export default AsyncSelectDropdown;
