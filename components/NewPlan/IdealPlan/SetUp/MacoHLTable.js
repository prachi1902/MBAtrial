import React, { useEffect } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

import axios, { responseHandler, errorHandler } from "lib/http";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import { StyledInput } from "@/components/FormComponents/FormatInput";
import { errorToast } from "@/components/Toasts";

const MacoHLTable = ({ tab }) => {
  const { mediaPlanState, mediaPlanDispatch } = useMediaPlan();
  useEffect(() => {
    if (
      mediaPlanState.newPlanDetails?.brand &&
      mediaPlanState.newPlanDetails?.country
    ) {
      axios({
        url: "/data_mgmt/dataset_detail",
        params: {
          dataset_name: "maco_per_hl",
          brand: mediaPlanState.newPlanDetails?.brand,
          country: mediaPlanState.newPlanDetails?.country,
        },
      })
        .then(responseHandler)
        .then((res) => {
          const selectedYear = res.filter(
            (item) => item.Year === mediaPlanState.newPlanDetails?.year
          )[0];
          if (selectedYear) {
            if (!Object.keys(mediaPlanState.impMacoHLValues).length)
              monthsWKeys.forEach((month) => {
                mediaPlanDispatch.updateIMPMacoValues({
                  [month.title]: {
                    maco_per_hl: selectedYear[month.key] ?? 0,
                    month: month.title,
                  },
                });
              });
          } else {
            errorToast("MaCo/HL details are not available.");
          }
        })
        .catch(errorHandler);
      axios({
        url: "/data_mgmt/dataset_detail",
        method: "get",
        params: {
          dataset_name: "financial_temp",
          year: "2020",
          country: mediaPlanState.newPlanDetails?.country,
          brand: mediaPlanState.newPlanDetails?.brand,
        },
      })
        .then((res) => {
          let totalVolume = 0;
          let totalNR = 0;
          let totalMACO = 0;
          let totalSpend = 0;
          let traditionalSpend = 0;
          let digitalSpend = 0;
          res.data?.forEach((item) => {
            if (item.Category === "DIGITAL") {
              digitalSpend += item.MediaSpend;
            } else {
              traditionalSpend += item.MediaSpend;
            }
            totalVolume += item.MediaVolume;
            totalNR += item.MediaNR;
            totalMACO += item.MediaMACO;
            totalSpend += item.MediaSpend;
          });
          mediaPlanDispatch.updateLYDetails({
            totalVolume,
            totalNR,
            totalMACO,
            totalSpend,
            digitalSpend,
            traditionalSpend,
          });
        })
        .then(responseHandler)
        .catch(errorHandler);
    }
  }, [
    mediaPlanState.newPlanDetails?.brand,
    mediaPlanState.newPlanDetails?.country,
  ]);
  return (
    <Box
      display={tab === "MaCo/HL" ? "block" : "none"}
      borderBottom="solid 1px #ccc"
      overflow="auto"
    >
      <Flex width="auto">
        <Box borderRight="solid 1px #ccc">
          <Text
            width="8rem"
            py="0.75rem"
            px="1rem"
            fontSize="0.875rem"
            borderBottom="solid 1px #ccc"
            bg="#ddd"
          >
            Month
          </Text>
          <Text width="8rem" py="0.75rem" px="1rem" fontSize="0.875rem">
            MaCo per HL
          </Text>
        </Box>
        {monthsWKeys.map((item, i) => (
          <Row item={item.title} key={item.key} />
        ))}
      </Flex>
    </Box>
  );
};

const Row = ({ item }) => {
  const { mediaPlanDispatch, mediaPlanState } = useMediaPlan();
  return (
    <Box borderRight="solid 1px #ccc">
      <Box
        width="8rem"
        bg="#ddd"
        py="0.75rem"
        px="1rem"
        fontSize="0.875rem"
        borderBottom="solid 1px #ccc"
      >
        {item}
      </Box>
      <Box width="100%" height="3.5rem" py="0.75rem" px="1rem">
        <StyledInput
          fontSize="0.875rem"
          width="80%"
          height="3rem"
          name="value"
          prefix="$"
          disabled={mediaPlanState.selectedPlan?.hasExecuted}
          value={mediaPlanState.impMacoHLValues[item]?.maco_per_hl}
          onValueChange={(values) => {
            const { floatValue } = values;
            mediaPlanDispatch.updateIMPMacoValues({
              [item]: { maco_per_hl: floatValue ?? 0, month: item },
            });
          }}
          thousandSeparator={true}
        />
      </Box>
    </Box>
  );
};
export default MacoHLTable;

const monthsWKeys = [
  { title: "JAN", key: "Jan" },
  { title: "FEB", key: "Feb" },
  { title: "MAR", key: "Mar" },
  { title: "APR", key: "Apr" },
  { title: "MAY", key: "May" },
  { title: "JUN", key: "Jun" },
  { title: "JUL", key: "Jul" },
  { title: "AUG", key: "Aug" },
  { title: "SEP", key: "Sep" },
  { title: "OCT", key: "Oct" },
  { title: "NOV", key: "Nov" },
  { title: "DEC", key: "Dec" },
];
