import React, { useState, useEffect, useMemo } from "react";
import { Box, Flex, Text, Button, Img } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import useAxios from "@/components/Hooks/useAxios";
import MasterTable from "./DataSetTable";
import Loader from "components/common/FullScreenLoader";
import { Container, Section } from "@/components/library";
import { SelectAsync } from "@/components/FormComponents";
import Helper from "@/lib/helper";
import { useDataManagement } from "redux/DataManagementSlice";

const MasterLayout = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [inActiveCount, setInActiveCount] = useState(0);
  const [missingCount, setMissingCount] = useState(0);
  const [countryOptions, setCountryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [subVehicleOptions, setSubVehicleOptions] = useState([]);
  const [formatOptions, setFormatOptions] = useState([]);
  const { dataMngState, dataMngDispatch } = useDataManagement();

  const { response, isLoading, execute } = useAxios({
    url: "/data_mgmt/dataset/module",
    manual: true,
  });
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      dataset: { label: "Financials Template", value: "financial_template" },
    },
  });

  const [selectedCountry, selectedBrand, selectedDataSet, selectedVehicle] =
    watch(["country", "brand", "dataset", "vehicle"]);

  useEffect(() => {
    if (dataMngState.modalOpen === "none" && dataMngState.shouldUpdate) {
      execute();
    }
  }, [dataMngState.modalOpen, dataMngState.shouldUpdate]);

  useMemo(() => {
    if (response) {
      dataMngDispatch.setShouldUpdate(false);
      const data = response.data.filter(
        (item) => item.Template === "financial_template"
      );
      setData(data);
      setDisplayData(data);
      const tempCountryOps = [];
      const tempBrandOps = [];
      const tempVehicleOps = [];
      const tempSubVehicleOps = [];
      const tempFormatOps = [];
      data.map((row, i) => {
        if (!tempCountryOps.includes(row.Country)) {
          tempCountryOps.push(row.Country);
        }
        if (!tempBrandOps.includes(row.Brand)) {
          tempBrandOps.push(row.Brand);
        }
        if (!tempVehicleOps.includes(row.Vehicle)) {
          tempVehicleOps.push(row.Vehicle);
        }
        if (!tempSubVehicleOps.includes(row.SubVehicle)) {
          tempSubVehicleOps.push(row.SubVehicle);
        }
        if (!tempFormatOps.includes(row.Format)) {
          tempFormatOps.push(row.Format);
        }
      });
      const countryOps = Helper.arrayToOptions(tempCountryOps);
      const brandOps = Helper.arrayToOptions(tempBrandOps);
      const vehicleOps = Helper.arrayToOptions(tempVehicleOps);
      const subVehicleOps = Helper.arrayToOptions(tempSubVehicleOps);
      const formatOps = Helper.arrayToOptions(tempFormatOps);
      setCountryOptions(countryOps);
      setBrandOptions(brandOps);
      setVehicleOptions(vehicleOps);
      setSubVehicleOptions(subVehicleOps);
      setFormatOptions(formatOps);
    }
  }, [response]);

  useMemo(() => {
    if (selectedDataSet?.value && response) {
      const data = response?.data?.filter(
        (item) => item.Template === selectedDataSet?.value
      );
      setData(data);
      setDisplayData(data);
      const tempCountryOps = [];
      const tempBrandOps = [];
      const tempVehicleOps = [];
      const tempSubVehicleOps = [];
      const tempFormatOps = [];
      data.map((row, i) => {
        if (!tempCountryOps.includes(row.Country)) {
          tempCountryOps.push(row.Country);
        }
        if (!tempBrandOps.includes(row.Brand)) {
          tempBrandOps.push(row.Brand);
        }
        if (!tempVehicleOps.includes(row.Vehicle)) {
          tempVehicleOps.push(row.Vehicle);
        }
        if (!tempSubVehicleOps.includes(row.SubVehicle)) {
          tempSubVehicleOps.push(row.SubVehicle);
        }
        if (!tempFormatOps.includes(row.Format)) {
          tempFormatOps.push(row.Format);
        }
      });
      const countryOps = Helper.arrayToOptions(tempCountryOps);
      const brandOps = Helper.arrayToOptions(tempBrandOps);
      const vehicleOps = Helper.arrayToOptions(tempVehicleOps);
      const subVehicleOps = Helper.arrayToOptions(tempSubVehicleOps);
      const formatOps = Helper.arrayToOptions(tempFormatOps);
      setCountryOptions(countryOps);
      setBrandOptions(brandOps);
      setVehicleOptions(vehicleOps);
      setSubVehicleOptions(subVehicleOps);
      setFormatOptions(formatOps);
    }
  }, [selectedDataSet]);

  useEffect(() => {
    if (selectedCountry?.value) {
      const filteredByCountry = data?.filter(
        (row) => row.Country === selectedCountry.value
      );
      const tempBrandOps = [];
      const tempVehicleOps = [];
      const tempSubVehicleOps = [];
      const tempFormatOps = [];
      filteredByCountry.map((row, i) => {
        if (!tempBrandOps.includes(row.Brand)) {
          tempBrandOps.push(row.Brand);
        }
        if (!tempVehicleOps.includes(row.Vehicle)) {
          tempVehicleOps.push(row.Vehicle);
        }
        if (!tempSubVehicleOps.includes(row.SubVehicle)) {
          tempSubVehicleOps.push(row.SubVehicle);
        }
        if (!tempFormatOps.includes(row.Format)) {
          tempFormatOps.push(row.Format);
        }
      });
      if (selectedBrand?.value && !tempBrandOps.includes(selectedBrand.value)) {
        setValue("brand", null);
      }
      const brandOps = Helper.arrayToOptions(tempBrandOps);
      const vehicleOps = Helper.arrayToOptions(tempVehicleOps);
      const subVehicleOps = Helper.arrayToOptions(tempSubVehicleOps);
      const formatOps = Helper.arrayToOptions(tempFormatOps);
      setBrandOptions(brandOps);
      setVehicleOptions(vehicleOps);
      setSubVehicleOptions(subVehicleOps);
      setFormatOptions(formatOps);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedBrand?.value) {
      const filteredByBrand = data?.filter(
        (row) => row.Brand === selectedBrand.value
      );

      const tempCountryOps = [];
      const tempVehicleOps = [];
      const tempSubVehicleOps = [];
      const tempFormatOps = [];
      filteredByBrand.map((row, i) => {
        if (!tempCountryOps.includes(row.Country)) {
          tempCountryOps.push(row.Country);
        }

        if (!tempVehicleOps.includes(row.Vehicle)) {
          tempVehicleOps.push(row.Vehicle);
        }
        if (!tempSubVehicleOps.includes(row.SubVehicle)) {
          tempSubVehicleOps.push(row.SubVehicle);
        }
        if (!tempFormatOps.includes(row.Format)) {
          tempFormatOps.push(row.Format);
        }
      });
      const countryOps = Helper.arrayToOptions(tempCountryOps);
      const vehicleOps = Helper.arrayToOptions(tempVehicleOps);
      const subVehicleOps = Helper.arrayToOptions(tempSubVehicleOps);
      const formatOps = Helper.arrayToOptions(tempFormatOps);
      setCountryOptions(countryOps);
      setVehicleOptions(vehicleOps);
      setSubVehicleOptions(subVehicleOps);
      setFormatOptions(formatOps);
    }
  }, [selectedBrand]);

  useMemo(() => {
    if (selectedVehicle?.value) {
      const filteredByVehicle = data?.filter(
        (row) => row.Vehicle === selectedVehicle.value
      );
      const tempSubVehicleOps = [];
      const tempFormatOps = [];
      filteredByVehicle.map((row, i) => {
        if (!tempSubVehicleOps.includes(row.SubVehicle)) {
          tempSubVehicleOps.push(row.SubVehicle);
        }
        if (!tempFormatOps.includes(row.Format)) {
          tempFormatOps.push(row.Format);
        }
      });
      const subVehicleOps = Helper.arrayToOptions(tempSubVehicleOps);
      const formatOps = Helper.arrayToOptions(tempFormatOps);
      setSubVehicleOptions(subVehicleOps);
      setFormatOptions(formatOps);
    }
  }, [selectedVehicle, displayData]);

  const applyFilter = (payload) => {
    const temp = [];
    const countryValue = payload.country?.value || true;
    const brandValue = payload.brand?.value || true;
    const vehicleValue = payload.vehicle?.value || true;
    const subVehicleValue = payload.subVehicle?.value || true;
    const formatValue = payload.format?.value || true;
    data.map((row) => {
      if (
        (countryValue === true || countryValue === row.Country) &&
        (brandValue === true || brandValue === row.Brand) &&
        (vehicleValue === true || vehicleValue === row.Vehicle) &&
        (subVehicleValue === true || subVehicleValue === row.SubVehicle) &&
        (formatValue === true || formatValue === row.Format)
      ) {
        temp.push(row);
      }
    });
    setDisplayData(temp);
  };

  const reset = () => {
    setValue("country", null);
    setValue("brand", null);
    setValue("vehicle", null);
    setValue("subVehicle", null);
    setValue("format", null);
    setDisplayData(data);
  };

  return (
    <Box pb="2rem">
      {isLoading && <Loader />}
      <Section as="section" my="1.5rem" mb="2rem">
        <Container>
          <Flex alignItems="center" justifyContent="space-between" mb="1.3rem">
            <Flex zIndex="4" alignItems="center">
              <Text fontSize="0.98rem" mr="1rem">
                Data Set:
              </Text>
              <SelectAsync
                name="dataset"
                control={control}
                defaultOptions={[
                  { label: "Financials Template", value: "financial_template" },
                  { label: "Media Volume", value: "media_volume" },
                  { label: "Maco per HL", value: "maco_per_h" },
                  { label: "NR per HL", value: "nr_per_h" },
                  { label: "Reach Cost", value: "reach_cost" },
                  { label: "Response Curve", value: "response_curve" },
                  { label: "Shipments", value: "shipments" },
                  { label: "Spend Template", value: "spend_template" },
                  { label: "Master Mapping", value: "master_mapping" },
                  { label: "Sales Volume", value: "sales_volume" },
                  { label: "Actual CPM", value: "actual_cpm" },
                ]}
                boxProps={{ width: "15.5rem", mr: "1rem", zIndex: "3" }}
                labelProps={{ variant: "bold" }}
                pl="0rem"
                pr="0rem"
                fontSize="0.85rem"
              />
            </Flex>
            <Flex alignItems="center">
              <Text
                color="primaryRed"
                fontWeight="600"
                fontSize="0.9rem"
                textDecoration="underline"
                mr="1rem"
              >
                {missingCount} Data Missing
              </Text>
              <Text
                color="primaryRed"
                fontWeight="600"
                fontSize="0.9rem"
                textDecoration="underline"
              >
                {inActiveCount} Inactive
              </Text>
            </Flex>
          </Flex>
          <Flex
            alignItems="flex-end"
            justifyContent="space-between"
            width="100%"
            zIndex="3"
            position="relative"
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width="82%"
              as="form"
            >
              <SelectAsync
                label="country"
                placeholder="Select"
                name="country"
                control={control}
                defaultOptions={countryOptions}
                boxProps={{ width: "19%", mr: "1rem" }}
                labelProps={{ variant: "bold" }}
                pl="0rem"
                pr="0rem"
                fontSize="0.9rem"
              />
              <SelectAsync
                label="brand"
                placeholder="Select"
                name="brand"
                control={control}
                defaultOptions={brandOptions}
                boxProps={{ width: "19%", mr: "1rem" }}
                labelProps={{ variant: "bold" }}
                pl="0rem"
                pr="0rem"
                fontSize="0.9rem"
              />
              <SelectAsync
                label="vehicle"
                placeholder="Select"
                name="vehicle"
                control={control}
                defaultOptions={vehicleOptions}
                boxProps={{ width: "19%", mr: "1rem" }}
                labelProps={{ variant: "bold" }}
                pl="0rem"
                pr="0rem"
                fontSize="0.9rem"
              />
              <SelectAsync
                label="sub-vehicle"
                placeholder="Select"
                name="subVehicle"
                control={control}
                defaultOptions={subVehicleOptions}
                boxProps={{ width: "19%", mr: "1rem" }}
                labelProps={{ variant: "bold" }}
                pl="0rem"
                pr="0rem"
                fontSize="0.9rem"
              />
              <SelectAsync
                label="format"
                placeholder="Select"
                name="format"
                control={control}
                defaultOptions={formatOptions}
                boxProps={{ width: "19%", mr: "1rem" }}
                labelProps={{ variant: "bold" }}
                pl="0rem"
                pr="0rem"
                fontSize="0.9rem"
              />
            </Flex>
            <Flex alignItems="center">
              <Button
                variant="gray"
                leftIcon={<Img src="/svg/reset.svg" />}
                mr="0.8rem"
                fontWeight="600"
                onClick={reset}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                leftIcon={<Img src="/svg/save.svg" mr="0.5rem" />}
                maxHeight="2.25rem"
                width="6.2rem"
                onClick={handleSubmit(applyFilter)}
              >
                Apply
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Section>
      <MasterTable
        setInActiveCount={setInActiveCount}
        setMissingCount={setMissingCount}
        data={displayData}
      />
    </Box>
  );
};

export default MasterLayout;
