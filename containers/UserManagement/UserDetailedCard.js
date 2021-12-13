import React, { useState, useEffect } from "react";
import { Flex, Text, Avatar, IconButton, Img } from "@chakra-ui/react";
import router from "next/router";
import moment from "moment";

import helper from "@/lib/helper";

export default function UserDetailedCard({
  img,
  name,
  email,
  roles,
  permissions,
  id,
  last_login,
  setRemoveUser,
}) {
  const [brandCount, setBrandCount] = useState(0);
  const [role, setRole] = useState("");
  const [access, setAccess] = useState("");
  useEffect(() => {
    if (roles) {
      let total = 0;
      permissions.region_brand.map((zone) => {
        zone.countries.map((country) => (total += country.brands.length));
      });
      setBrandCount(total);
      const tempRoles = roles.filter(
        (role) => role?.role_id === permissions.role?.role_id
      )[0];
      setRole(tempRoles?.role_name);
      const tempAccess = tempRoles?.access?.filter(
        (acc) => acc?.access_id === permissions.role?.access_id
      )[0];
      setAccess(tempAccess?.access_name);
    }
  }, [permissions, roles]);

  return (
    <Flex
      bg="white"
      pl="1.5rem"
      pr="1rem"
      mb="1rem"
      h="9rem"
      align="center"
      width="100%"
      borderRadius="0.5rem"
      boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.1)"
    >
      <Avatar
        size="xl"
        bg="primaryRed"
        color="white"
        name={name}
        src={img}
        mr="1.38rem"
      />
      <Flex width="100%" justifyContent="space-between">
        <Flex flex="1.25" direction="column">
          <Text color="textBlack" mb="0.2rem">
            {name}
          </Text>
          <Text color="textGray" fontSize="14px" maxWidth="12.5rem">
            {email}
          </Text>
        </Flex>

        <Flex flex="1" direction="column" pl="1.8rem" width="5.625rem">
          <Label>ACCESS</Label>
          <Field>
            {helper.capitalize(access) + ", " + helper.capitalize(role)}
          </Field>
        </Flex>

        <Flex flex="1.5" direction="column" pl="2.1rem">
          <Label>MODULES</Label>
          <Field maxWidth="8.8rem">
            {permissions.modules?.map((module, i) => {
              if (i < 3) {
                if (i) {
                  return ", " + module.module_name;
                }
                return module.module_name;
              }
              if (i === 3) {
                return `, +${permissions.modules.length - 3} more`;
              }
            })}
          </Field>
        </Flex>

        <Flex flex="0.75" direction="column" pr="2.8rem">
          <Label>BU</Label>
          <Field>
            {permissions.region_brand?.map((country, i) => {
              if (i < 3) {
                if (i) {
                  return ", " + country.zone_name;
                }
                return country.zone_name;
              }
              if (i === 3) {
                return `, +${permissions.region_brand.length - 3} more`;
              }
            })}
          </Field>
        </Flex>

        <Flex flex="0.5" direction="column" pr="2.4rem">
          <Label>BRANDS</Label>
          <Field>{brandCount}</Field>
        </Flex>

        <Flex flex="1" direction="column" pr="2.9rem">
          <Label>LAST LOGIN</Label>
          <Field>{moment(last_login).format("lll")}</Field>
        </Flex>
        <Flex
          direction="column"
          alignItems="flex-end"
          width="3.5rem"
          mr="1.05rem"
        >
          <Label pr="3px">STATUS</Label>
          <Text fontSize="0.875rem" fontWeight="600" color="activeGreen">
            ACTIVE
          </Text>
        </Flex>
        <IconButton
          mt="5px"
          mr="5px"
          bg="transparent"
          border="none"
          aria-label="edit user"
          onClick={() => router.push(`/users/edit/${id}`)}
          icon={<Img src="/svg/edit.svg" />}
        />
        <IconButton
          mt="5px"
          bg="transparent"
          border="nonr"
          aria-label="delete user"
          // onClick={() => setRemoveUser(true)}
          icon={<Img src="/svg/remove_user.svg" />}
        />
      </Flex>
    </Flex>
  );
}

const Label = (props) => (
  <Text
    letterSpacing=".5px"
    fontSize="11.5px"
    color="textGray"
    fontWeight="550"
    lineHeight="1.5rem"
    {...props}
  >
    {props.children}
  </Text>
);

const Field = (props) => (
  <Text
    color="textDarkGray"
    lineHeight="18px"
    mt="2px"
    fontSize="14px"
    {...props}
  >
    {props.children}
  </Text>
);
