import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const TabsMultiSelect = ({
  options,
  name,
  control,
  disabled,
  flexProps,
  ...props
}) => {
  const [selected, setSelected] = useState([]);
  return (
    <Controller
      render={({ field }) => {
        return (
          <Flex ref={field.ref} name={field.name} {...flexProps}>
            {options.map((option, i) => (
              <Box
                cursor="pointer"
                key={i}
                px="1rem"
                py="0.3rem"
                borderLeftRadius={i === 0 && "8px"}
                borderRightRadius={i === options.length - 1 && "8px"}
                border={
                  selected.includes(option)
                    ? "solid 1px #B27831"
                    : "solid 1px #cccccc"
                }
                borderLeft={
                  selected.includes(option)
                    ? "solid 1px #B27831"
                    : options[i - 1]
                    ? "none"
                    : "solid 1px #cccccc"
                }
                color={selected.includes(option) ? "" : "darkGray"}
                bg={
                  selected.includes(option)
                    ? "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)"
                    : "transparent"
                }
                onClick={() => {
                  if (disabled?.includes(option)) {
                    null;
                  } else {
                    if (selected.includes(option)) {
                      let newArray = [...selected];
                      let index = newArray.indexOf(option);
                      newArray.splice(index, 1);
                      setSelected(newArray);
                    } else {
                      setSelected([...selected, option]);
                      field.onChange(selected);
                    }
                  }
                }}
                textDecoration={
                  disabled?.includes(option) ? "line-through" : "none"
                }
                {...props}
              >
                {option}
              </Box>
            ))}
          </Flex>
        );
      }}
      name={name}
      control={control}
      defaultValue={[]}
    />
  );
};

export default TabsMultiSelect;
