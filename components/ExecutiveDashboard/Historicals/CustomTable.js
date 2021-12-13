import React, { useState } from "react";
import { Container, Section, Page } from "../../library";
import { Flex, Text, Box, Grid } from "@chakra-ui/react";

const Table = ({ children }) => {
  return (
    <Box
      height="300px"
      position="relative"
      mt="1.2rem"
      width="98%"
      bg="#f2f2f2"
      m="auto"
      borderRadius="8px"
      mb="0.5rem"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
    >
      <Box
        width="1px"
        top="0"
        height="100%"
        left="8.5%"
        zIndex="5"
        position="absolute"
        bg="#cecece"
      />
      <Box
        width="1px"
        top="12%"
        height="88%"
        left="21%"
        zIndex="5"
        position="absolute"
        bg="#cecece"
      />
      <Box
        width="1px"
        top="12%"
        height="88%"
        left="32.5%"
        zIndex="5"
        position="absolute"
        bg="#cecece"
      />
      <Box
        width="1px"
        top="0"
        height="100%"
        left="44%"
        zIndex="5"
        position="absolute"
        bg="#cecece"
      />
      <Box
        width="1px"
        top="12%"
        height="88%"
        left="56%"
        zIndex="5"
        position="absolute"
        bg="#cecece"
      />
      <Box
        width="1px"
        top="12%"
        height="88%"
        left="68%"
        zIndex="5"
        position="absolute"
        bg="#cecece"
      />
      <Box
        width="1px"
        top="0"
        height="100%"
        left="78%"
        zIndex="5"
        position="absolute"
        bg="#cecece"
      />
      <Box>{children}</Box>
    </Box>
  );
};

const ColumnHead = () => {
  const months = ["", "corona extra", "stella artois"];
  return (
    <Flex bg="#e6e6e6" borderTopLeftRadius="10px" borderTopRightRadius="8px">
      <Grid width="80%" templateColumns="1fr 4fr 4fr">
        {months.map((month, i) => (
          <Text
            key={i}
            py="0.5rem"
            pl="0.65rem"
            fontSize="0.8rem"
            textTransform="uppercase"
            color="black"
            px={i && "8rem"}
          >
            {month}
          </Text>
        ))}
      </Grid>
    </Flex>
  );
};

const Columns = () => {
  const subcolumns = [
    "year",
    "media spend (mm $)",
    "overall vol (hl)",
    "media vol (hl)",
    "media spend (mm $)",
    "overall vol (hl)",
    "media vol (hl)",
  ];
  return (
    <Flex bg="#ddd" mb="0.5rem">
      <Grid width="80%" templateColumns="1fr repeat(3, 1.3fr) repeat(3, 1.3fr)">
        {subcolumns.map((month, i) => (
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
  const rowArray = [
    "2014",
    "Value",
    "Value",
    "Value",
    "Value",
    "Value",
    "Value",
  ];
  return (
    <Flex>
      <Grid width="80%" templateColumns="1fr repeat(3, 1.3fr) repeat(3, 1.3fr)">
        {rowArray.map((item, i) => (
          <Text key={i} py="0.16rem" pl="0.65rem" fontSize="0.9rem">
            {item}
          </Text>
        ))}
      </Grid>
    </Flex>
  );
};

const CustomTable = () => {
  return (
    <Table>
      <ColumnHead />
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

export default CustomTable;
