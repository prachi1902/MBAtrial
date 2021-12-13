import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

const PlanRows = ({ data, id }) => {
  return (
    <Flex
      mt="0rem"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      bg="white"
    >
      <Box pl="1rem" width="13%">
        <Text color="darkGray" fontSize="0.8rem" textTransform="uppercase">
          {data?.name}
        </Text>
      </Box>
      <Flex width="24%" zIndex="100" pl="2rem">
        {data.tag === "true" ? (
          <Text fontSize="1rem">{data?.mediaValue}</Text>
        ) : (
          <Text color="darkGray" fontSize="0.875rem">
            {data?.mediaValue}
          </Text>
        )}
      </Flex>

      <Flex
        width="33%"
        alignItems="center"
        justifyContent="space-between"
        pl="3rem"
      >
        {data.tag === "true" ? (
          <>
            <Text fontSize="1rem">{data?.digitalValue.value}</Text>
            <Text pl="0.2rem" color="green">
              {data?.digitalValue.percentage}
            </Text>
          </>
        ) : (
          <>
            <Text color="darkGray" fontWeight="600" fontSize="0.875rem">
              {data?.digitalValue.value}
            </Text>
            <Text px="0.2rem" fontSize="0.9rem" color="gray">
              {data?.digitalValue.percentage}
            </Text>
          </>
        )}
      </Flex>

      <Flex
        width="29%"
        alignItems="center"
        justifyContent="space-between"
        pl="1rem"
      >
        {data.tag === "true" ? (
          <>
            <Text fontSize="1rem">{data?.traditionalValue.value}</Text>
            <Text px="0.2rem" color="primaryRed">
              {data?.traditionalValue.percentage}
            </Text>
          </>
        ) : (
          <>
            <Text color="darkGray" fontSize="0.875rem">
              {data?.traditionalValue.value}
            </Text>
            <Text px="0.5rem" fontSize="0.9rem" color="gray">
              {data?.traditionalValue.percentage}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default PlanRows;
