import React from "react";
import { Controller } from "react-hook-form";
import ReactSwitch from "react-switch";

import { Flex, Text, Img } from "@chakra-ui/react";

const Switch = ({ name, control, options, textProps, defColor = "black" }) => {
  return (
    <Controller
      render={({ field }) => (
        <Flex alignItems="center" css={{ lineHeight: 0 }}>
          {options && (
            <Text
              color={field.value === options[0] ? defColor : "darkGray"}
              fontWeight={field.value === options[0] ? "600" : "500"}
              fontSize="0.75rem"
              mr="0.5rem"
              {...textProps}
            >
              {options[0]}
            </Text>
          )}
          <ReactSwitch
            checked={
              options ? field.value === options[1] : field.value === true
            }
            onColor=""
            offColor=""
            uncheckedIcon={false}
            checkedIcon={false}
            checkedHandleIcon={<Img src="/svg/toggle_circle_yellow.svg" />}
            uncheckedHandleIcon={<Img src="/svg/toggle_circle_yellow.svg" />}
            height={14}
            handleDiameter={6}
            width={22}
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
          />
          {options && (
            <Text
              ml="0.5rem"
              color={field.value === options[1] ? defColor : "darkGray"}
              fontWeight={field.value === options[1] ? "600" : "500"}
              fontSize="0.75rem"
              {...textProps}
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

export default Switch;
