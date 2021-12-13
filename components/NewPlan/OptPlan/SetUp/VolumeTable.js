import React, { useEffect } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

import { useMediaPlan } from "@/redux/MediaPlanSlice";
import { StyledInput } from "@/components/FormComponents/FormatInput";

const VolumeTable = ({ tab }) => {
  return (
    <Box
      display={tab === "Brand Volume Trend" ? "block" : "none"}
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
            Volume
          </Text>
        </Box>
        {months.map((item, i) => (
          <Row item={item} key={item} />
        ))}
      </Flex>
    </Box>
  );
};

const Row = ({ item }) => {
  const { mediaPlanDispatch, mediaPlanState } = useMediaPlan();
  useEffect(() => {
    if (!mediaPlanState.bvtValues[item])
      mediaPlanDispatch.updateBVTValues({
        [item]: { bvt: 0, month: item },
      });
  }, [mediaPlanState.selectedPlan.id]);
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
      <Box width="100%" height="3rem" py="0.75rem" px="1rem">
        <StyledInput
          fontSize="0.875rem"
          width="80%"
          height="3rem"
          name="value"
          disabled={mediaPlanState.selectedPlan?.hasExecuted}
          value={mediaPlanState.bvtValues[item]?.bvt}
          onValueChange={(values) => {
            const { floatValue } = values;
            mediaPlanDispatch.updateBVTValues({
              [item]: { bvt: floatValue, month: item },
            });
          }}
          thousandSeparator={true}
        />
      </Box>
    </Box>
  );
};
export default VolumeTable;

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
