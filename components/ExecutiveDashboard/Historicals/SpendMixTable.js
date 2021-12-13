import React from "react";
import { Flex, Text, Box, Grid } from "@chakra-ui/react";

const Table = ({ children }) => {
  return (
    <Box height="400px" position="relative" width="100%">
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
        left="28%"
        zIndex="5"
        position="absolute"
        bg="lightGray"
      />
      <Box
        width="1px"
        top="0"
        height="100%"
        left="39.5%"
        zIndex="5"
        position="absolute"
        bg="lightgray"
      />
      <Box
        width="1px"
        top="0"
        height="100%"
        left="57.7%"
        zIndex="5"
        position="absolute"
        bg="lightgray"
      />
      <Box p="0rem 1rem">{children}</Box>
    </Box>
  );
};

const Columns = () => {
  const months = [
    "month",
    "digital media spend (mm $)",
    "digital media (%)",
    "traditional media spend (mm $)",
    "traditional media (%)",
  ];
  return (
    <Flex bg="#ddd" borderRadius="6px">
      <Grid width="70%" templateColumns="1.5fr 2.2fr 1.6fr 2.5fr 1.6fr">
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
  const rowArray = ["JAN", "Value", "Value", "Value", "Value"];
  return (
    <Flex>
      <Grid width="70%" templateColumns="1.5fr 2.2fr 1.6fr 2.5fr 1.6fr">
        {rowArray.map((item, i) => (
          <Text key={i} py="0.22rem" pl="1rem" fontSize="0.9rem">
            {item}
          </Text>
        ))}
      </Grid>
    </Flex>
  );
};

const SpendMixTable = () => {
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
      <SubRow />
      <SubRow />
      <SubRow />
      <SubRow />
    </Table>
  );
};

export default SpendMixTable;
