import React, { useState, useEffect } from "react";
import { Container, Section, Page } from "components/library";
import { Flex, Text, Button } from "@chakra-ui/react";
import { Tabs, EditorDropdown } from "@/components/FormComponents";
import useAxios from "@/components/Hooks/useAxios";
import { useForm } from "react-hook-form";
import SpendSection from "./SpendSection";
import CustomSection from "./CustomSection";

import { useUser } from "@/redux/UserSlice";

const HistoricalsSection = () => {
  const [selectedType, setSelectedType] = useState("Spend");

  const [chartData, setChartData] = useState();
  const [chartData2, setChartData2] = useState([]);
  const [chartData3, setChartData3] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState([]);
  const [info, setInfo] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [subVehicleOptions, setSubVehicleOptions] = useState([]);
  const [formatVehicleOptions, setFormatVehicleOptions] = useState([]);
  const [formatSubVehicleOptions, setFormatSubVehicleOptions] = useState([]);
  const [formatOptions, setFormatOptions] = useState([]);

  const { watch, control } = useForm({
    defaultValues: {
      historicalTabs: "Brand",
      historicalDuration: "Yearly",
    },
  });

  const keys = {
    Spend: "media_spend",
    "Net Revenue": "media_nr",
    MaCo: "maco",
    Volume: "media_volume",
    ROI: "media_roi",
    "Market Share": "market_share",
    "Brand Power": "brand_power",
    Custom: "",
  };

  const { userState } = useUser();
  const { execute, response, error, isLoading } = useAxios({
    url: "/historicals",
    method: "post",
  });

  const vehicleValue = watch("vehicle");
  const subVehicleValue = watch("sub-vehicle");
  const formatVehicleValue = watch("format-vehicle");
  const formatSubVehicleValue = watch("format-sub-vehicle");
  const formatValue = watch("format");

  useEffect(() => {
    execute({
      data: {
        country_id: 1,
        brands: [1, 2],
      },
    });
  }, []);

  useEffect(() => {
    if (response) {
      console.log(response);

      const data = [];
      const extraData = [];

      let vehicles = [];

      setAdditionalDetails([]);
      response.brands.map((brand, index) => {
        brand.years.map((year, i) => {
          if (!index) {
            console.log(keys[selectedType]);
            data.push([`${year.year}`, year?.[keys[selectedType]]]);
          } else {
            data[i][index + 1] = year?.[keys[selectedType]];
          }

          year.weeks.map((week) => {
            week.vehicles.map((vehicle) => {
              if (!vehicles.includes(vehicle.vehicle_name)) {
                vehicles.push(vehicle.vehicle_name);
              }
            });
          });
        });
        extraData.push({ name: brand.brand_name });
      });

      setInfo(vehicles);
      setAdditionalDetails(extraData);
      // console.log(data);
      setChartData(data);
    }
  }, [response, error, keys[selectedType]]);

  useEffect(() => {
    if (info.length > 0) {
      let tempOptions = [];
      info.map((v) => {
        tempOptions.push({ label: v, value: v });
      });

      setVehicleOptions(tempOptions);
      setFormatVehicleOptions(tempOptions);
    }
  }, [info]);

  useEffect(() => {
    let tempOptions = [];
    let temp = [];

    response?.brands.map((brand) => {
      brand.years.map((year) => {
        year.weeks.map((week) => {
          week.vehicles.map((vehicle) => {
            if (vehicle.vehicle_name === vehicleValue?.label) {
              vehicle.sub_vehicles.map((subVehicle) => {
                if (!temp.includes(subVehicle.sub_vehicle_name)) {
                  tempOptions.push({
                    label: subVehicle.sub_vehicle_name,
                    value: subVehicle.sub_vehicle_name,
                  });
                  temp.push(subVehicle.sub_vehicle_name);
                }
              });
            }
          });
        });
      });
    });

    setSubVehicleOptions(tempOptions);
  }, [vehicleValue]);

  useEffect(() => {
    if (vehicleValue && subVehicleValue) {
      let extraData = [];
      let finalData = [];
      setAdditionalDetails([]);

      response.brands.map((brand, index) => {
        brand.years.map((year, i) => {
          let tempData = [];
          tempData.push(year.year);
          let t = 0;
          year.weeks.map((week) => {
            week.vehicles.map((vehicle) => {
              if (vehicle.vehicle_name === vehicleValue.label) {
                vehicle.sub_vehicles.map((subVehicle) => {
                  if (subVehicle.sub_vehicle_name === subVehicleValue.label)
                    t += subVehicle[keys[selectedType]];
                });
              }
            });
          });
          if (t > 0) tempData.push(t);
          if (tempData.length > 1) {
            finalData.push(tempData);
            extraData.push({ name: brand.brand_name });
          }
        });
      });

      setAdditionalDetails(extraData);
      setChartData2(finalData);
    }
  }, [vehicleValue, subVehicleValue, keys[selectedType]]);

  useEffect(() => {
    let tempOptions = [];
    let temp = [];

    response?.brands.map((brand) => {
      brand.years.map((year) => {
        year.weeks.map((week) => {
          week.vehicles.map((vehicle) => {
            if (vehicle.vehicle_name === formatVehicleValue?.label) {
              vehicle.sub_vehicles.map((subVehicle) => {
                if (!temp.includes(subVehicle.sub_vehicle_name)) {
                  tempOptions.push({
                    label: subVehicle.sub_vehicle_name,
                    value: subVehicle.sub_vehicle_name,
                  });
                  temp.push(subVehicle.sub_vehicle_name);
                }
              });
            }
          });
        });
      });
    });

    setFormatSubVehicleOptions(tempOptions);
  }, [formatVehicleValue]);

  useEffect(() => {
    if (formatVehicleValue && formatSubVehicleValue) {
      let tempOptions = [];
      let temp = [];

      response?.brands.map((brand) => {
        brand.years.map((year) => {
          year.weeks.map((week) => {
            week.vehicles.map((vehicle) => {
              if (vehicle.vehicle_name === formatVehicleValue?.label) {
                vehicle.sub_vehicles.map((subVehicle) => {
                  if (
                    subVehicle.sub_vehicle_name === formatSubVehicleValue.label
                  ) {
                    subVehicle.formats.map((f) => {
                      if (!temp.includes(f.format_name)) {
                        tempOptions.push({
                          label: f.format_name,
                          value: f.format_name,
                        });
                        temp.push(f.format_name);
                      }
                    });
                  }
                });
              }
            });
          });
        });
      });

      setFormatOptions(tempOptions);
    }
  }, [formatVehicleValue, formatSubVehicleValue]);

  useEffect(() => {
    if (formatValue && formatVehicleValue && formatSubVehicleValue) {
      let finalData = [];
      let extraData = [];
      setAdditionalDetails([]);

      response.brands.map((brand, index) => {
        brand.years.map((year, i) => {
          let tempData = [];
          tempData.push(year.year);
          let t = 0;
          year.weeks.map((week) => {
            week.vehicles.map((vehicle) => {
              if (vehicle.vehicle_name === formatVehicleValue.label) {
                vehicle.sub_vehicles.map((subVehicle) => {
                  if (
                    subVehicle.sub_vehicle_name === formatSubVehicleValue.label
                  ) {
                    subVehicle.formats.map((f) => {
                      if (f.format_name === formatValue.label) {
                        t += f[keys[selectedType]];
                      }
                    });
                  }
                });
              }
            });
          });
          if (t > 0) tempData.push(t);
          if (tempData.length > 1) {
            finalData.push(tempData);
            extraData.push({ name: brand.brand_name });
          }
        });
      });

      setAdditionalDetails(extraData);
      setChartData3(finalData);
    }
  }, [
    formatVehicleValue,
    formatSubVehicleValue,
    formatValue,
    keys[selectedType],
  ]);

  const tabValue = watch("historicalTabs");

  const options = [
    "Spend",
    "Net Revenue",
    "MaCo",
    "Volume",
    "ROI",
    "Market Share",
    "Brand Power",
    "Custom",
  ];

  console.log(keys[selectedType]);

  return (
    <Section mt="1rem">
      <Page py="1rem" pb="0.5rem">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          position="relative"
          px="1.5rem"
        >
          <Text>Historicals</Text>
          <Tabs
            options={["Brand", "Vehicle", "Format"]}
            name="historicalTabs"
            control={control}
            flexProps={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
          {/* <Tabs
            options={["Yearly", "Monthly"]}
            name="historicalDuration"
            control={control}
          /> */}
        </Flex>

        {tabValue === "Brand" && null}

        {tabValue === "Vehicle" && (
          <Flex
            alignItems="center"
            justifyContent="center"
            mt="0.9rem"
            px="1.5rem"
          >
            <EditorDropdown
              label="vehicle"
              placeholder="Select"
              name="vehicle"
              control={control}
              options={vehicleOptions}
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
            <EditorDropdown
              label="sub-vehicle"
              placeholder="Select"
              name="sub-vehicle"
              control={control}
              options={subVehicleOptions}
              boxProps={{
                display: "flex",
                alignItems: "center",
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
        )}

        {tabValue === "Format" && (
          <Flex
            alignItems="center"
            justifyContent="center"
            mt="1rem"
            px="1.5rem"
          >
            <EditorDropdown
              label="vehicle"
              placeholder="Select"
              name="format-vehicle"
              control={control}
              options={formatVehicleOptions}
              boxProps={{
                display: "flex",
                alignItems: "center",
                mr: "0.8rem",
              }}
              labelProps={{
                variant: "bold",
                fontSize: "0.75rem",
                mb: "0rem",
                mr: "0.5rem",
                ml: "0rem",
              }}
              pl="0rem"
              pr="0rem"
            />
            <EditorDropdown
              label="sub-vehicle"
              placeholder="Select"
              name="format-sub-vehicle"
              control={control}
              options={formatSubVehicleOptions}
              boxProps={{
                display: "flex",
                alignItems: "center",
                mr: "1rem",
              }}
              labelProps={{
                variant: "bold",
                fontSize: "0.75rem",
                mb: "0rem",
                mr: "0.5rem",
                ml: "0rem",
              }}
              pl="0rem"
              pr="0rem"
            />
            <EditorDropdown
              label="format"
              placeholder="Select"
              name="format"
              control={control}
              options={formatOptions}
              boxProps={{
                display: "flex",
                alignItems: "center",
                mr: "1rem",
              }}
              labelProps={{
                variant: "bold",
                fontSize: "0.75rem",
                mb: "0rem",
                mr: "0.5rem",
                ml: "0rem",
              }}
              pl="0rem"
              pr="0rem"
            />
          </Flex>
        )}

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

        {selectedType !== "Custom" && (
          <SpendSection
            tab={keys[selectedType]}
            chartData={
              tabValue === "Brand"
                ? chartData
                : tabValue === "Vehicle"
                ? chartData2
                : chartData3
            }
            additionalDetails={additionalDetails}
            isLoading={isLoading}
            vehicleValue={vehicleValue}
            subVehicleValue={subVehicleValue}
            formatValue={formatValue}
            formatSubVehicleValue={formatSubVehicleValue}
            formatVehicleValue={formatVehicleValue}
          />
        )}

        {selectedType === "Custom" && <CustomSection />}
      </Page>
    </Section>
  );
};

export default HistoricalsSection;
