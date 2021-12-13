import React from "react";
import { Controller } from "react-hook-form";
import ReactSwitch from "react-switch";

import { Flex, Text, Img } from "@chakra-ui/react";
import styled from "@emotion/styled";

const NewPlanSwitch = styled(ReactSwitch)`
  .react-switch-bg {
    background: transparent !important;
    border: solid 2px #811b1a;
  }
  .react-switch-handle {
    background-color: transparent;
    box-shadow: none !important;
  }
`;

const NewSwitch = ({ name, control, options, flexProps, ...props }) => {
  return (
    <Controller
      render={({ field }) => (
        <Flex alignItems="center" {...flexProps}>
          {options && (
            <Text
              color={field.value === options[0] ? "black" : "darkGray"}
              fontWeight={field.value === options[0] ? "500" : "400"}
              fontSize="0.875rem"
              mr="0.5rem"
            >
              {options[0]}
            </Text>
          )}
          <NewPlanSwitch
            checked={
              options ? field.value === options[1] : field.value === true
            }
            onColor="#fff"
            offColor="#fff"
            uncheckedIcon={false}
            checkedIcon={false}
            checkedHandleIcon={<Img src="/svg/toggle_circle.svg" />}
            uncheckedHandleIcon={<Img src="/svg/toggle_circle.svg" />}
            height={14.5}
            handleDiameter={8}
            width={24}
            className="react-switch"
            {...field}
            onChange={(e) => {
              if (options) {
                if (e) {
                  field.onChange(options[1]);
                } else {
                  field.onChange(options[0]);
                }
              } else {
                field.onChange(e);
              }
            }}
            {...props}
          />
          {options && (
            <Text
              ml="0.5rem"
              fontWeight={field.value === options[1] ? "500" : "400"}
              color={field.value === options[1] ? "black" : "darkGray"}
              fontSize="0.875rem"
            >
              {options[1]}
            </Text>
          )}
        </Flex>
      )}
      name={name}
      control={control}
      defaultValue={options ? options[0] : true}
    />
  );
};

export default NewSwitch;
