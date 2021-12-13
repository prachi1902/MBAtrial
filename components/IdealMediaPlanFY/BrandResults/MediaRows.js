import React, { useEffect } from "react";
import { Flex, Img, Box, Text, Divider } from "@chakra-ui/react";
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
      <Box width="9%">
        <Text
          fontSize="0.75rem"
          textTransform="uppercase"
          color="darkGray"
          letterSpacing="0.03rem"
          fontWeight="500"
        >
          {data?.name}
        </Text>
      </Box>
      <Box pl="0.5rem" width="13%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.spend.value}
            {data?.spend.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center">
              <Text color="darkGray" fontSize="0.9rem" mr="1rem">
                {data?.spend.value}
              </Text>
              <Text color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.spend.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box pl="0.5rem" pr="1.5rem" width="13%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.nr.value}
            {data?.nr.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center">
              <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
                {data?.nr.value}
              </Text>
              <Text color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.1rem" />
                {data?.nr.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box pl="0.5rem" width="11%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.maco.value}
            {data?.maco.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center">
              <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
                {data?.maco.value}
              </Text>
              <Text color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.maco.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box pl="0.5rem" width="13%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.volume.value}
            {data?.volume.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center">
              <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
                {data?.volume.value}
              </Text>
              <Text color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.volume.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0.5rem" width="11%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.roi.value}
            {data?.roi.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center">
              <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
                {data?.roi.value}
              </Text>
              <Text color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.roi.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box px="0.5rem" width="9%">
        {data.tag === "true" ? (
          <Text fontSize="1.1rem">
            {data?.woa.value}
            {data?.woa.increment}
          </Text>
        ) : (
          <>
            <Flex alignItems="center">
              <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
                {data?.woa.value}
              </Text>
              <Text color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.woa.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box pl="0.5rem" width="9%" mr="0.5rem">
        {data.tag === "true" ? (
          <Flex alignItems="center">
            <Text fontSize="1.1rem">{data?.qwoa.value}</Text>
            <Text fontSize="0.875rem" pl="0.6rem">
              {data?.qwoa.increment}
            </Text>
          </Flex>
        ) : (
          <>
            <Flex alignItems="center">
              <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
                {data?.qwoa.value}
              </Text>
              <Text color="green" fontSize="0.78rem">
                <TriangleUpIcon w={2.5} mr="0.3rem" />
                {data?.qwoa.increment}
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Box width="11%">
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
