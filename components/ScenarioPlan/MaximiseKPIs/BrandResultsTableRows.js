import React, { useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const BrandResultsTableRows = ({ data }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      py="1rem"
      width="100%"
      height="1rem"
    >
      <Box pr="1rem" width="10%">
        <Text color="gray" fontSize="0.7rem">
          {data?.name}
        </Text>
      </Box>
      <Box px="0rem" width="15%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.spend.value}
            {data?.spend.increment || data?.spend.decrement}
          </Text>
        ) : (
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="darkGray" fontSize="0.9rem">
              {data?.spend.value}
            </Text>
            <Text pr="1rem" fontSize="0.78rem">
              {data?.spend.increment ? (
                <Flex color="green" alignItems="center">
                  <TriangleUpIcon w={2.5} mr="0.3rem" />
                  {data?.spend.increment}
                </Flex>
              ) : (
                <Flex color="primaryRed" alignItems="center">
                  <TriangleDownIcon w={2.5} mr="0.3rem" />
                  {data?.spend.decrement}
                </Flex>
              )}
            </Text>
          </Flex>
        )}
      </Box>
      <Box pr="1.5rem" width="16%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.nr.value}
            {data?.nr.increment || data?.nr.decrement}
          </Text>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.nr.value}
              </Text>
              <Text px="0.2rem" fontSize="0.78rem">
                {data?.nr.increment ? (
                  <Flex color="green" alignItems="center">
                    <TriangleUpIcon w={2.5} mr="0.3rem" />
                    {data?.nr.increment}
                  </Flex>
                ) : (
                  <Flex color="primaryRed" alignItems="center">
                    <TriangleDownIcon w={2.5} mr="0.3rem" />
                    {data?.nr.decrement}
                  </Flex>
                )}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0rem" width="15%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.maco.value}
            {data?.maco.increment || data?.maco.decrement}
          </Text>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.maco.value}
              </Text>
              <Text pr="1.5rem" fontSize="0.78rem">
                {data?.maco.increment ? (
                  <Flex color="green" alignItems="center">
                    <TriangleUpIcon w={2.5} mr="0.3rem" />
                    {data?.maco.increment}
                  </Flex>
                ) : (
                  <Flex color="primaryRed" alignItems="center">
                    <TriangleDownIcon w={2.5} mr="0.3rem" />
                    {data?.maco.decrement}
                  </Flex>
                )}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0.5rem" width="18%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.volume.value}
            {data?.volume.increment || data?.volume.decrement}
          </Text>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.volume.value}
              </Text>
              <Text pr="2rem" fontSize="0.78rem">
                {data?.volume.increment ? (
                  <Flex color="green" alignItems="center">
                    <TriangleUpIcon w={2.5} mr="0.3rem" />
                    {data?.volume.increment}
                  </Flex>
                ) : (
                  <Flex color="primaryRed" alignItems="center">
                    <TriangleDownIcon w={2.5} mr="0.3rem" />
                    {data?.volume.decrement}
                  </Flex>
                )}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0.5rem" width="15%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.roi.value}
            {data?.roi.increment || data?.roi.decrement}
          </Text>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.roi.value}
              </Text>
              <Text pr="2rem" fontSize="0.78rem">
                {data?.roi.increment ? (
                  <Flex color="green" alignItems="center">
                    <TriangleUpIcon w={2.5} mr="0.3rem" />
                    {data?.roi.increment}
                  </Flex>
                ) : (
                  <Flex color="primaryRed" alignItems="center">
                    <TriangleDownIcon w={2.5} mr="0.3rem" />
                    {data?.roi.decrement}
                  </Flex>
                )}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0.3rem" width="11%" mr="1.5rem">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.woa.value}
            {data?.woa.increment || data?.woa.decrement}
          </Text>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.woa.value}
              </Text>
              <Text pr="2rem" fontSize="0.78rem">
                {data?.woa.increment ? (
                  <Flex color="green" alignItems="center">
                    <TriangleUpIcon w={2.5} mr="0.3rem" />
                    {data?.woa.increment}
                  </Flex>
                ) : (
                  <Flex color="primaryRed" alignItems="center">
                    <TriangleDownIcon w={2.5} mr="0.3rem" />
                    {data?.woa.decrement}
                  </Flex>
                )}
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
              {data?.qwoa.increment || data?.qwoa.decrement}
            </Text>
          </Flex>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="darkGray" fontSize="0.9rem">
                {data?.qwoa.value}
              </Text>
              <Text pr="1.5rem" fontSize="0.78rem">
                {data?.qwoa.increment ? (
                  <Flex color="green" alignItems="center">
                    <TriangleUpIcon w={2.5} mr="0.3rem" />
                    {data?.qwoa.increment}
                  </Flex>
                ) : (
                  <Flex color="primaryRed" alignItems="center">
                    <TriangleDownIcon w={2.5} mr="0.3rem" />
                    {data?.qwoa.decrement}
                  </Flex>
                )}
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

export default BrandResultsTableRows;
