import React, { useState } from "react";
import { Container, Section, Page } from "../../library";
import { Flex, Text, Button, Img } from "@chakra-ui/react";
import BrandResultsTable from "./BrandResultsTable";

function BrandResultsSection({ setMaximizeKPI }) {
  return (
    <Section mt="1.2rem">
      <Page px="1.5rem" py="1.1rem">
        <Flex alignItems="center" justifyContent="space-between">
          <Text pb="0.8rem" fontSize="0.99rem">
            Brand results this Simulation vs Optimized Scenarios
          </Text>
        </Flex>
        <Flex position="relative">
          <BrandResultsTable />
          <Button
            position="absolute"
            variant="primary"
            leftIcon={<Img src="/svg/maximize.svg" />}
            fontSize="0.9rem"
            right="0"
            top="2.4rem"
            fontWeight="500"
            maxHeight="2.3rem"
            width="7rem"
            onClick={() => setMaximizeKPI(true)}
          >
            Maximize
          </Button>
        </Flex>
      </Page>
    </Section>
  );
}

export default BrandResultsSection;
