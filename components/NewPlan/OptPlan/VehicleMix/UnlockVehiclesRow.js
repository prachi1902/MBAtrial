import React, { useEffect } from "react";
import { Flex, Img, Box, Text, Divider } from "@chakra-ui/react";
import { InputBudget } from "@/components/FormComponents";

const UnlockVehiclesRow = ({ data }) => {
  return (
    <Flex
      mt="0.5rem"
      alignItems="center"
      justifyContent="space-between"
      p="0.5rem"
      px="11rem"
      width="95%"
      margin="auto"
    >
      <Box width="25%" pl="0.5rem">
        <Text fontSize="0.9rem">{data.vehicle}</Text>
      </Box>
      <Box width="10%" ml="-0.5rem">
        <InputBudget flexProps={{ height: "30px" }} />
      </Box>
      <Box width="15%" pl="1.15rem">
        <Text fontSize="0.9rem">{data.mix}</Text>
      </Box>
      <Box width="15%" pl="0.5rem">
        {data.editable ? (
          <Img src="/svg/lock.svg" />
        ) : (
          <Img src="/svg/unlock.svg" />
        )}
      </Box>
    </Flex>
  );
};

export default UnlockVehiclesRow;
