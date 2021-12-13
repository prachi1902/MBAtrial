import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import Table from "./Table";

const ScenarioVehicleTable = ({ title, bg, ...props }) => {
  return (
    <Box width="325px" boxShadow="0px 2px 2px 0 rgba(0,0,0,0.2)" {...props}>
      <Box
        bg={bg}
        color="white"
        textTransform="uppercase"
        height="35px"
        textAlign="center"
        fontSize="0.8rem"
        fontWeight="600"
      >
        <Text lineHeight="35px">{title}</Text>
      </Box>
      <Table>
        <Table.Columns />
        {[...Array(14)].map((item, i) => (
          <Table.SubRow key={i} i={i} />
        ))}
      </Table>
    </Box>
  );
};

export default ScenarioVehicleTable;
