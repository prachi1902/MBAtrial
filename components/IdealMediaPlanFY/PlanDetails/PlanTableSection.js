import React, { useEffect, useState } from "react";
import { Flex, Text, Img, IconButton } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Section, Page } from "../../library";
import { Tabs } from "@/components/FormComponents";
import Table from "./Table";

const PlanTableSection = ({ response, error }) => {
  console.log(response);

  const [totalData, setTotalData] = useState([]);
  const [digitalData, setDigitalData] = useState([]);
  const [traditionalData, setTraditionalData] = useState([]);
  const [digitalVehicleArray, setDigitalVehicleArray] = useState([]);
  const [traditionalVehicleArray, setTraditionalVehicleArray] = useState([]);

  // const [weeksArray, setWeeksArray] = useState([]);
  // const [weekDigitalArray, setWeekDigitalArray] = useState([]);
  // const [weekTraditionalArray, setWeekTraditionalArray] = useState([]);
  // const [weekDigital, setWeekDigital] = useState([]);
  // const [weekTraditional, setWeekTraditional] = useState([]);
  // const [weekTotalSpend, setWeekTotalSpend] = useState([]);

  useEffect(() => {
    let totalSpend = 0;
    let totalVolume = 0;
    let totalDigital = 0;
    let totalTraditional = 0;
    let digitalVehicleTemp = [];
    let traditionalVehicleTemp = [];

    let temp = [];

    // let weekTemp = [];

    if (response) {
      response.months?.map((month) => {
        totalSpend += month.total_spend;
        totalVolume += month.total_volume;
        // weekTemp = [...weekTemp, ...month.week];
        month.week.map((week) => {
          week.category.map((c) => {
            if (c.category_name === "Digital") {
              totalDigital += c.total_spend;
              digitalVehicleTemp = [...digitalVehicleTemp, ...c.vehicle];
            } else if (c.category_name === "Traditional") {
              totalTraditional += c.total_spend;
              traditionalVehicleTemp = [
                ...traditionalVehicleTemp,
                ...c.vehicle,
              ];
            }
          });
        });
      });
    }

    temp.push(totalSpend, totalVolume);
    setTotalData(temp);
    setDigitalData([totalDigital]);
    setTraditionalData([totalTraditional]);
    setDigitalVehicleArray(digitalVehicleTemp);
    setTraditionalVehicleArray(traditionalVehicleTemp);
    // setWeeksArray(weekTemp);
  }, [response]);

  // useEffect(() => {
  //   if (weeksArray.length > 0) {
  //     let weekDigitalTemp = [];
  //     let weekTraditionalTemp = [];
  //     let totalDigital = [];
  //     let totalTraditional = [];
  //     let totalSpend = [];

  //     weeksArray.map((week) => {
  //       totalSpend.push(week.total_spend);
  //       let i = 2;
  //       let categories = [];
  //       week.category.map((c) => {
  //         categories.push(c.category_name);
  //         if (c.category_name === "Digital") {
  //           i--;
  //           totalDigital.push(c.total_spend);
  //           weekDigitalTemp = [...weekDigitalTemp, c.vehicle];
  //         } else {
  //           i--;
  //           totalTraditional.push(c.total_spend);
  //           weekTraditionalTemp = [...weekTraditionalTemp, c.vehicle];
  //         }
  //       });
  //       if (i != 0) {
  //         if (!categories.includes("Digital")) {
  //           totalDigital.push(0);
  //         }
  //         if (!categories.includes("Traditional")) {
  //           totalTraditional.push(0);
  //         }
  //       }
  //     });

  //     setWeekDigitalArray(weekDigitalTemp);
  //     setWeekTraditionalArray(weekTraditionalTemp);
  //     setWeekDigital(totalDigital);
  //     setWeekTraditional(totalTraditional);
  //     setWeekTotalSpend(totalSpend);
  //   }
  // }, [weeksArray]);

  const { watch, control } = useForm({
    defaultValues: {
      planType: "FY Summary",
    },
  });

  const planTypeValue = watch("planType");

  return (
    <Section my="1rem">
      <Page py="1rem" px="1.5rem">
        <Flex align="flex-end" justifyContent="space-between">
          <Text>Plan Details</Text>
          <Tabs
            height="32px"
            fontSize="0.875rem"
            name="planType"
            control={control}
            options={["FY Summary", "52 Week Plan"]}
          />
          <Flex>
            <IconButton
              variant="gray"
              ml="1rem"
              bg="#dddddd"
              isRound={true}
              icon={<Img src="/svg/Download.svg" />}
            />
          </Flex>
        </Flex>
        <Flex my="1rem"></Flex>
        <Table>
          <Table.Columns />
          <Table.CategoryRow
            title="TOTAL MEDIA"
            data={totalData}
          ></Table.CategoryRow>
          <Table.CategoryRow title="DIGITAL" data={digitalData}>
            {digitalVehicleArray.map((d, index) => (
              <Table.Row
                key={index}
                title={d.vehicle_name}
                data={[d.total_spend]}
              >
                {d.sub_vehicle?.map((e, ind) => (
                  <Table.SubRow
                    key={ind}
                    title={e.sub_vehicle_name}
                    data={[e.total_spend]}
                  >
                    {e.format?.map((f, i) => (
                      <Table.SubSubRow
                        key={i}
                        title={f.format_name}
                        data={[f.total_spend]}
                      />
                    ))}
                  </Table.SubRow>
                ))}
              </Table.Row>
            ))}
          </Table.CategoryRow>
          <Table.CategoryRow title="TRADITIONAL" data={traditionalData}>
            {traditionalVehicleArray.map((d, index) => (
              <Table.Row
                key={index}
                title={d.vehicle_name}
                data={[d.total_spend]}
              >
                {d.sub_vehicle?.map((e, ind) => (
                  <Table.SubRow
                    key={ind}
                    title={e.sub_vehicle_name}
                    data={[e.total_spend]}
                  >
                    {e.format?.map((f, i) => (
                      <Table.SubSubRow
                        key={i}
                        title={f.format_name}
                        data={[f.total_spend]}
                      />
                    ))}
                  </Table.SubRow>
                ))}
              </Table.Row>
            ))}
          </Table.CategoryRow>
        </Table>

        {/* <Table>
          <Table.Columns weekArray={weeksArray} weeks={true} />
          <Table.CategoryRow
            title="TOTAL MEDIA"
            weeks={true}
            data={weekTotalSpend}
          ></Table.CategoryRow>
          <Table.CategoryRow title="DIGITAL" data={weekDigital} weeks={true}>
            {weekDigitalArray.map((v) => {
              v.map((d) => {
                return (
                  <Table.Row title={d.vehicle_name} data={[d.total_spend]}>
                    {d.sub_vehicle?.map((e) => {
                      console.log(e);
                      return (
                        <Table.SubRow
                          title={e.sub_vehicle_name}
                          data={[e.total_spend]}
                        >
                          {e.format?.map((f) => {
                            console.log(f);
                            return (
                              <Table.SubSubRow
                                title={f.format_name}
                                data={[f.total_spend]}
                              />
                            );
                          })}
                        </Table.SubRow>
                      );
                    })}
                  </Table.Row>
                );
              });
            })}
          </Table.CategoryRow>
          <Table.CategoryRow
            title="TRADITIONAL"
            data={weekTraditional}
            weeks={true}
          >
            {weekTraditionalArray.map((d) => (
              <Table.Row title={d.vehicle_name} data={[d.total_spend]}>
                {d.sub_vehicle?.map((e) => (
                  <Table.SubRow
                    title={e.sub_vehicle_name}
                    data={[e.total_spend]}
                  >
                    {e.format?.map((f) => (
                      <Table.SubSubRow
                        title={f.format_name}
                        data={[f.total_spend]}
                      />
                    ))}
                  </Table.SubRow>
                ))}
              </Table.Row>
            ))}
          </Table.CategoryRow>
        </Table> */}
      </Page>
    </Section>
  );
};

export default PlanTableSection;
