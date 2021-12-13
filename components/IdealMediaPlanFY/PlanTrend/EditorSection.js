import React, { useState, useEffect } from "react";
import { Flex, Text, Img, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Page } from "../../library";
import EditorDropdown from "../../FormComponents/EditorDropdown";
import { Tabs } from "@/components/FormComponents";
import LineAreaChart from "@/components/common/LineAreaChart";
import CustomStackedChart from "@/components/common/CustomStackedGraph";
import CustomLineAreaChart from "../../common/CustomLineAreaChart";

function EditorSection({ response, error }) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [tooltipInfo, setTooltipInfo] = useState([]);
  const [mediaSpend, setMediaSpend] = useState([]);

  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [subVehicleOptions, setSubVehicleOptions] = useState([]);
  const [formatVehicleOptions, setFormatVehicleOptions] = useState([]);
  const [formatSubVehicleOptions, setFormatSubVehicleOptions] = useState([]);
  const [formatOptions, setFormatOptions] = useState([]);

  const { watch, control } = useForm({
    defaultValues: {
      type: "Brand",
      duration: "Monthly",
    },
  });

  const planTypeValue = watch("type");
  const durationValue = watch("duration");
  const vehicleValue = watch("vehicle");
  const subVehicleValue = watch("sub-vehicle");
  const formatVehicleValue = watch("format-vehicle");
  const formatSubVehicleValue = watch("format-sub-vehicle");
  const formatValue = watch("format");

  useEffect(() => {
    if (response) {
      const months = response?.months;
      let monthData = [];
      let monthName = [];
      let monthVol = [];
      let vehicles = [];
      let tempMediaSpend = [];

      months?.map((month, i) => {
        tempMediaSpend.push(month.total_spend);
        monthName.push(month.month);
        monthVol.push(month.total_volume);
        let tempData = [];
        let vehicleName = [];
        const weekArray = month.week;
        weekArray.map((week, j) => {
          week.category.map((c, k) => {
            c.vehicle.map((f, l) => {
              if (vehicleName.includes(f.vehicle_name)) {
                const index = vehicleName.indexOf(f.vehicle_name);
                tempData[index] = tempData[index] + f.total_spend;
              } else {
                vehicleName = [...vehicleName, f.vehicle_name];
                tempData = [...tempData, f.total_spend];
              }
              if (!vehicles.includes(f.vehicle_name)) {
                vehicles.push(f.vehicle_name);
              }
            });
          });
        });
        monthData.push(tempData);
      });
      setTooltipInfo(vehicles);
      setMediaSpend(tempMediaSpend);
      let finalData = [];
      let finalData2 = [];
      for (var v = 0; v < monthData.length; v++) {
        let temptempArray = [];
        let temptempArray2 = [];

        temptempArray.push(monthName[v]);
        temptempArray2.push(monthName[v]);

        for (var w = 0; w < monthData[v].length; w++) {
          temptempArray.push(monthData[v][w]);
        }
        temptempArray2.push(monthVol[v]);
        finalData.push(temptempArray);
        finalData2.push(temptempArray2);
      }

      setData(finalData);
      setData2(finalData2);
    }
    if (error) {
      console.log(error);
    }
  }, [response, error]);

  useEffect(() => {
    if (tooltipInfo.length > 0) {
      let tempOptions = [];
      tooltipInfo.map((t, i) => {
        tempOptions.push({ label: t, value: t });
      });
      setVehicleOptions(tempOptions);
      setFormatVehicleOptions(tempOptions);
    }
  }, [tooltipInfo]);

  useEffect(() => {
    let tempOptions = [];

    response?.months.map((m) => {
      m.week.map((w) => {
        w.category.map((c) => {
          c.vehicle.map((d) => {
            if (d.vehicle_name === vehicleValue?.label) {
              d.sub_vehicle.map((e) => {
                if (
                  !tempOptions.includes({
                    label: e.sub_vehicle_name,
                    value: e.sub_vehicle_name,
                  })
                ) {
                  tempOptions.push({
                    label: e.sub_vehicle_name,
                    value: e.sub_vehicle_name,
                  });
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
    let tempOptions = [];
    response?.months.map((m) => {
      m.week.map((w) => {
        w.category.map((c) => {
          c.vehicle.map((d) => {
            if (d.vehicle_name === formatVehicleValue?.label) {
              d.sub_vehicle.map((e) => {
                if (
                  !tempOptions.includes({
                    label: e.sub_vehicle_name,
                    value: e.sub_vehicle_name,
                  })
                ) {
                  tempOptions.push({
                    label: e.sub_vehicle_name,
                    value: e.sub_vehicle_name,
                  });
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
    if (vehicleValue && subVehicleValue) {
      const months = response?.months;

      let finalData = [];
      months.map((month, i) => {
        let tempData = [];
        tempData.push(month.month);
        month.week.map((week) => {
          week.category.map((c) => {
            c.vehicle.map((f) => {
              if (f.vehicle_name === vehicleValue.label) {
                f.sub_vehicle.map((s) => {
                  if (s.sub_vehicle_name === subVehicleValue.label) {
                    tempData.push(s.total_spend);
                  }
                });
              }
            });
          });
        });
        finalData.push(tempData);
      });

      setData3(finalData);
    }
  }, [vehicleValue, subVehicleValue]);

  useEffect(() => {
    if (formatVehicleValue && formatSubVehicleValue) {
      let tempOptions = [];
      response?.months.map((m) => {
        m.week.map((week) => {
          week.category.map((c) => {
            c.vehicle.map((f) => {
              if (f.vehicle_name === formatVehicleValue.label) {
                f.sub_vehicle.map((s) => {
                  if (s.sub_vehicle_name === formatSubVehicleValue.label) {
                    s.format.map((t) => {
                      tempOptions.push({
                        label: t.format_name,
                        value: t.format_name,
                      });
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
    if (formatVehicleValue && formatSubVehicleValue && formatValue) {
      const months = response?.months;

      let finalData = [];
      months.map((month, i) => {
        let tempData = [];
        tempData.push(month.month);
        month.week.map((week) => {
          week.category.map((c) => {
            c.vehicle.map((f) => {
              if (f.vehicle_name === formatVehicleValue.label) {
                f.sub_vehicle.map((s) => {
                  if (s.sub_vehicle_name === formatSubVehicleValue.label) {
                    s.format.map((t) => {
                      if (t.format_name === formatValue.label) {
                        tempData.push(t.total_spend);
                      }
                    });
                  }
                });
              }
            });
          });
        });
        finalData.push(tempData);
      });
      setData4(finalData);
    }
  }, [formatVehicleValue, formatSubVehicleValue, formatValue]);

  return (
    <Page py="1rem" px="1.5rem" boxShadow="none" mb="-1.5rem">
      <Flex align="flex-end" justifyContent="space-between" pr="3rem">
        <Text>Plan Trend</Text>
        <Tabs
          options={["Brand", "Vehicle", "Format"]}
          height="32px"
          fontSize="0.875rem"
          name="type"
          control={control}
        />
        <Flex></Flex>
      </Flex>
      {planTypeValue === "Brand" && null}
      {planTypeValue === "Vehicle" && (
        <Flex alignItems="center" justifyContent="center" mt="1rem">
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
            labelProps={{ variant: "bold" }}
            pl="0rem"
            pr="0rem"
            fontSize="0.9rem"
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
              mr: "1rem",
            }}
            labelProps={{ variant: "bold" }}
            pl="0rem"
            pr="0rem"
            fontSize="0.9rem"
          />
        </Flex>
      )}
      {planTypeValue === "Format" && (
        <Flex alignItems="center" justifyContent="center" mt="1rem">
          <EditorDropdown
            label="vehicle"
            placeholder="Select"
            name="format-vehicle"
            control={control}
            options={formatVehicleOptions}
            boxProps={{
              display: "flex",
              alignItems: "center",
              mr: "1rem",
            }}
            labelProps={{ variant: "bold" }}
            pl="0rem"
            pr="0rem"
            fontSize="0.9rem"
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
            labelProps={{ variant: "bold" }}
            pl="0rem"
            pr="0rem"
            fontSize="0.9rem"
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
            labelProps={{ variant: "bold" }}
            pl="0rem"
            pr="0rem"
            fontSize="0.9rem"
          />
        </Flex>
      )}
      <Box my="1rem" width="100%">
        {durationValue === "Monthly" ? (
          planTypeValue === "Brand" ? (
            <CustomStackedChart
              name="img-stack"
              customData={data}
              customData2={data2}
              tooltipInfo={tooltipInfo}
              mediaSpend={mediaSpend}
              dependencies={[data, data2]}
            />
          ) : planTypeValue === "Vehicle" ? (
            <CustomLineAreaChart
              customData={data3}
              customData2={data2}
              name="imp-graph"
              dependencies={[data2, vehicleValue, subVehicleValue, data3]}
            />
          ) : planTypeValue === "Format" ? (
            <CustomLineAreaChart
              customData={data4}
              customData2={data2}
              name="format-graph"
              dependencies={[
                data2,
                formatVehicleValue,
                formatSubVehicleValue,
                formatValue,
                data4,
              ]}
            />
          ) : null
        ) : (
          <LineAreaChart name="weekly-chart" />
        )}
      </Box>
      {/* <Img src="/png/plantrendgraph.png" mb="0.5rem" /> */}
      <Box mt="0.8rem" width="max-content" margin="auto">
        <Tabs
          height="32px"
          fontSize="0.875rem"
          name="duration"
          control={control}
          options={["Monthly", "Weekly"]}
        />
      </Box>
    </Page>
  );
}

export default EditorSection;
