import React, { useEffect, useState } from "react";
import { Container, Section, Page } from "@/components/library";
import { Flex, Text, Img, Box, FormLabel } from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

import { SelectDropdown2 } from "@/components/FormComponents";
import RightWidget from "../../Widget/RightWidget";

const MaximizationSection = () => {
  const { control, watch } = useForm();

  return (
    <Section as="section" mt="1rem">
      <Page bg="#f8f8f8">
        <Flex width="100%" position="relative">
          <Box position="absolute" left="1.5rem" top="-1rem">
            <Text>Maximize KPIs</Text>
          </Box>
          <Box width="65%" height="22rem" position="relative">
            <Flex
              justifyContent="space-between"
              width="60%"
              position="absolute"
              mb="1rem"
              top="30%"
              left="38%"
            >
              <SelectDropdown2
                name="objective"
                control={control}
                options={[
                  { label: "Max Volume", value: "mv" },
                  { label: "Max NR", value: "mnr" },
                  { label: "Max MaCo", value: "mnaco" },
                  { label: "Max ROI", value: "mroi" },
                  { label: "Max ROI (Prioritize Attention)", value: "mroipa" },
                  { label: "Max Marketing Lever", value: "mml" },
                ]}
                label="Maximization Objective"
                labelProps={{
                  variant: "bold",
                  fontWeight: "600",
                  mb: "0.5rem",
                }}
                height="3.5rem"
                inputHeight="3.5rem"
                width="150%"
                menuWidth="150%"
                multipleColumns={true}
              />
            </Flex>
            <Flex width="60%" position="absolute" left="38%" top="57%">
              <Box>
                <FormLabel mb="0.6rem">media budget</FormLabel>
                <Flex alignItems="center">
                  <Text mr="1rem" fontSize="1.25rem">
                    $ 4,000,000
                  </Text>
                  <Flex color="#379972" alignItems="center" fontWeight="600">
                    <TriangleUpIcon mr="0.4rem" />
                    10.4%
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <RightWidget />
        </Flex>
      </Page>
    </Section>
  );
};

export default MaximizationSection;
