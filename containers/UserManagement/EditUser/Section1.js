import React, { useEffect } from "react";
import { Box, Flex, Text, Img, Center, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { errorToast } from "components/Toasts";
import { Input } from "@/components/FormComponents";
import useAxios from "components/Hooks/useAxios";

export default function Section1({
  role,
  kpi,
  modules,
  accessData,
  user,
  masterData,
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", full_name: "" } });
  const { execute, isLoading, response, error } = useAxios({
    method: "put",
    url: "http://20.106.155.34:5005/v1/edit/user",
    showToast: true,
    toastMessage: "User details updated!",
  });

  const onSubmit = (payload) => {
    const formattedModules = formatModules(modules);
    const formattedRegionBrand = formatRegionBrand(accessData, masterData);

    if (!role.role_id) {
      errorToast("Please select user type!");
      return;
    }
    if (!role.access_id) {
      errorToast("Please select user access!");
      return;
    }
    if (!formattedModules.length) {
      errorToast("Please provide access to at least one sub module!");
      return;
    }
    if (!kpi.length) {
      errorToast("Please provide access to at least one KPI!");
      return;
    }
    if (!formattedRegionBrand.length) {
      errorToast("Please provide access to at least one brand!");
      return;
    }
    const submitData = {
      name: payload.full_name,
      user_id: user.id,
      email: payload.email,
      permissions: {
        project_name: "MBAT",
        role,
        kpi,
        modules: formattedModules,
        region_brand: { zones: formattedRegionBrand },
      },
    };
    execute({ data: submitData });
  };

  useEffect(() => {
    if (response) {
      router.push("/users");
    }
  }, [response, error]);

  useEffect(() => {
    setValue("full_name", user.name);
    setValue("email", user.email);
  }, [user.name, user.email]);

  return (
    <Flex
      width="100%"
      flexDir="column"
      boxShadow="0 2px 2px 0 rgba(0, 0, 0, 0.2)"
      mb="1.5rem"
      borderRadius="6px"
      pr="0rem"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex
        pos="relative"
        width="100%"
        zIndex="1"
        borderRadius="0.5rem 0.5rem 0 0"
        justify="space-between"
        overflow="hidden"
      >
        <Flex flexDir="column" pl="1.5rem" pt="1.4rem" pb="2rem">
          <Text fontWeight="500" color="white">
            User Details
          </Text>
          <Center
            borderRadius="50%"
            bg="linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)"
            mt="3rem"
            h="6rem"
            w="6rem"
          >
            <Img width="60%" src="/svg/add user photo.svg" />
          </Center>
        </Flex>
        <Button
          position="absolute"
          zIndex="1"
          top="1rem"
          right="1.5rem"
          type="submit"
          isLoading={isLoading}
          leftIcon={<Img src="/svg/apply.svg" mr="0.2rem" />}
        >
          Save Changes
        </Button>
        <Box
          h="220px"
          w="100%"
          left="0"
          zIndex="-1"
          position="absolute"
          background="linear-gradient(90deg, rgb(129,27,26) 63%, transparent 95%)"
        />
        <Img
          h="220px"
          w="330px"
          src="/png/starting_bg.png"
          position="absolute"
          right="0"
          zIndex="-2"
          opacity="0.7"
        />
      </Flex>
      <Flex
        h="128px"
        w="100%"
        p="24px"
        bgColor="formBgGray"
        justify="space-between"
      >
        <Box>
          <Text fontSize="0.75rem" color="gray" fontWeight="600" mb="0.5rem">
            FULL NAME
          </Text>
          <Input
            height="54px"
            width="386px"
            backgroundColor="white"
            placeholder="David Lane"
            {...register("full_name", { required: "Required" })}
          />
          {errors.full_name && (
            <Text mt="0.25rem" fontSize="0.75rem" color="error">
              {errors.full_name.message}
            </Text>
          )}
        </Box>
        <Box>
          <Text fontSize="0.75rem" color="gray" fontWeight="600" mb="0.5rem">
            EMAIL
          </Text>
          <Input
            height="54px"
            width="386px"
            backgroundColor="white"
            placeholder="DavidLane@gmail.com"
            {...register("email", {
              required: "Required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid Email" },
            })}
          />
          {errors.full_name && (
            <Text mt="0.25rem" fontSize="0.75rem" color="error">
              {errors.full_name.message}
            </Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

const formatModules = (rawModules) => {
  const formattedModules = [];
  Object.keys(rawModules).forEach((module) => {
    if (rawModules[module]?.length) {
      formattedModules.push({
        module_name: module,
        sub_modules: rawModules[module],
      });
    }
  });
  return formattedModules;
};

const formatRegionBrand = (rawBrandData, appDataState) => {
  const temp = {};
  const final = [];
  Object.keys(rawBrandData).map((country) => {
    const brands = rawBrandData[country].map((brand) => {
      return { brand_name: brand };
    });
    appDataState.zones.map((zone) => {
      zone.countries.map((val) => {
        if (val?.country === country) {
          if (temp[zone?.zone_name]) {
            temp[zone?.zone_name] = [
              ...temp[zone?.zone_name],
              { country_name: country, brands: brands },
            ];
          } else {
            temp[zone?.zone_name] = [{ country_name: country, brands: brands }];
          }
        }
      });
    });
  });
  Object.keys(temp).map((zone) => {
    if (temp[zone]?.length) {
      final.push({ zone_name: zone, countries: temp[zone] });
    }
  });
  return final;
};
