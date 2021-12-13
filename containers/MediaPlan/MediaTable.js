import React from "react";
import { Text, Box, Tooltip } from "@chakra-ui/react";

import { Container, Section } from "components/library";
import Loader from "components/Loader";

import ColumnBuilder from "components/common/ColumnBuilder";
import RowForm from "./RowForm";

const MediaTable = ({ loading, planListing = [] }) => {
  const columnItems = [
    ["brand", "9%", "left"],
    ["bu", "3.5%", "left"],
    ["type", "4%", "left"],
    ["year", "4%", "left"],
    ["spend", "7%", "left"],
    [
      <Tooltip
        key={3}
        label="Showing opt plan values till a scenario is finalized.Numbers show final scenario results if a scenario is finalized"
        placement="bottom-start"
      >
        media nr
      </Tooltip>,
      "8%",
      "left",
    ],
    ["media roi", "7%", "left"],
    ["vehicle mix", "7.5%", "left"],
    ["costs-execution mix", "13%", "left"],
    ["effectiveness", "9%", "left"],
    ["plan by", "8%", "left"],
    ["modified", "7%", "left"],
    ["scenarios", "7%", "center"],
    ["status", "7%", "right"],
  ];

  return (
    <Section as="section" my="1rem">
      <Container pb="4rem">
        <Box position="relative">
          <Box
            position="absolute"
            borderLeft="2px solid #E0E0E0"
            height="16px"
            top="-15px"
            right="32.5%"
          ></Box>
          <Box
            position="absolute"
            borderLeft="2px solid #E0E0E0"
            height="16px"
            top="-15px"
            left="45.8%"
            // right="53.516%"
          ></Box>
          <Text
            display="inline-block"
            position="absolute"
            textTransform="uppercase"
            top="-24.5px"
            right="37.5%"
            fontSize="0.75rem"
            color="gray"
            letterSpacing="0.03rem"
          >
            Marketing Lever ROI
          </Text>
          <Box
            position="absolute"
            borderTop="2px solid #E0E0E0"
            width="41px"
            top="-15px"
            right="32.5%"
          ></Box>
          <Box
            position="absolute"
            borderTop="2px solid #E0E0E0"
            width="50px"
            top="-15px"
            left="45.8%"
          ></Box>
        </Box>
        <ColumnBuilder
          columnItems={columnItems}
          flexProps={{
            bg: "#e6e6e6",
            py: "0.5rem",
            borderRadius: "4px",
            mb: "1rem",
            minHeight: "2rem",
          }}
          textProps={{ fontSize: "0.75rem" }}
        />
        {loading ? (
          <Loader size="xl" height="150px" />
        ) : (
          planListing.map((plan, i) => <RowForm data={plan} key={i} />)
        )}
      </Container>
    </Section>
  );
};

export default MediaTable;
