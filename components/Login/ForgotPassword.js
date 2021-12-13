import React from "react";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { FormInput } from "@/components/FormComponents";

const ForgotPassword = ({ setScreen }) => {
  const { register } = useForm();
  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb="1rem"
        position="relative"
      >
        <IconButton
          icon={<Img src="/svg/back.svg" />}
          variant="basic"
          onClick={() => setScreen("login")}
        />
        <Text position="absolute" left="50%" transform="translateX(-50%)">
          Forgot Password
        </Text>
      </Flex>
      <Box mb="1rem">
        <FormInput
          {...register("email_id")}
          label="EMAIL"
          height="3.375rem"
          backgroundColor="#e8e8e8"
          placeholder="Enter your registered email address"
        />
      </Box>
      <Flex mt="1.5rem" alignItems="center" justifyContent="center">
        <Button
          leftIcon={<Img boxSize="24px" mr="5px" src="/svg/Send.svg" />}
          variant="primary"
          type="submit"
          fontWeight="500"
          onClick={() => setScreen("reset")}
          color="black"
          maxHeight="2.25rem"
          width="10rem"
        >
          Send Reset Link
        </Button>
      </Flex>
    </Box>
  );
};

export default ForgotPassword;
