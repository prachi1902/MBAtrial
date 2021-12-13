import React, { useEffect, useState } from "react";
import { Container, Section, Page } from "../../../components/library";
import { Flex, Text, Img, Box, IconButton } from "@chakra-ui/react";
import SpendTable from "../../../components/ExecutiveDashboard/Historicals/SpendTable";
import SpendMixSection from "./SpendMixSection";
import LineChart from "@/components/common/LineChart";
import useAxios from "@/components/Hooks/useAxios";
import { useUser } from "@/redux/UserSlice";
import Loader from "@/components/Loader";

const SpendSection = ({
  tab,
  chartData,
  additionalDetails,
  isLoading,
  vehicleValue,
  formatValue,
  subVehicleValue,
  formatSubVehicleValue,
  formatVehicleValue,
}) => {
  const [showSpendMix, setShowSpendMix] = useState(false);
  const [tableView, setTableView] = useState(false);

  return (
    <Box
      bg={tableView && "#f2f2f2"}
      borderRadius={tableView && "10px"}
      mx={tableView && "1rem"}
      boxShadow={tableView && "0 2px 4px 0 rgba(0,0,0,0.2)"}
      mb="1rem"
    >
      {/* <Flex
        mb="0rem"
        mt="0.5rem"
        align="center"
        justify="space-between"
        position="relative"
        px="1rem"
        pt="0.5rem"
      >
        <Text>Media Spend</Text>
        {!tableView && (
          <Text
            fontStyle="italic"
            color="darkGray"
            fontSize="0.9rem"
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
          >
            Tap on a data point to see spend mix
          </Text>
        )}
        <Flex>
          {tableView ? (
            <IconButton
              variant="unstyled"
              icon={<Img src="/svg/chart.svg" />}
              // onClick={() => setTableView(false)}
            />
          ) : (
            <IconButton
              variant="unstyled"
              icon={<Img src="/svg/data.svg" />}
              // onClick={() => setTableView(true)}
            />
          )}
          <IconButton
            variant="unstyled"
            icon={<Img src="/svg/Pin.svg" />}
            minWidth="auto"
            mr="0.3rem"
          />
        </Flex>
      </Flex> */}
      {/* {tableView ? (
        <SpendTable />
      ) : (
      )} */}
      <Box p="1rem" px="1.5rem">
        {isLoading ? (
          <Loader size="xl" height="50px" />
        ) : (
          <LineChart
            dependencies={[
              chartData,
              tab,
              vehicleValue,
              subVehicleValue,
              formatValue,
              formatVehicleValue,
              formatSubVehicleValue,
            ]}
            chartData={chartData}
            legendNames={additionalDetails}
            name="spend"
          />
        )}
      </Box>

      {showSpendMix && <SpendMixSection setShowSpendMix={setShowSpendMix} />}
    </Box>
  );
};

export default SpendSection;
