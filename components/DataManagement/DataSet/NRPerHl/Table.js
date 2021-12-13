import React, { useState, useMemo } from "react";
import { Box, Spinner, Center, Flex, Button, Img } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Section } from "components/library";
import DMColumnBuilder from "components/common/DMColumnBuilder";
import axios, { responseHandler, errorHandler } from "lib/http";
import { SelectAsync } from "@/components/FormComponents";
import Helper from "@/lib/helper";
import Row from "./Row";

const NRPerHLtable = () => {
  const columnItems = [
    ["country", "22%"],
    ["brand", "22%"],
    ["NR per hl", "22%"],
    ["year", "22%"],
  ];
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryOptions, setCountryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);

  const { control, handleSubmit, watch, setValue } = useForm();

  const [selectedCountry, selectedBrand] = watch(["country", "brand"]);

  useMemo(() => {
    setLoading(true);
    axios({
      url: "/data_mgmt/dataset_detail",
      params: { dataset_name: "nr_per_hl" },
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
      displayData.map((row) => {
        if (!tempCountryOps.includes(row.Country)) {
          tempCountryOps.push(row.Country);
        }
        if (!tempBrandOps.includes(row.Brand)) {
          tempBrandOps.push(row.Brand);
        }
      });
      const countryOps = Helper.arrayToOptions(tempCountryOps);
      const brandOps = Helper.arrayToOptions(tempBrandOps);
      setCountryOptions(countryOps);
      setBrandOptions(brandOps);
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
      filteredByCountry.map((row, i) => {
        if (!tempBrandOps.includes(row.Brand)) {
          tempBrandOps.push(row.Brand);
        }
      });
      if (selectedBrand?.value && !tempBrandOps.includes(selectedBrand.value)) {
        setValue("brand", null);
      }
      const brandOps = Helper.arrayToOptions(tempBrandOps);
      setBrandOptions(brandOps);
    }
  }, [selectedCountry, displayData]);

  useMemo(() => {
    if (selectedBrand?.value) {
      const filteredByBrand = displayData?.filter(
        (row) => row.Brand === selectedBrand.value
      );

      const tempCountryOps = [];
      filteredByBrand.map((row, i) => {
        if (!tempCountryOps.includes(row.Country)) {
          tempCountryOps.push(row.Country);
        }
      });
      const countryOps = Helper.arrayToOptions(tempCountryOps);
      setCountryOptions(countryOps);
    }
  }, [selectedBrand, displayData]);

  const applyFilter = (payload) => {
    const temp = [];
    const countryValue = payload.country?.value || true;
    const brandValue = payload.brand?.value || true;
    data.map((row) => {
      if (
        (countryValue === true || countryValue === row.Country) &&
        (brandValue === true || brandValue === row.Brand)
      ) {
        temp.push(row);
      }
    });
    setDisplayData(temp);
  };

  const reset = () => {
    setValue("country", null);
    setValue("brand", null);
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
        <Flex alignItems="center" width="82%" as="form">
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

export default NRPerHLtable;
