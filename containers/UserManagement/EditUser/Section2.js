import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { SelectDropdown, SelectAsync } from "@/components/FormComponents";
import CustomScrollbar from "components/common/CustomScrollbar";
import ModuleAccessUnit from "@/containers/UserManagement/ModuleAccessUnit";
import useAxios from "components/Hooks/useAxios";

const Section2 = ({ setRole, selectedModules, setSelectedModules, user }) => {
  const [modules, setModules] = useState([]);
  const [accessType, setAccessType] = useState([]);

  const { control, watch, setValue } = useForm();
  const [roleSelected, accessSelected] = watch(["role", "access"]);

  const getModules = useAxios({
    url: "http://20.106.155.34:5005/v1/project/modules?project_name=MBAT",
  });
  const getRoles = useAxios({
    url: "http://20.106.155.34:5005/v1/user/roles?project_name=MBAT",
  });

  useEffect(() => {
    if (getModules.response) {
      setModules(getModules.response?.modules[0].modules);
    }
  }, [getModules.response]);

  useEffect(() => {
    if (getRoles.response) {
      setAccessType(getRoles.response.roles);
    }
  }, [getRoles.response]);

  useEffect(() => {
    const temp = {
      role_id: roleSelected?.role_id,
      access_id: accessSelected?.access_id,
    };
    setRole(temp);
  }, [roleSelected, accessSelected]);

  useEffect(() => {
    if (!roleSelected?.access?.includes(accessSelected)) {
      setValue("access", null);
    }
  }, [roleSelected]);

  useEffect(() => {
    if (accessType.length && user.permissions) {
      const temp = accessType.filter(
        (item) => user.permissions?.role?.role_id === item.role_id
      )[0];
      setValue("role", temp);
      const temp2 = temp.access?.filter(
        (item) => item.access_id === user.permissions?.role?.access_id
      )[0];
      setValue("access", temp2);
    }
  }, [accessType, user]);

  useEffect(() => {
    if (user.permissions) {
      const temp = {};
      user.permissions.modules.forEach((item) => {
        temp[item.module_name] = item.sub_modules;
      });
      setSelectedModules(temp);
    }
  }, [user]);

  return (
    <Flex
      width="100%"
      boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.2)"
      borderRadius="6px"
      maxHeight="19rem"
      mb="1.5rem"
    >
      <Box bg="#f2f2f2" width="50%" p="1rem" px="1.5rem">
        <Text mb="1rem">Role</Text>
        <Box>
          {accessType.length && (
            <SelectDropdown
              name="role"
              control={control}
              options={accessType}
              label="user type"
              labelProps={{ variant: "bold" }}
              boxProps={{ mb: "1.1rem" }}
              height="55px"
              optionLabel="role_name"
              optionValue="role_id"
            />
          )}
          <SelectAsync
            name="access"
            control={control}
            defaultOptions={roleSelected?.access}
            label="access"
            labelProps={{ variant: "bold" }}
            height="55px"
            optionLabel="access_name"
            optionValue="access_id"
          />
        </Box>
      </Box>
      <CustomScrollbar height="19rem" width="50%" background="white">
        <Box bg="white" width="100%" p="1rem" px="1.5rem" height="19rem">
          <Text mb="0.6rem">Module Access</Text>
          {modules.map((module, i) => (
            <ModuleAccessUnit
              key={module.module_name}
              subModules={module.sub_modules}
              title={module.module_name}
              selectedModules={selectedModules}
              setSelectedModules={setSelectedModules}
            />
          ))}
        </Box>
      </CustomScrollbar>
    </Flex>
  );
};

export default Section2;
