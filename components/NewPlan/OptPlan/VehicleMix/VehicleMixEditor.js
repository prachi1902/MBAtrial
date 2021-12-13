import React, { useState } from "react";
import { Container, Section, Page } from "../../../library";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";

import BrandResults from "./BrandResultsSection";
import ChartTableSection from "../MediaPlan/ChartTableSection";
import ResponseCurves from "./ResponseCurves";
import FormatSpendMixEditor from "./FormatSpendMixEditor";

const VehicleMixEditor = () => {
  const [tab, setTab] = useState("Brand");
  return (
    <Section>
      <Page mt="1rem" py="1.2rem">
        <Box px="1.5rem" mb="0.8rem">
          <Text>Vehicle Mix Editor</Text>
        </Box>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex flexDirection="column">
            <Img ml="4rem" height="12rem" src="/png/barrell-plan.png" />
            <Flex justifyContent="space-between" height="9rem" width="100%">
              <Flex
                width="15%"
                flexDirection="column"
                height="7.5rem"
                ml="1rem"
                py="0.5rem"
              >
                <Box height="1.5rem" />
                <Text color="gray" fontSize="0.75rem" mb="0.55rem">
                  OPT
                </Text>
                <Text color="gray" fontSize="0.75rem" mb="0.55rem">
                  IDEAL
                </Text>
                <Text color="gray" fontSize="0.75rem">
                  LY
                </Text>
              </Flex>
              <Flex justifyContent="space-between" width="85%">
                <Flex
                  flexDirection="column"
                  height="7rem"
                  alignItems="center"
                  width="28%"
                  bg="#ebe4d8"
                  borderRadius="8px"
                  py="0.5rem"
                  textAlign="center"
                >
                  <Text
                    color="gray"
                    fontSize="0.75rem"
                    letterSpacing="0.05rem"
                    textTransform="uppercase"
                    mb="0.3rem"
                  >
                    media budget
                  </Text>
                  <Flex alignItems="center" mb="0.25rem">
                    <Text
                      fontSize="0.95rem"
                      letterSpacing="0.03rem"
                      fontWeight="600"
                    >
                      $ 1.552MM
                    </Text>
                  </Flex>
                  <Flex alignItems="center" mb="0.25rem">
                    <Text color="gray" fontSize="0.9rem">
                      $ 82.55MM
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text color="gray" fontSize="0.9rem">
                      $ 82.55MM
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  flexDirection="column"
                  height="7rem"
                  py="0.5rem"
                  ml="3rem"
                  alignItems="center"
                  width="30%"
                  textAlign="center"
                >
                  <Text
                    color="gray"
                    fontSize="0.75rem"
                    letterSpacing="0.05rem"
                    mb="0.3rem"
                  >
                    DIGITAL
                  </Text>
                  <Flex alignItems="center" mb="0.25rem">
                    <Text fontSize="0.95rem" mr="0.7rem" fontWeight="600">
                      $ 82.55MM
                    </Text>
                    <Text fontSize="0.9rem" color="#45A584">
                      75.29%
                    </Text>
                  </Flex>
                  <Flex alignItems="center" mb="0.25rem">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      $ 82.55MM
                    </Text>
                    <Text fontSize="0.9rem" color="gray">
                      75.29%
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      $ 82.55MM
                    </Text>
                    <Text fontSize="0.9rem" color="gray">
                      75.29%
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  flexDirection="column"
                  height="7rem"
                  py="0.5rem"
                  mr="-1rem"
                  alignItems="center"
                  width="31%"
                  textAlign="center"
                >
                  <Text
                    color="gray"
                    fontSize="0.75rem"
                    letterSpacing="0.05rem"
                    mb="0.3rem"
                  >
                    TRADITIONAL
                  </Text>
                  <Flex alignItems="center" mb="0.25rem">
                    <Text fontSize="0.95rem" mr="0.7rem" fontWeight="600">
                      $ 229.45MM
                    </Text>
                    <Text fontSize="0.9rem" color="primaryRed">
                      25.29%
                    </Text>
                  </Flex>
                  <Flex alignItems="center" mb="0.25rem">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      $ 229.45MM
                    </Text>
                    <Text fontSize="0.9rem" color="gray">
                      25.29%
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text color="gray" fontSize="0.9rem" mr="0.7rem">
                      $ 229.45MM
                    </Text>
                    <Text fontSize="0.9rem" color="gray">
                      25.29%
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Container width="50%" mr="1.3rem" bg="#fafafa">
            <ChartTableSection />
          </Container>
        </Flex>
        <BrandResults tab={tab} setTab={setTab} />
        {tab === "Format" ? <FormatSpendMixEditor /> : <ResponseCurves />}
      </Page>
    </Section>
  );
};

export default VehicleMixEditor;
