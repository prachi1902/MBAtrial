import React from "react";
import { Flex, Text, Img, Box, Grid } from "@chakra-ui/react";
import CustomScrollbar from "components/common/CustomScrollbar";
import helper from "@/lib/helper";

const Table = ({ children }) => {
  return (
    <Box
      maxH="230px"
      position="relative"
      overflowX="hidden"
      overflowY="auto"
      mt="1.2rem"
    >
      <Box
        width="1px"
        top="0"
        height="100%"
        left="50%"
        zIndex="5"
        position="absolute"
        bg="#666"
      />
      <CustomScrollbar autoHide={true} height="230px">
        {children}
      </CustomScrollbar>
    </Box>
  );
};

const Columns = () => {
  const months = ["vehicle", "spend ($)"];
  return (
    <Flex bg="#ddd" margin="auto" p="0rem 9rem" width="98%" borderRadius="6px">
      <Grid width="100%" templateColumns="repeat(2, 1.5fr)">
        {months.map((month, i) => (
          <Text
            key={i}
            py="0.5rem"
            pl="0.65rem"
            fontSize="0.8rem"
            textTransform="uppercase"
          >
            {month}
          </Text>
        ))}
      </Grid>
    </Flex>
  );
};

const SubRow = ({ rowData = 0 }) => {
  return (
    <Flex p="0rem 9rem">
      <Grid width="100%" templateColumns="repeat(2, 1.5fr)">
        <Text py="0.75rem" pl="1rem" fontSize="0.9rem">
          {rowData.name}
        </Text>
        <Text py="0.75rem" pl="1rem" fontSize="0.9rem">
          {helper.currencyFormatter(rowData.value)}
        </Text>
      </Grid>
    </Flex>
  );
};

function VehicleMixTable({ data = [] }) {
  return (
    <Table>
      <Columns />
      {data.map((d, i) => {
        return <SubRow key={i} rowData={d} />;
      })}
    </Table>
  );
}

export default VehicleMixTable;
