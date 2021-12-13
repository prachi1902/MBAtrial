import React from "react";
import styled from "@emotion/styled";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

import { Checkbox } from "@/components/FormComponents";

const StyledTh = styled(Th)`
  border: 1px solid #f7f6f7;
  border-right-color: #cccccc;
  color: black;
  letter-spacing: 0.01rem;
  font-weight: 600;
  font-size: 0.75rem;
  padding-left: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const StyledTd = styled(Td)`
  border: 1px solid #f7f6f7;
  border-right-color: #cccccc;
  font-size: 0.9rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 0.75rem;
`;

const VehicleTable = () => {
  const rows = [
    ["Vehicle Name, Vehicle Name", "Value", "Value", "Value", "Value"],
    ["Vehicle Name, Vehicle Name", "Value", "Value", "Value", "Value"],
    ["Vehicle Name, Vehicle Name", "Value", "Value", "Value", "Value"],
    ["Vehicle Name, Vehicle Name", "Value", "Value", "Value", "Value"],
    ["Vehicle Name, Vehicle Name", "Value", "Value", "Value", "Value"],
  ];

  return (
    <Box>
      <Table border="1px solid #F7F6F7">
        <Thead bg="#dddddd">
          <Tr>
            <StyledTh>
              <Flex alignItems="center">
                <Checkbox
                  secondaryVariant={true}
                  selectAll={true}
                  backgroundColor="white !important"
                  borderWidth="2px"
                  width="20px"
                  height="20px"
                />
                <Text ml="2rem">vehicle / format</Text>
              </Flex>
            </StyledTh>
            <StyledTh>start date</StyledTh>
            <StyledTh>end date</StyledTh>
            <StyledTh>min spend change (%)</StyledTh>
            <StyledTh>max spend change (%)</StyledTh>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, i) => (
            <Tr key={i}>
              {row.map((r, j) => {
                if (j === 0) {
                  return (
                    <StyledTd width="30%">
                      <Flex alignItems="center">
                        <Checkbox
                          secondaryVariant={true}
                          borderWidth="2px"
                          width="20px"
                          height="20px"
                        />
                        <Text ml="2rem">{r}</Text>
                      </Flex>
                    </StyledTd>
                  );
                } else {
                  return (
                    <StyledTd width={j === 1 || j == 2 || (j == 3 && "20%")}>
                      {r}
                    </StyledTd>
                  );
                }
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default VehicleTable;
