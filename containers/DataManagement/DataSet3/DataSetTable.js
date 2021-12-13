import React from "react";
import { Box } from "@chakra-ui/react";

import { Section } from "components/library";
import CustomScrollbar from "components/common/CustomScrollbar";
import DMColumnBuilder from "components/common/DMColumnBuilder";
import Row from "components/DataManagement/DataSet/Row";

const DataSetTable = () => {
  const columnItems = [
    ["country", "13%"],
    ["brand", "10%"],
    ["vehicle", "15%"],
    ["sub-vehicle", "15%"],
    ["format", "11%"],
    ["media volume", "10%"],
    ["digital media hl etc", "13%"],
    ["data available", "13%"],
  ];

  return (
    <Section px="0" mt="2rem" pb="2rem">
      <Box
        position="relative"
        overflowY="auto"
        height="660px"
        id="table-with-scrollbar"
      >
        <Box
          height="990px"
          position="absolute"
          left="13%"
          borderRight="1px solid #ccc"
        ></Box>
        <Box
          height="990px"
          position="absolute"
          left="23%"
          borderRight="1px solid #ccc"
        ></Box>
        <Box
          height="990px"
          position="absolute"
          left="38%"
          borderRight="1px solid #ccc"
        ></Box>
        <Box
          height="990px"
          position="absolute"
          left="52.5%"
          borderRight="1px solid #ccc"
        ></Box>
        <Box
          height="990px"
          position="absolute"
          left="63.5%"
          borderRight="1px solid #ccc"
        ></Box>
        <Box
          height="990px"
          position="absolute"
          left="73.5%"
          borderRight="1px solid #ccc"
        ></Box>
        <Box
          height="990px"
          position="absolute"
          left="86%"
          borderRight="1px solid #ccc"
        ></Box>
        <DMColumnBuilder columnItems={columnItems} />
      </Box>
    </Section>
  );
};

export default DataSetTable;
