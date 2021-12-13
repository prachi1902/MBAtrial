import React from "react";
import styled from "@emotion/styled";
// import styled from "styled-components";

import Select, { components } from "react-select";
import { Box, Img, FormLabel } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const StyledSelect = styled(Select)`
  .Select__control {
    height: ${(props) => (props.height ? props.height : "35px")};
    min-height: ${(props) => (props.minHeight ? props.minHeight : "35px")};
    width: ${(props) => (props.width ? props.width : "100%")};
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

  .Select__menu-list {
    padding: 0.5rem;
  }

  .Select__control:hover {
    border-color: gray;
  }

  .Select__placeholder {
    color: "black"
    font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
  }

  .Select__value-container {
    height: ${(props) => (props.inputHeight ? props.inputHeight : "auto")};
    padding-top: ${(props) => (props.containerPt ? props.containerPt : "2px")};
    padding-bottom: ${(props) =>
      props.containerPb ? props.containerPb : "2px"};
  }

  .Select__option--is-focused {
    background-color: #f3eee8;
    border-radius: 4px;
    outline: 0px;
    box-shadow: none !important;
  }

  .Select__option--is-selected {
    background-color: #c7dfd7;
    border-radius: 4px;
    border: 1px solid #88b8a9;
    color: inherit;
  }

  .Select__menu-list {
    border-radius: 4px;
  }

  .Select__menu {
    width: ${(props) => (props.menuWidth ? props.menuWidth : "100%")};
    margin-top: ${(props) => (props.multipleColumns ? "-10px" : "0px")};
    background: ${(props) => (props.multipleColumns ? "#e6e6e6" : "white")};
    border: ${(props) =>
      props.multipleColumns ? "2px solid white" : "inherit"};
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__indicator Select__dropdown-indicator {
    padding: ${(props) =>
      props.dropdownPadding ? props.dropdownPadding : "8px"};
  }

  .Select__menu {
    color: #3c3d3e;
  }

  .Select__option {
    font-size: 0.9rem;
    padding: 6px 16px;
  }
`;

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Img src="./svg/dropdown 2.svg" />
    </components.DropdownIndicator>
  );
};

const SelectDropdownInviteUser = ({
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
          />
        </Box>
      )}
      name={name}
      control={control}
    />
  );
};

export default SelectDropdownInviteUser;
