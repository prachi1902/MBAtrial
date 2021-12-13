import React, { useState } from "react";
import { Container, Section, Page } from "../../library";
import { Flex, Text, Box, Grid } from "@chakra-ui/react";

const Table = ({ children }) => {
  return (
    <Box
      height="252px"
      position="relative"
      mt="1.2rem"
      width="98%"
      bg="#f2f2f2"
      m="auto"
      borderRadius="8px"
      mb="1rem"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
    >
      <Box
        width="1px"
        top="0"
        height="100%"
        left="10%"
        zIndex="5"
        position="absolute"
        bg="#cecece"
      />
      <Box
        width="1px"
        top="0%"
        height="100%"
        left="20.5%"
        zIndex="5"
        position="absolute"
        bg="#cecece"
      />
      <Box
        width="1px"
        top="0"
        height="100%"
        left="31.5%"
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
      <Grid width="32%" templateColumns="1.5fr 1.5fr 1.5fr">
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

const Columns = () => {
  const subcolumns = ["year", "volume (hl)", "volume (hl)"];
  return (
    <Flex bg="#ddd" mb="0.5rem">
      <Grid width="32%" templateColumns="1.5fr 1.5fr 1.5fr">
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
  const rowArray = ["2024 Projected", "Value", "Value"];
  return (
    <Flex>
      <Grid width="32%" templateColumns="1.5fr 1.5fr 1.5fr">
        {rowArray.map((item, i) => (
          <Text key={i} py="0.16rem" pl="0.65rem" fontSize="0.9rem">
            {item}
          </Text>
        ))}
      </Grid>
    </Flex>
  );
};

const ProjectionsTable = () => {
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
    </Table>
  );
};

export default ProjectionsTable;
