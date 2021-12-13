import React from "react";
import { useForm } from "react-hook-form";
import { Flex, Box, Text, Tooltip } from "@chakra-ui/react";

import { ActiveSwitch } from "@/components/FormComponents";

const Row = ({ data }) => {
  const { control } = useForm();

  return (
    <Flex
      justifyContent="space-between"
      borderTop="solid 1px #F7F6F7"
      width="100%"
      bg="white"
      height="4rem"
      px="0.5rem"
    >
      <Box height="100%" py="0.8rem" borderRight="solid 1px #ccc" width="13%">
        <Text px="0.5rem" fontSize="0.9rem">
          {data.Country}
        </Text>
      </Box>
      <Box height="100%" py="0.8rem" borderRight="solid 1px #ccc" width="10%">
        <Text px="0.5rem" fontSize="0.9rem">
          {data.Brand}
        </Text>
      </Box>
      <Box height="100%" py="0.8rem" borderRight="solid 1px #ccc" width="17%">
        <Text px="0.5rem" fontSize="0.9rem">
          {data.Vehicle}
        </Text>
      </Box>
      <Box height="100%" py="0.8rem" borderRight="solid 1px #ccc" width="17%">
        <Text px="0.5rem" fontSize="0.9rem">
          {data.SubVehicle}
        </Text>
      </Box>
      <Box height="100%" py="0.8rem" borderRight="solid 1px #ccc" width="16%">
        <Text px="0.5rem" fontSize="0.9rem">
          {data.Format}
        </Text>
      </Box>
      <Box height="100%" py="0.8rem" borderRight="solid 1px #ccc" width="16%">
        {data.Flag === "N" ? (
          <Tooltip label={<Label data={data} />}>
            <Text
              cursor="pointer"
              px="0.5rem"
              fontSize="0.9rem"
              color="primaryRed"
            >
              MISSING
            </Text>
          </Tooltip>
        ) : (
          <Text cursor="pointer" px="0.5rem" fontSize="0.9rem" color="#3BA17D">
            AVAILABLE
          </Text>
        )}
      </Box>
      <Box height="100%" py="0.8rem" width="10%">
        <Box px="0.5rem" fontSize="0.9rem">
          <ActiveSwitch
            onChange={() => {}}
            checked={data.Active === "ACTIVE"}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default Row;

const Label = ({ data }) => {
  return (
    <Box>
      <Text fontWeight="600">{`${data.Country}/${data.Brand}/${data.Vehicle}/${data.SubVehicle}`}</Text>
      <Text fontWeight="600" mb="0.5rem">
        Missing in data templates:
      </Text>
      {data.Template?.split(",").map((temp) => (
        <Text key={temp}>{temp}</Text>
      ))}
    </Box>
  );
};
