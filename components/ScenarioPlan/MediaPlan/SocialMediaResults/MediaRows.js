import React, { useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";

const MediaRows = ({ data }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      py="1rem"
      width="100%"
      bg="formBgGray"
      height="1rem"
    >
      <Box pr="1rem" width="10%">
        <Text color="darkGray" fontSize="0.8rem">
          {data?.name}
        </Text>
      </Box>
      <Box px="0rem" width="15%" mr="0.5rem">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.spend.value}
            {data?.spend.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.spend.value}
              </Text>
              <Text pr="1rem" color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.spend.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box pr="1.5rem" width="16%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.nr.value}
            {data?.nr.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.nr.value}
              </Text>
              <Text px="0.2rem" color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.nr.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0rem" width="15%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.maco.value}
            {data?.maco.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.maco.value}
              </Text>
              <Text pr="1.5rem" color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.maco.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0.5rem" width="18%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.volume.value}
            {data?.volume.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.volume.value}
              </Text>
              <Text pr="1rem" color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.volume.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0.5rem" width="15%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.roi.value}
            {data?.roi.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.roi.value}
              </Text>
              <Text pr="1rem" color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.roi.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0.3rem" width="11%" mr="0.5rem">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.woa.value}
            {data?.woa.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.woa.value}
              </Text>
              <Text pr="2rem" color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.woa.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0.5rem" width="12%" mr="0.5rem">
        {data.tag === "true" ? (
          <Flex alignItems="center">
            <Text fontSize="1.1rem">{data?.qwoa.value}</Text>
            <Text fontSize="0.875rem" pl="0.6rem">
              {data?.qwoa.increment}
            </Text>
          </Flex>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.qwoa.value}
              </Text>
              <Text pr="1.5rem" color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.qwoa.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0.5rem" width="15%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">{data?.hp}</Text>
        ) : (
          <>
            <Flex alignItems="center">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.hp}
              </Text>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default MediaRows;
