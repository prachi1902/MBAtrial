import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import helper from "@/lib/helper";

const BrandKPIsRow = ({
  spend = 0,
  nr = 0,
  name = 0,
  maco = 0,
  volume = 0,
  roi = 0,
  woa = 0,
  qwoa = 0,
  tag = false,
  hp = 0,
  compareValues = {
    spend: 0,
    volume: 0,
    maco: 0,
    nr: 0,
    roi: 0,
    woa: 0,
    qwoa: 0,
    hiatus: 0,
  },
}) => {
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
          {name}
        </Text>
      </Box>
      <Box pl="0.5rem" width="13%">
        {tag ? (
          <Text fontSize="1.1rem">
            {spend ? helper.currencyFormatter(spend) : "-"}
          </Text>
        ) : (
          <Flex alignItems="center">
            <Text color="darkGray" fontSize="0.9rem" mr="1rem">
              {spend ? helper.currencyFormatter(spend) : "-"}
            </Text>
            {spend ? (
              <Text
                color={compareValues.spend - spend >= 0 ? "green" : "red"}
                fontSize="0.78rem"
              >
                {compareValues.spend - spend >= 0 ? (
                  <TriangleUpIcon w={2.5} mr="0.3rem" />
                ) : (
                  <TriangleDownIcon w={2.5} mr="0.3rem" />
                )}
                {(((compareValues.spend - spend) / spend) * 100).toFixed(1)}%
              </Text>
            ) : null}
          </Flex>
        )}
      </Box>
      <Box pl="0.5rem" pr="1rem" width="13%">
        {tag ? (
          <Text fontSize="1.1rem">
            {nr ? helper.currencyFormatter(nr) : "-"}
          </Text>
        ) : (
          <Flex alignItems="center">
            <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
              {nr ? helper.currencyFormatter(nr) : "-"}
            </Text>
            {nr ? (
              <Text
                color={compareValues.nr - nr >= 0 ? "green" : "red"}
                fontSize="0.78rem"
              >
                {compareValues.nr - nr >= 0 ? (
                  <TriangleUpIcon w={2.5} mr="0.3rem" />
                ) : (
                  <TriangleDownIcon w={2.5} mr="0.3rem" />
                )}
                {(((compareValues.nr - nr) / nr) * 100).toFixed(1)}%
              </Text>
            ) : null}
          </Flex>
        )}
      </Box>
      <Box px="0rem" width="11%">
        {tag ? (
          <Text fontSize="1.1rem">
            {maco ? helper.currencyFormatter(maco) : "-"}
          </Text>
        ) : (
          <Flex alignItems="center">
            <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
              {maco ? helper.currencyFormatter(maco) : "-"}
            </Text>
            {maco ? (
              <Text
                color={compareValues.maco - maco >= 0 ? "green" : "red"}
                fontSize="0.78rem"
              >
                {compareValues.maco - maco >= 0 ? (
                  <TriangleUpIcon w={2.5} mr="0.3rem" />
                ) : (
                  <TriangleDownIcon w={2.5} mr="0.3rem" />
                )}
                {(((compareValues.maco - maco) / maco) * 100).toFixed(1)}%
              </Text>
            ) : null}
          </Flex>
        )}
      </Box>
      <Box px="0.5rem" width="13%">
        {tag ? (
          <Text fontSize="1.1rem">
            {volume ? (volume / 1000).toFixed(0) + "K HL" : "-"}
          </Text>
        ) : (
          <Flex alignItems="center">
            <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
              {volume ? (volume / 1000).toFixed(0) + "K HL" : "-"}
            </Text>
            {volume ? (
              <Text
                color={compareValues.volume - volume >= 0 ? "green" : "red"}
                fontSize="0.78rem"
              >
                {compareValues.volume - volume >= 0 ? (
                  <TriangleUpIcon w={2.5} mr="0.3rem" />
                ) : (
                  <TriangleDownIcon w={2.5} mr="0.3rem" />
                )}
                {(((compareValues.volume - volume) / volume) * 100).toFixed(1)}%
              </Text>
            ) : null}
          </Flex>
        )}
      </Box>
      <Box px="0.5rem" width="11%">
        {tag ? (
          <Text fontSize="1.1rem">{roi ? "$" + roi.toFixed(2) : "-"}</Text>
        ) : (
          <Flex alignItems="center">
            <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
              {roi ? helper.currencyFormatter(roi) : "-"}
            </Text>
            {roi ? (
              <Text
                color={compareValues.roi - roi >= 0 ? "green" : "red"}
                fontSize="0.78rem"
              >
                {compareValues.roi - roi >= 0 ? (
                  <TriangleUpIcon w={2.5} mr="0.3rem" />
                ) : (
                  <TriangleDownIcon w={2.5} mr="0.3rem" />
                )}
                {(((compareValues.roi - roi) / roi) * 100).toFixed(1)}%
              </Text>
            ) : null}
          </Flex>
        )}
      </Box>
      <Box px="0.3rem" width="9%">
        {tag ? (
          <Text fontSize="1.1rem">{woa ? woa : "-"}</Text>
        ) : (
          <Flex alignItems="center">
            <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
              {woa ? woa : "-"}
            </Text>
            {woa ? (
              <Text
                color={compareValues.woa - woa >= 0 ? "green" : "red"}
                fontSize="0.78rem"
              >
                {compareValues.woa - woa >= 0 ? (
                  <TriangleUpIcon w={2.5} mr="0.3rem" />
                ) : (
                  <TriangleDownIcon w={2.5} mr="0.3rem" />
                )}
                {compareValues.woa - woa}w
              </Text>
            ) : null}
          </Flex>
        )}
      </Box>
      <Box pl="0.5rem" width="9%" mr="0.5rem">
        {tag ? (
          <Flex alignItems="center">
            <Text fontSize="1.1rem">{qwoa ? qwoa : "-"}</Text>
          </Flex>
        ) : (
          <Flex alignItems="center">
            <Text color="darkGray" fontSize="0.9rem" mr="0.5rem">
              {qwoa ? qwoa : "-"}
            </Text>
            {qwoa && compareValues.qwoa ? (
              <Text
                color={compareValues.qwoa - qwoa >= 0 ? "green" : "red"}
                fontSize="0.78rem"
              >
                {compareValues.qwoa - qwoa >= 0 ? (
                  <TriangleUpIcon w={2.5} mr="0.3rem" />
                ) : (
                  <TriangleDownIcon w={2.5} mr="0.3rem" />
                )}
                {compareValues.qwoa - qwoa}w
              </Text>
            ) : null}
          </Flex>
        )}
      </Box>
      <Box width="11%">
        {tag ? (
          <Text fontSize="1.1rem">{hp === 0 ? 0 : hp ? hp : "-"}</Text>
        ) : (
          <>
            <Flex alignItems="center">
              <Text color="darkGray" fontSize="0.9rem">
                {hp === 0 ? 0 : hp ? hp : "-"}
              </Text>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default BrandKPIsRow;
