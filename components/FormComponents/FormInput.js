import React from "react";
import { Flex, FormLabel } from "@chakra-ui/react";
import Error from "./ErrorMessage";

import Input from "./Input";

const FormInput = React.forwardRef(
  (
    {
      isLabel = true,
      icon,
      label,
      errors,
      placeholder,
      styleProps,
      labelProps,
      ...props
    },
    ref
  ) => (
    <>
      {label ? (
        <>
          <FormLabel
            fontWeight="500"
            color="darkGray"
            letterSpacing="0.05rem"
            ml="0rem"
            fontSize="0.8rem"
          >
            {label}
          </FormLabel>
          <Flex
            borderRadius="5px"
            alignItems="center"
            bg="#E8E8E8"
            pr="1rem"
            pl="0.5rem"
          >
            <Input
              ref={ref}
              placeholder={placeholder}
              errors={errors}
              height="3.8rem"
              {...props}
            />
            {icon}
          </Flex>
          {errors && <Error name={props.name} errors={errors} />}
        </>
      ) : (
        <Input
          ref={ref}
          placeholder={placeholder}
          errors={errors}
          backgroundColor="white"
          border="1px solid #eeeeee"
          borderRadius="5px"
          height="2rem"
          {...props}
        />
      )}
    </>
  )
);

export default FormInput;
