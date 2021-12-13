import React from "react";
import styled from "@emotion/styled";
import { Box, Img, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Select, { components } from "react-select";
import { Controller } from "react-hook-form";
import CheckBox from "../FormComponents/CompareDropdownCheckbox";

const CustomOption = ({ isSelected, ...props }) => {
  const { data, innerRef, innerProps } = props;
  const router = useRouter();
  return data.button ? (
    <Box ref={innerRef} {...innerProps} width="80%" mt="0.5rem">
      <Button
        variant="primary"
        leftIcon={<Img src="/svg/adjustments.svg" />}
        height="2rem"
        py="0.5rem"
        px="1rem"
        fontSize="0.9rem"
        fontWeight="500"
        width="100%"
        onClick={() => router.push("/compare-scenario")}
      >
        Compare
      </Button>
    </Box>
  ) : isSelected ? (
    <CheckBox select name={props.data.label} />
  ) : (
    <CheckBox name={props.data.label} />
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Img src="./svg/dropdown 2.svg" />
    </components.DropdownIndicator>
  );
};

const StyledSelect = styled(Select)`
  .Select__control {
    background: #f2f2f2 !important;
    border: none;
    height: ${(props) => (props.height ? props.height : "35px")};
    width: 7rem;
    padding-left: ${(props) => (props.pl ? props.pl : "0.25rem")};
    cursor: pointer;
  }

  .Select__control:hover {
    outline: 0px;
    border: none;
  }

  .Select__control--is-focused {
    outline: 0px;
    border: none !important;
    box-shadow: none !important;
  }

  .Select__placeholder {
    letter-spacing: 1px;
    background: "#f2f2f2";
    color: black;
    font-size: 0.7rem;
  }

  .Select__value-container {
    height: 2.5rem;
    width: 6rem;
  }

  .Select__option--is-focused {
    background-color: #f3eee8;
    border-radius: 4px;
    outline: 0px;
    box-shadow: none !important;
  }

  .Select__option--is-selected {
    background-color: ${(props) => (props.multipleColumns ? "white" : "white")};
    border-radius: 4px;
    border: ${(props) => (props.multipleColumns ? "none" : "none")};
    color: ${(props) => (props.multipleColumns ? "black" : "black")};
  }

  .Select__menu-list {
    padding-left: 0.5rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    width: 11rem;
    height: auto;
    padding-top: 0.5rem;
  }

  .Select__menu {
    width: 11rem;
    margin-top: -0.8rem;
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
`;

function CompareDropdown({
  name,
  control,
  options,
  label,
  value,
  placeholder,
  boxProps,
  labelProps,

  ...props
}) {
  return (
    <>
      <Controller
        render={({ field }) => (
          <Box {...boxProps}>
            <StyledSelect
              removeSelected={false}
              isOptionSelected={{ border: "2px solid aqua" }}
              components={{ DropdownIndicator, Option: CustomOption }}
              classNamePrefix="Select"
              placeholder={placeholder}
              options={options}
              isSearchable={false}
              background="#f2f2f2"
              {...props}
              {...field}
            />
          </Box>
        )}
        name={name}
        control={control}
      />
    </>
  );
}

export default CompareDropdown;
