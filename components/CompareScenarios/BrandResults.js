import React from "react";
import { Container, Section, Page } from "@/components/library";
import { Flex, Text, Box, Img } from "@chakra-ui/react";

import ColumnBuilder from "../common/ColumnBuilder";
import BrandResultsRow from "./BrandResultsRow";
import SpendTrends from "./SpendTrends";

function BrandResults() {
  const columnItems = [
    ["SCENARIOS", "7%", "left"],
    [
      <Flex key={1} alignItems="center">
        <Text mr="0.75rem" fontSize="0.8rem" color="darkGray">
          MEDIA SPEND
        </Text>
        <Img src="/svg/sort column.svg" />
      </Flex>,
      "10%",
      "left",
    ],
    [
      <Flex key={2} alignItems="center">
        <Text mr="0.75rem" fontSize="0.8rem" color="darkGray">
          DIGITAL SPEND
        </Text>
        <Img src="/svg/sort column.svg" />
      </Flex>,
      "15%",
      "left",
    ],
    [
      <Flex key={3} alignItems="center">
        <Text mr="0.75rem" fontSize="0.8rem" color="darkGray">
          TRADITIONAL SPEND
        </Text>
        <Img src="/svg/sort column.svg" />
      </Flex>,
      "15%",
      "left",
    ],
    [
      <Flex key={4} alignItems="center">
        <Text mr="0.75rem" fontSize="0.8rem" color="darkGray">
          INC NR
        </Text>
        <Img src="/svg/sort column.svg" />
      </Flex>,
      "12%",
      "left",
    ],
    [
      <Flex key={5} alignItems="center">
        <Text mr="0.75rem" fontSize="0.8rem" color="darkGray">
          INC MACO
        </Text>
        <Img src="/svg/sort column.svg" />
      </Flex>,
      "8%",
      "left",
    ],
    [
      <Flex key={6} alignItems="center">
        <Text mr="0.75rem" fontSize="0.8rem" color="darkGray">
          INC VOL
        </Text>
        <Img src="/svg/sort column.svg" />
      </Flex>,
      "8%",
      "left",
    ],
    [
      <Flex key={7} alignItems="center">
        <Text mr="0.75rem" fontSize="0.8rem" color="darkGray">
          ROI
        </Text>
        <Img src="/svg/sort column.svg" />
      </Flex>,
      "5%",
      "left",
    ],
    [
      <Flex key={8} alignItems="center">
        <Text mr="0.75rem" fontSize="0.8rem" color="darkGray">
          WOA
        </Text>
        <Img src="/svg/sort column.svg" />
      </Flex>,
      "7%",
      "left",
    ],
    [
      <Flex key={9} alignItems="center">
        <Text mr="0.75rem" fontSize="0.8rem" color="darkGray">
          QWOA
        </Text>
        <Img src="/svg/sort column.svg" />
      </Flex>,
      "7%",
      "left",
    ],
    [
      <Flex key={11} alignItems="center">
        <Text mr="0.75rem" fontSize="0.8rem" color="darkGray">
          HIATUS PERIOD
        </Text>
        <Img src="/svg/sort column.svg" />
      </Flex>,
      "6%",
      "left",
    ],
  ];

  const data = [
    {
      scenarios: "ideal plan",
      media_spend: "$ 45.55 MM",
      digital_spend: { value: "$ 45.55 MM", percent: "24%" },
      traditional_spend: { value: "$ 45.55 MM", percent: "24%" },
      inc_nr: "$ 45.55 MM",
      inc_maco: "$ 3,255",
      inc_vol: "500,500 HL",
      roi: "$ 1.25",
      woa: "32",
      qwoa: { value: "26", bracket: "32" },
      hiatus_period: "4",
    },
    {
      scenarios: "opt plan 1",
      media_spend: "$ 45.55 MM",
      digital_spend: { value: "$ 45.55 MM", percent: "24%" },
      traditional_spend: { value: "$ 45.55 MM", percent: "24%" },
      inc_nr: "$ 45.55 MM",
      inc_maco: "$ 3,255",
      inc_vol: "500,500 HL",
      roi: "$ 1.25",
      woa: "32",
      qwoa: { value: "26", bracket: "32" },
      hiatus_period: "4",
    },
    {
      scenarios: "sim plan 1",
      media_spend: "$ 45.55 MM",
      digital_spend: { value: "$ 45.55 MM", percent: "24%" },
      traditional_spend: { value: "$ 45.55 MM", percent: "24%" },
      inc_nr: "$ 45.55 MM",
      inc_maco: "$ 3,255",
      inc_vol: "500,500 HL",
      roi: "$ 1.25",
      woa: "32",
      qwoa: { value: "26", bracket: "32" },
      hiatus_period: "4",
    },
  ];

  return (
    <Section bg="formBgGray" mt="1rem">
      <Page p="0.5rem">
        <Box bg="formBgGray" borderRadius="6px">
          <Text py="0.5rem" px="1rem" pb="1rem">
            Brand Results
          </Text>
          <Box width="100%" px="1rem" pb="1rem">
            <Flex
              alignItems="center"
              bg="formBgGray"
              width="100%"
              color="darkGray"
              fontSize="0.8rem"
              textTransform="uppercase"
              mb="0.8rem"
            >
              <Text width="7%" letterSpacing="0.03rem" fontWeight="600">
                scenarios
              </Text>
              <Flex alignItems="center" width="10%">
                <Text mr="0.75rem">media spend</Text>
                <Img src="/svg/sort column.svg" />
              </Flex>
              <Flex alignItems="center" width="13%">
                <Text mr="0.75rem">digital spend</Text>
                <Img src="/svg/sort column.svg" />
              </Flex>
              <Flex alignItems="center" width="13%">
                <Text mr="0.75rem">traditional spend</Text>
                <Img src="/svg/sort column.svg" />
              </Flex>
              <Flex alignItems="center" width="10%">
                <Text mr="0.75rem">inc nr</Text>
                <Img src="/svg/sort column.svg" />
              </Flex>
              <Flex alignItems="center" width="9%">
                <Text mr="0.75rem">inc maco</Text>
                <Img src="/svg/sort column.svg" />
              </Flex>
              <Flex alignItems="center" width="9%">
                <Text mr="0.75rem">inc vol</Text>
                <Img src="/svg/sort column.svg" />
              </Flex>
              <Flex alignItems="center" width="7%">
                <Text mr="0.75rem">roi</Text>
                <Img src="/svg/sort column.svg" />
              </Flex>
              <Flex alignItems="center" width="7%">
                <Text mr="0.75rem">woa</Text>
                <Img src="/svg/sort column.svg" />
              </Flex>
              <Flex alignItems="center" width="7%">
                <Text mr="0.75rem">qwoa</Text>
                <Img src="/svg/sort column.svg" />
              </Flex>
              <Flex alignItems="center" width="6%">
                <Text mr="0.75rem">hiatus period</Text>
                <Img src="/svg/sort column.svg" />
              </Flex>
            </Flex>

            {/* <ColumnBuilder
              columnItems={columnItems}
              flexProps={{
                p: "0rem",
                bg: "formBgGray",
                borderRadius: "4px",
                mt: "0rem",
                // height: "2rem",
                mb: "1rem",
              }}
              textProps={{ p: "0rem", fontSize: "0.8rem" }}
            /> */}
            {data.map((d, i) => (
              <BrandResultsRow data={d} key={i} />
            ))}
          </Box>
        </Box>
        <SpendTrends />
      </Page>
    </Section>
  );
}

export default BrandResults;
