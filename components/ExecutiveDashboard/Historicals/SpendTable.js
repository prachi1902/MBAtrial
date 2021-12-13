import React from "react";
import { Flex, Text, Box, Grid } from "@chakra-ui/react";

const Table = ({ children }) => {
  return (
    <Box height="370px" position="relative" mt="1.2rem" width="100%">
      <Box
        width="1px"
        top="0"
        height="100%"
        left="12%"
        zIndex="5"
        position="absolute"
        bg="lightGray"
      />
      <Box
        width="1px"
        top="0"
        height="100%"
        left="26%"
        zIndex="5"
        position="absolute"
        bg="lightGray"
      />
      <Box
        width="1px"
        top="0"
        height="100%"
        left="38%"
        zIndex="5"
        position="absolute"
        bg="lightgray"
      />
      <Box p="0rem 1rem">{children}</Box>
    </Box>
  );
};

const Columns = () => {
  const months = ["brand spend", "corona extra (mm $)", "stella artois (mm $)"];
  return (
    <Flex bg="#ddd" borderRadius="6px">
      <Grid width="38%" templateColumns="1.5fr 2fr 1.75fr">
        {months.map((month, i) => (
          <Text
            key={i}
            py="0.5rem"
            pl="0.65rem"
            fontSize="0.8rem"
            textTransform="uppercase"
            color="black"
          >
            {month}
          </Text>
        ))}
      </Grid>
    </Flex>
  );
};

const SubRow = () => {
  const rowArray = ["2014", "Value", "Value"];
  return (
    <Flex>
      <Grid width="38%" templateColumns="1.5fr 2fr 1.75fr">
        {rowArray.map((item, i) => (
          <Text key={i} py="0.22rem" pl="1rem" fontSize="0.9rem">
            {item}
          </Text>
        ))}
      </Grid>
    </Flex>
  );
};

const SpendTable = () => {
  return (
    <Table>
      <Columns />
      <SubRow />
      <SubRow />
      <SubRow />
      <SubRow />
      <SubRow />
      <SubRow />
      <SubRow />
      <SubRow />
    </Table>
  );
};

export default SpendTable;
