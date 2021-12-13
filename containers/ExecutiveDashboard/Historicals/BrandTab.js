import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Text, Collapse } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useBrandOverview } from "redux/BrandOverviewSlice";
import axios, { responseHandler, errorHandler } from "lib/http";
import BrandLineChart from "@/components/ExecutiveDashboard/Historicals/BrandChart";
import { EditorDropdownAsync } from "@/components/FormComponents";
import CustomBrandChart from "@/components/ExecutiveDashboard/Historicals/CustomBrandChart";

const BrandTab = ({ selectedTab }) => {
  const options = [
    "Spend",
    "Net Revenue",
    "MaCo",
    "Volume",
    "ROI",
    "Custom KPI",
  ];
  const [selectedType, setSelectedType] = useState(options[0]);
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const { brandOverviewState } = useBrandOverview();

  const { watch, control, setValue } = useForm();

  const vehicleValue = watch("vehicle");

  useEffect(() => {
    const fetchOptions = async () => {
      let temp = [];
      await Promise.all(
        brandOverviewState.selectedBrands?.map((brand) => {
          return axios({
            url: "/data_mgmt/dataset_detail",
            params: {
              dataset_name: "master_mapping",
              brand: brand,
              country: brandOverviewState.selectedCountry?.country,
            },
          })
            .then(responseHandler)
            .then((payload) => {
              payload.map((item) => {
                if (
                  !temp.includes({ label: item.Vehicle, value: item.Vehicle })
                ) {
                  temp.push({ label: item.Vehicle, value: item.Vehicle });
                }
              });
            })
            .catch(errorHandler);
        })
      );
      setVehicleOptions(temp);
      setValue("vehicle", temp[0]);
    };
    fetchOptions();
  }, [brandOverviewState.selectedBrands]);

  useEffect(() => {
    const fetchData = async () => {
      const temp = [];
      setLoading(true);
      await Promise.all(
        brandOverviewState.selectedBrands?.map((brand) => {
          return axios({
            method: "post",
            url: "/historical/group",
            data: {
              country_name: brandOverviewState.selectedCountry.country,
              brands: [brand],
              from_year: "2016",
              to_year: "2021",
              vehicle:
                selectedTab === "Vehicle" && vehicleValue?.value
                  ? [vehicleValue.value]
                  : [],
            },
          })
            .then(responseHandler)
            .then((payload) => {
              temp.push({ ...payload.country_details, brand_name: brand });
            })
            .catch(errorHandler);
        })
      );
      setGraphData(temp);
      setLoading(false);
    };
    fetchData();
  }, [brandOverviewState.selectedBrands, vehicleValue, selectedTab]);

  return (
    <Box>
      <Collapse in={selectedTab === "Vehicle"}>
        <Flex pt="1.5rem" justify="center">
          <EditorDropdownAsync
            label="vehicle"
            placeholder="Select"
            name="vehicle"
            control={control}
            defaultOptions={vehicleOptions}
            boxProps={{
              display: "flex",
              alignItems: "center",
              mr: "1rem",
            }}
            labelProps={{
              variant: "bold",
              fontSize: "0.8rem",
              mb: "0rem",
              mr: "0.5rem",
              ml: "0rem",
            }}
            pl="0rem"
            pr="0rem"
          />
        </Flex>
      </Collapse>
      <Flex align="center" my="1rem" px="1.5rem">
        {options.map((option, i) => {
          if (option === selectedType) {
            return (
              <Button
                key={i}
                borderRadius="6px"
                fontWeight="400"
                borderWidth="2px"
                px="1rem"
                maxHeight="2.1rem"
              >
                {option}
              </Button>
            );
          } else {
            return (
              <Text
                key={i}
                cursor="pointer"
                color="darkGray"
                fontSize="0.9rem"
                px="1rem"
                onClick={() => setSelectedType(option)}
              >
                {option}
              </Text>
            );
          }
        })}
      </Flex>
      {selectedType === "Custom KPI" ? (
        <CustomBrandChart graphData={graphData} />
      ) : (
        <BrandLineChart graphData={graphData} property={selectedType} />
      )}
    </Box>
  );
};

export default BrandTab;
