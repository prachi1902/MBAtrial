import React from "react";
import { useForm } from "react-hook-form";
import { Flex, Img, Button, Text, Center, Box } from "@chakra-ui/react";

import { Container, Section } from "@/components/library";
import { SelectDropdown } from "@/components/FormComponents";
import FinancialTempTable from "@/components/DataManagement/DataSet/FinancialTempTable/Table";
import MediaVolumeTable from "@/components/DataManagement/DataSet/MediaVolume/Table";
import MacoHLTable from "@/components/DataManagement/DataSet/MacoPerHL/Table";
import NRPerHLtable from "@/components/DataManagement/DataSet/NRPerHl/Table";
import ReachCostTable from "@/components/DataManagement/DataSet/ReachCost/Table";
import ResponseCurveTable from "@/components/DataManagement/DataSet/ResponseCurve/Table";
import ShipmentsTable from "@/components/DataManagement/DataSet/Shipments/Table";
import SpendTemplate from "@/components/DataManagement/DataSet/SpendTemplate/Table";

const DataSetLayout = () => {
  const { control, watch } = useForm({
    defaultValues: {
      dataset: { label: "Financials Template", value: "financial_temp" },
    },
  });

  const selectedDataSet = watch("dataset", {
    label: "Financials Template",
    value: "financial_temp",
  });

  return (
    <Section as="section" my="1rem" mb="2rem">
      <Container>
        <Flex alignItems="center" justifyContent="space-between" mb="1rem">
          <Flex alignItems="center">
            <Text fontSize="0.98rem" mr="1rem">
              Data Set:
            </Text>
            <SelectDropdown
              name="dataset"
              control={control}
              options={[
                { label: "Financials Template", value: "financial_temp" },
                { label: "Media Volume", value: "media_volume" },
                { label: "Maco per HL", value: "maco_per_hl" },
                { label: "NR per HL", value: "nr_per_hl" },
                { label: "Reach Cost", value: "reach_cost" },
                { label: "Response Curve", value: "response_curve" },
                { label: "Shipments", value: "shipments" },
                { label: "Spend Template", value: "spend_template" },
              ]}
              boxProps={{ width: "15.5rem", mr: "1rem", zIndex: "3" }}
              labelProps={{ variant: "bold" }}
              pl="0rem"
              pr="0rem"
              fontSize="0.85rem"
            />
          </Flex>
        </Flex>
        {/* <Flex alignItems="flex-end" justifyContent="space-between" width="100%">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            width="82%"
            as="form"
          >
            <SelectDropdown
              label="country"
              placeholder="Select"
              name="country"
              control={control}
              options={[]}
              boxProps={{ width: "19%", mr: "1rem" }}
              labelProps={{
                variant: "bold",
                ml: "0rem",
                fontSize: "0.8rem",
                letterSpacing: "0.03rem",
              }}
              pl="0rem"
              pr="0rem"
              fontSize="0.9rem"
            />
            <SelectDropdown
              label="brand"
              placeholder="Select"
              name="brand"
              control={control}
              options={[]}
              boxProps={{ width: "19%", mr: "1rem" }}
              labelProps={{
                variant: "bold",
                ml: "0rem",
                fontSize: "0.8rem",
                letterSpacing: "0.03rem",
              }}
              pl="0rem"
              pr="0rem"
              fontSize="0.9rem"
            />
            <SelectDropdown
              label="vehicle"
              placeholder="Select"
              name="vehicle"
              control={control}
              options={[]}
              boxProps={{ width: "19%", mr: "1rem" }}
              labelProps={{
                variant: "bold",
                ml: "0rem",
                fontSize: "0.8rem",
                letterSpacing: "0.03rem",
              }}
              pl="0rem"
              pr="0rem"
              fontSize="0.9rem"
            />
            <SelectDropdown
              label="sub-vehicle"
              placeholder="Select"
              name="sub-vehicle"
              control={control}
              options={[]}
              boxProps={{ width: "19%", mr: "1rem" }}
              labelProps={{
                variant: "bold",
                ml: "0rem",
                fontSize: "0.8rem",
                letterSpacing: "0.03rem",
              }}
              pl="0rem"
              pr="0rem"
              fontSize="0.9rem"
            />
            <SelectDropdown
              label="format"
              placeholder="Select"
              name="format"
              control={control}
              options={[]}
              boxProps={{ width: "19%", mr: "1rem" }}
              labelProps={{
                variant: "bold",
                ml: "0rem",
                fontSize: "0.8rem",
                letterSpacing: "0.03rem",
              }}
              pl="0rem"
              pr="0rem"
              fontSize="0.9rem"
            />
          </Flex>
          <Flex alignItems="center">
            <Button
              variant="gray"
              leftIcon={<Img src="/svg/reset.svg" mr="0.3rem" />}
              mr="0.8rem"
              fontWeight="600"
            >
              Reset
            </Button>
            <Button
              variant="primary"
              leftIcon={<Img src="/svg/save.svg" mr="0.5rem" />}
              maxHeight="2.25rem"
              width="6.2rem"
            >
              Apply
            </Button>
          </Flex>
        </Flex> */}
        {selectedDataSet?.value === "financial_temp" ? (
          <FinancialTempTable />
        ) : selectedDataSet?.value === "media_volume" ? (
          <MediaVolumeTable />
        ) : selectedDataSet?.value === "maco_per_hl" ? (
          <MacoHLTable />
        ) : selectedDataSet?.value === "nr_per_hl" ? (
          <NRPerHLtable />
        ) : selectedDataSet?.value === "reach_cost" ? (
          <ReachCostTable />
        ) : selectedDataSet?.value === "response_curve" ? (
          <Center height="25vh" fontSize="1.15rem">
            The data for Response Curve cannot be downloaded at the moment.
          </Center>
        ) : selectedDataSet?.value === "shipments" ? (
          <ShipmentsTable />
        ) : selectedDataSet?.value === "spend_template" ? (
          <SpendTemplate />
        ) : (
          <Center height="50vh" width="100%">
            Please select a data set
          </Center>
        )}
      </Container>
    </Section>
  );
};

export default DataSetLayout;
