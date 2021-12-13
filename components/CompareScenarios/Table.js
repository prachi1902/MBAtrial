import React, { useState } from "react";
import { Flex, Text, Grid, Box } from "@chakra-ui/react";

const Table = ({ children }) => {
  return (
    <Box>
      {/* <Box
        width="1px"
        top="0"
        height="100%"
        left="22%"
        zIndex="5"
        position="absolute"
        bg="#666"
      />
      <Box
        width="1px"
        top="0"
        height="100%"
        left="22%"
        zIndex="5"
        position="absolute"
        bg="#666"
      />
      <Box
        width="1px"
        top="0"
        height="100%"
        left="22%"
        zIndex="5"
        position="absolute"
        bg="#666"
      /> */}
      <Box>{children}</Box>
    </Box>
  );
};

const Columns = () => {
  const months = ["VEHICLE", "SPEND (%)", "SPEND ($)"];
  return (
    <Flex bg="#ddd">
      <Grid width="100%" templateColumns="2.1fr 1.5fr 1.5fr">
        {months.map((month, i) => (
          <Text
            key={i}
            py="0.5rem"
            borderLeft={i ? "solid 1px #ccc" : "none"}
            pl="1rem"
            fontSize="0.8rem"
            fontWeight="600"
          >
            {month}
          </Text>
        ))}
      </Grid>
    </Flex>
  );
};

const SubRow = () => {
  const subRowData = ["Vehicle Name", "Value", "Value"];
  return (
    <Flex bg="#f4f4f4">
      <Grid width="100%" templateColumns="2.1fr 1.5fr 1.5fr">
        {subRowData.map((item, i) => (
          <Text
            key={i}
            pl="1rem"
            py="0.2rem"
            borderLeft={i ? "solid 1px #ccc" : "none"}
            fontSize="0.875rem"
          >
            {item}
          </Text>
        ))}
      </Grid>
    </Flex>
  );
};

Table.Columns = Columns;
Table.SubRow = SubRow;

export default Table;
