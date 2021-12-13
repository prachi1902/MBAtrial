import React, { useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

const BrandResultsRow = ({ data }) => {
  return (
    <Flex alignItems="center" py="0.45rem" width="100%" bg="formBgGray">
      <Flex width="7%">
        <Text
          fontSize="0.7rem"
          textTransform="uppercase"
          color="black"
          letterSpacing="0.03rem"
        >
          {data?.scenarios}
        </Text>
      </Flex>
      <Flex width="10%" fontWeight="600">
        <Text fontSize="1.1rem">{data?.media_spend}</Text>
      </Flex>
      <Flex width="13%" alignItems="center" fontWeight="600">
        <Text fontSize="1.1rem" mr="0.5rem">
          {data?.digital_spend.value}
        </Text>
        <Text fontSize="0.9rem" color="darkGray">
          {data?.digital_spend.percent}
        </Text>
      </Flex>
      <Flex width="13%" alignItems="center" fontWeight="600">
        <Text fontSize="1.1rem" mr="0.5rem">
          {data?.traditional_spend.value}
        </Text>
        <Text fontSize="0.9rem" color="darkGray">
          {data?.traditional_spend.percent}
        </Text>
      </Flex>
      <Flex width="10%" fontWeight="600">
        <Text fontSize="1.1rem">{data?.inc_nr}</Text>
      </Flex>
      <Flex width="9%" fontWeight="600">
        <Text fontSize="1.1rem">{data?.inc_maco}</Text>
      </Flex>
      <Flex width="9%" fontWeight="600">
        <Text fontSize="1.1rem">{data?.inc_vol}</Text>
      </Flex>
      <Flex width="7%" fontWeight="600">
        <Text fontSize="1.1rem">{data?.roi}</Text>
      </Flex>
      <Flex width="7%" fontWeight="600">
        <Text fontSize="1.1rem">{data?.woa}</Text>
      </Flex>
      <Flex width="7%" alignItems="center" fontWeight="600">
        <Text fontSize="1.1rem" mr="0.7rem">
          {data?.qwoa.value}
        </Text>
        <Text fontSize="0.875rem" color="darkGray">
          ({data?.qwoa.bracket})
        </Text>
      </Flex>
      <Flex width="6%" fontWeight="600">
        <Text fontSize="1.1rem">{data?.hiatus_period}</Text>
      </Flex>
    </Flex>
  );
};

export default BrandResultsRow;
