import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Section, Page } from "@/components/library";
import { Box, Flex, Text, Img, Button } from "@chakra-ui/react";
import FormatSpendTable from "./FormatSpendTable";

const FormatSpendMixEditor = () => {
  return (
    <Page py="1rem" boxShadow="none" mb="-1.5rem">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        pt="0.5rem"
        px="1.5rem"
      >
        <Flex alignItems="center">
          <Text mr="1rem">Format Spend Mix Editor</Text>
          <Text fontStyle="italic" color="darkGray" fontSize="0.9rem">
            Change % of format based spending in the table below
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Button
            variant="gray"
            leftIcon={<Img src="/svg/reset.svg" />}
            mr="1rem"
          >
            Reset to Opt Mix
          </Button>
          <Button
            variant="primary"
            leftIcon={<Img src="/svg/add.svg" />}
            fontWeight="500"
          >
            Create New Scenario
          </Button>
        </Flex>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="flex-end"
        mr="0.5rem"
        py="0.6rem"
        width="100%"
        pr="2rem"
      >
        <Img src="/svg/warning.svg" mr="0.5rem" />
        <Box color="primaryRed">
          <Text textTransform="uppercase" fontSize="0.8rem" mb="0.05rem">
            warning
          </Text>
          <Text fontSize="0.75rem">Above budget by $ 70,000</Text>
        </Box>
      </Flex>

      <Box width="100%">
        <FormatSpendTable />
      </Box>
    </Page>
  );
};

export default FormatSpendMixEditor;
