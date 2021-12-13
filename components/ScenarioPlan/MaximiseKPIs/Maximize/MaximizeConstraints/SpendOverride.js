import React from "react";
import { Flex, Text, Img, Box, Button } from "@chakra-ui/react";

import VehicleTable from "./VehicleTable";

const SpendOverride = () => {
  return (
    <Box width="96.5%" margin="auto">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        position="relative"
        mb="1rem"
      >
        <Text>Spend Overrides</Text>
        <Button
          variant="secondary"
          leftIcon={<Img src="/svg/delete2.svg" mr="0.3rem" />}
          fontWeight="500"
          maxHeight="2.25rem"
          bg="#dddddd"
        >
          Remove
        </Button>
      </Flex>
      <VehicleTable />
    </Box>
  );
};

export default SpendOverride;
