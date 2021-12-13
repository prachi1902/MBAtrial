import React from "react";
import { Flex, Text, Img, Box, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { FormInput } from "@/components/FormComponents";

const ResetPassword = ({ setScreen }) => {
  const { register } = useForm();
  return (
    <Box>
      <Text margin="auto" mb="1rem" width="max-content">
        Reset Password
      </Text>
      <Box mb="1rem">
        <FormInput
          {...register("password")}
          label="NEW PASSWORD"
          type="password"
          icon={<Img height="30px" src="svg/show.svg" />}
          height="3.375rem"
          backgroundColor="#e8e8e8"
          placeholder="Enter new password"
        />
      </Box>
      <FormInput
        {...register("re-password")}
        label="RE-ENTER NEW PASSWORD"
        type="password"
        icon={<Img height="30px" src="svg/show.svg" />}
        height="3.375rem"
        backgroundColor="#e8e8e8"
        placeholder="Re-enter new password"
      />
      <Flex mt="1rem" alignItems="center" justifyContent="center">
        <Button
          leftIcon={<Img boxSize="24px" mr="5px" src="/svg/Key.svg" />}
          variant="primary"
          type="submit"
          fontWeight="500"
          color="black"
          maxHeight="2.25rem"
          width="9.6rem"
          onClick={() => setScreen("success")}
        >
          Save Password
        </Button>
      </Flex>
    </Box>
  );
};

export default ResetPassword;
