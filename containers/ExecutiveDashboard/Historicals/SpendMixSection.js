import React, { useState } from "react";
import { Container, Section, Page } from "../../../components/library";
import { Flex, Text, Img, Box, IconButton } from "@chakra-ui/react";
import SpendMixTable from "../../../components/ExecutiveDashboard/Historicals/SpendMixTable";

const SpendMixSection = ({ setShowSpendMix }) => {
  const [tableView, setTableView] = useState(false);

  return (
    <Box
      bg="#f8f8f8"
      mx="0.5rem"
      p="1rem"
      px={tableView && "0.5rem"}
      borderBottomLeftRadius="8px"
      borderBottomRightRadius="8px"
    >
      <Box
        bg={tableView && "#f2f2f2"}
        borderRadius={tableView && "10px"}
        mx={tableView && "0rem"}
        boxShadow={tableView && "0 2px 4px 0 rgba(0,0,0,0.2)"}
        mb={!tableView && "1rem"}
      >
        <Flex
          mb={!tableView && "1.5rem"}
          mt="0.5rem"
          align="center"
          justify="space-between"
          position="relative"
          px={tableView && "1rem"}
          py={tableView && "0.8rem"}
        >
          <Text>2021 Corona Extra Spend Mix</Text>
          <Flex>
            {tableView ? (
              <IconButton
                variant="unstyled"
                icon={<Img src="/svg/chart.svg" />}
                onClick={() => setTableView(false)}
              />
            ) : (
              <IconButton
                variant="unstyled"
                icon={<Img src="/svg/data.svg" />}
                onClick={() => setTableView(true)}
              />
            )}
            <IconButton variant="unstyled" icon={<Img src="/svg/Pin.svg" />} />
            <IconButton
              variant="unstyled"
              icon={<Img src="/svg/close.svg" />}
              minWidth="auto"
              onClick={() => setShowSpendMix(false)}
            />
          </Flex>
        </Flex>
        {tableView ? (
          <SpendMixTable />
        ) : (
          <>
            <Img src="/png/6-graph.png" />
            <Flex mt="1rem" mb="0.8rem" justify="center" width="100%">
              <Flex align="center" mr="1rem">
                <Box
                  bg="#F7963D"
                  width="14px"
                  mr="0.5rem"
                  height="14px"
                  borderRadius="50%"
                />
                Digital Media
              </Flex>
              <Flex align="center">
                <Box
                  bg="#379972"
                  width="12px"
                  mr="0.5rem"
                  height="12px"
                  borderRadius="50%"
                />
                Traditional Media
              </Flex>
            </Flex>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SpendMixSection;
