import React, { useState, useMemo } from "react";
import { Box, Spinner, Center, Flex, Button, Img } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Section } from "components/library";
import DMColumnBuilder from "components/common/DMColumnBuilder";
import axios, { responseHandler, errorHandler } from "lib/http";
import { SelectAsync } from "@/components/FormComponents";
import Helper from "@/lib/helper";
import Row from "./Row";

const FinancialTempTable = () => {
  const columnItems = [
    ["country", "10%"],
    ["brand", "10%"],
    ["category", "12%"],
    ["vehicle", "14%"],
    ["sub-vehicle", "14%"],
    ["format", "14%"],
    ["media maco", "8%"],
    ["media nr", "8%"],
    ["media roi", "8%"],
    ["media spend", "8%"],
    ["media volume", "8%"],
    ["year", "6%"],
  ];
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryOptions, setCountryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [subVehicleOptions, setSubVehicleOptions] = useState([]);
  const [formatOptions, setFormatOptions] = useState([]);

  const { control, handleSubmit, watch, setValue } = useForm();

  const [selectedCountry, selectedBrand, selectedVehicle] = watch([
    "country",
    "brand",
    "vehicle",
  ]);

  useMemo(() => {
    setLoading(true);
    axios({
      url: "/data_mgmt/dataset_detail",
      params: { dataset_name: "financial_temp" },
    })
      .then(responseHandler)
      .then((res) => {
        setData(res);
        setDisplayData(res);
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
  }, []);

  const rows = useMemo(() => {
    if (displayData.length) {
      const tempCountryOps = [];
      const tempBrandOps = [];
      const tempVehicleOps = [];
      const tempSubVehicleOps = [];
      const tempFormatOps = [];
      data.map((row) => {
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
      const list = displayData.map((item) => <Row key={item.id} {...item} />);
      return list;
    }
  }, [displayData]);

  useMemo(() => {
    if (selectedCountry?.value) {
      const filteredByCountry = displayData?.filter(
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
  }, [selectedCountry, displayData]);

  useMemo(() => {
    if (selectedBrand?.value) {
      const filteredByBrand = displayData?.filter(
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
  }, [selectedBrand, displayData]);

  useMemo(() => {
    if (selectedVehicle?.value) {
      const filteredByVehicle = displayData?.filter(
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
    <Section px="0" mt="1rem" pb="2rem">
      <Flex
        mb="1rem"
        alignItems="flex-end"
        justifyContent="space-between"
        width="100%"
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
          <SelectAsync
            label="brand"
            placeholder="Select"
            name="brand"
            control={control}
            defaultOptions={brandOptions}
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
          <SelectAsync
            label="vehicle"
            placeholder="Select"
            name="vehicle"
            control={control}
            defaultOptions={vehicleOptions}
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
          <SelectAsync
            label="sub-vehicle"
            placeholder="Select"
            name="subVehicle"
            control={control}
            defaultOptions={subVehicleOptions}
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
          <SelectAsync
            label="format"
            placeholder="Select"
            name="format"
            control={control}
            defaultOptions={formatOptions}
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
      <Box
        position="relative"
        overflowY="auto"
        height="660px"
        id="table-with-scrollbar"
      >
        <DMColumnBuilder columnItems={columnItems} />
        {loading ? (
          <Center width="100%" height="40vh">
            <Spinner color="primaryRed" size="xl" />
          </Center>
        ) : (
          rows
        )}
      </Box>
    </Section>
  );
};

export default FinancialTempTable;
