import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";

import { Container, Section } from "@/components/library";
import DMColumnBuilder from "@/components/common/DMColumnBuilder";
import Row from "components/DataManagement/DataSet/Row";

const MasterTable = ({ data, setInActiveCount, setMissingCount }) => {
  const columnItems = [
    ["country", "13%"],
    ["brand", "10%"],
    ["vehicle", "17%"],
    ["sub-vehicle", "17%"],
    ["format", "16%"],
    ["year", "8%"],
    ["data available", "16%"],
    ["active / inactive", "10%"],
  ];

  const dataListing = useMemo(() => {
    let inActiveCount = 0;
    let missingCount = 0;
    const comp = data.map((row, i) => {
      if (row.Flag === "N") {
        missingCount++;
      }
      if (row.Active !== "ACTIVE") {
        inActiveCount++;
      }
      return <Row data={row} key={i} />;
    });
    setMissingCount(missingCount);
    setInActiveCount(inActiveCount);
    return comp;
  }, [data]);

  return (
    <Section mb="4rem">
      <Container>
        <Box
          position="relative"
          overflowY="auto"
          height="660px"
          id="table-with-scrollbar"
        >
          <DMColumnBuilder columnItems={columnItems} />
          {dataListing}
        </Box>
      </Container>
    </Section>
  );
};

export default MasterTable;
