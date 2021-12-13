import React from "react";
import styled from "@emotion/styled";

import Select, { components } from "react-select";
import { Box, Img, FormLabel } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const StyledSelect = styled(Select)`
  .Select__control {
    max-height: ${(props) => (props.height ? props.height : "35px")};
    width: ${(props) => (props.width ? props.width : "13rem")};
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding-left: ${(props) => (props.pl ? props.pl : "0.25rem")};
    padding-right: ${(props) => (props.pr ? props.pr : "0.5rem")};
    cursor: pointer;
  }

  .Select__control:hover {
    outline: 0px;
    border: 1px solid;
    border-color: #cccccc !important;
  }
  .Select__control--is-focused {
    outline: 0px;
    border: 1px solid #cccccc;
    box-shadow: none !important;
  }

  .Select__placeholder {
    outline: none;
    border: none;
    margin-right: 2rem;
    color: ${(props) => (props.color ? props.color : "black")};
    font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
  }

  .Select__value-container {
    width: 7rem;
    outline: none;
    border: none;
    height: ${(props) => (props.inputHeight ? props.inputHeight : "auto")};
  }

  .Select__option--is-selected {
    background-color: ${(props) =>
      props.multipleColumns ? "#c7dfd7" : "#821e1c"};
    border-radius: 4px;
    color: ${(props) => (props.multipleColumns ? "inherit" : "white")};
    outline: none;
    border: none;
  }

  .Select__menu-list {
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .Select__menu {
    width: ${(props) => (props.menuWidth ? props.menuWidth : "145%")};
    margin-top: ${(props) => (props.multipleColumns ? "-10px" : "0px")};
    background: ${(props) => (props.multipleColumns ? "#e6e6e6" : "white")};
    border: ${(props) =>
      props.multipleColumns ? "2px solid white" : "inherit"};
  }

  .Select__option {
    width: ${(props) => (props.multipleColumns ? "50%" : "100%")};
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__menu {
    color: #3c3d3e;
  }

  .Select__indicator Select__dropdown-indicator {
    padding: 6px 12px 6px 6px;
  }
`;

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props} paddingRight="12px">
      <Img src="/svg/dropdown 2.svg" />
    </components.DropdownIndicator>
  );
};

const EditorDropdown = ({
  name,
  control,
  options,
  label,
  value,
  placeholder,
  boxProps,
  labelProps,
  ...props
}) => {
  return (
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
            {...props}
            {...field}
            onChange={(value) => {
              if (field.value !== value) {
                field.onChange(value);
              }
            }}
          />
        </Box>
      )}
      name={name}
      control={control}
    />
  );
};

export default EditorDropdown;
