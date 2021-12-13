import React, { useState, useEffect } from "react";
import { Flex, Img, Box, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { FormInput } from "@/components/FormComponents";
import { useUser } from "redux/UserSlice";
import useAxios from "@/components/Hooks/useAxios";
import { analytics } from "@/lib/firebase";

const Login = ({ setScreen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [type, setType] = useState("password");
  const { userDispatch } = useUser();
  const router = useRouter();

  const { response, error, isLoading, execute } = useAxios({
    url: "/login",
    method: "post",
  });

  const onSubmit = ({ email_id, password }) => {
    execute({
      data: {
        email_id,
        password,
      },
    });
  };

  useEffect(() => {
    if (response && response.access_token) {
      userDispatch.loginUser(response);
      router.push("/media-planner");
      analytics().logEvent("login", {
        name: "user_login",
      });
    }
  }, [response, error]);

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Box mb="1rem">
        <FormInput
          {...register("email_id", {
            required: "Email is required!",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid Email" },
          })}
          label="EMAIL ADDRESS"
          height="3.375rem"
          backgroundColor="#e8e8e8"
          errors={errors}
        />
      </Box>
      <FormInput
        {...register("password", { required: "Password is required!" })}
        label="PASSWORD"
        type={type}
        icon={
          <Img
            onClick={() =>
              type === "password" ? setType("text") : setType("password")
            }
            cursor="pointer"
            height="28px"
            width="28px"
            src={type === "password" ? "svg/show.svg" : "svg/hide.svg"}
          />
        }
        height="3.375rem"
        backgroundColor="#e8e8e8"
        errors={errors}
      />
      <Flex mt="1rem" alignItems="center" justifyContent="space-between">
        <Button
          variant="ghost"
          fontSize="0.87rem"
          fontWeight="500"
          px="0"
          type="button"
          textDecoration="underline"
          onClick={() => setScreen("forgot")}
        >
          Forgot Password
        </Button>
        <Button
          leftIcon={<Img boxSize="24px" mr="5px" src="/svg/Login.svg" />}
          variant="primary"
          type="submit"
          fontWeight="500"
          color="black"
          maxHeight="2.25rem"
          width="6.25rem"
          isLoading={isLoading}
        >
          Login
        </Button>
      </Flex>
    </Box>
  );
};

export default Login;
