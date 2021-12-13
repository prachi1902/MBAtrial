import helper from "@/lib/helper";
import { Box, Text, Grid } from "@chakra-ui/react";
import { returnLabels } from "./utils";

const Table = ({ children }) => {
  return (
    <Box
      overflowX="hidden"
      overflowY="auto"
      position="relative"
      mt="1.2rem"
      maxHeight="100%"
    >
      {children}
    </Box>
  );
};

const Columns = ({ tableData }) => {
  return (
    <Grid
      mx="auto"
      borderBottom="solid 1px gray"
      borderTop="solid 1px gray"
      width="90%"
      templateColumns={`repeat(${tableData.length + 1}, 1.5fr)`}
    >
      <Text
        textAlign="center"
        borderLeft="solid 1px gray"
        borderRight="solid 1px gray"
        py="0.5rem"
        pl="1rem"
        fontSize="0.8rem"
        textTransform="uppercase"
      >
        Year
      </Text>
      {tableData.map((column, index) => {
        return (
          <Text
            textAlign="center"
            borderRight="solid 1px gray"
            key={index}
            py="0.5rem"
            pl="1rem"
            fontSize="0.8rem"
            textTransform="uppercase"
          >
            {column.name}
          </Text>
        );
      })}
    </Grid>
  );
};

const Rows = ({ tableData, property }) => {
  return (
    <Grid
      mx="auto"
      width="90%"
      height="100%"
      templateColumns={`repeat(${tableData.length + 1}, 1.5fr)`}
    >
      <Box border="solid 1px gray" borderTop="none">
        {tableData[0]?.data?.map((data, i) => {
          return (
            <Text
              textAlign="center"
              key={i + 1}
              py="0.75rem"
              pl="1rem"
              fontSize="0.9rem"
            >
              {data[0]}
            </Text>
          );
        })}
      </Box>
      {tableData.map((row, index) => {
        return (
          <Box
            key={index}
            borderRight="solid 1px gray"
            borderBottom="solid 1px gray"
          >
            {row.data?.map((data, i) => {
              return (
                <Text
                  textAlign="center"
                  key={i + 1}
                  py="0.75rem"
                  pl="1rem"
                  fontSize="0.9rem"
                >
                  {returnLabels(property).prefix}{" "}
                  {helper.numberFormatter(data[1])}
                  {returnLabels(property).suffix}
                </Text>
              );
            })}
          </Box>
        );
      })}
    </Grid>
  );
};

export default function CustomTable({ heading, tableData, property }) {
  return (
    <Table>
      <Columns tableData={tableData} heading={heading} />
      <Rows property={property} tableData={tableData} />
    </Table>
  );
}
