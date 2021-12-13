import React, { useState } from "react";
import { Flex, Img, Box, Text, Divider } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";

import helper from "@/lib/helper";

const RowForm = ({ data }) => {
  const [showImage, setShowImage] = useState(true);
  const router = useRouter();
  return (
    <Flex
      mt="0.5rem"
      alignItems="center"
      justifyContent="space-between"
      p="0.5rem"
      width="100%"
      cursor="pointer"
      bg="white"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
      borderRadius="8px"
      height="6.2rem"
      onClick={() => router.push(`/new-media/${data.id}`)}
    >
      <Flex
        alignItems="center"
        px="0.5rem"
        borderRadius="5px"
        border="1px solid imageBorder"
        height="100%"
        width="9%"
      >
        {showImage ? (
          <Img
            onError={() => setShowImage(false)}
            maxW="100%"
            maxH="100%"
            mx="auto"
            src={`/Logos/Brand_Logos/${helper.toTitleCase(data.brand)}.png`}
          />
        ) : (
          helper.toTitleCase(data.brand)
        )}
      </Flex>
      <Box px="0.5rem" width="3.5%">
        <Text fontSize="0.87rem" textTransform="uppercase">
          {data.country}
        </Text>
      </Box>
      <Box px="0.5rem" width="4%">
        <Text fontSize="0.87rem" textTransform="uppercase">
          {data.period}
        </Text>
      </Box>
      <Box px="0.5rem" width="4%">
        <Text fontSize="0.87rem">{data.year}</Text>
      </Box>
      <Flex
        bg={data.status === "PLANNING" ? "formBgGray" : "#D5E8E2"}
        alignItems="center"
        width="51.5%"
        height="5rem"
        borderRadius="8px"
        border={data.status === "PLANNING" ? "none" : "1px solid #82C1AB"}
      >
        <Box width="13.59%" px="0.5rem">
          <Text fontWeight="600" fontSize="0.87rem">
            {data.spend ? helper.currencyFormatter(data.spend) : "-"}
          </Text>
        </Box>
        <Box width="15.53%" px="0.5rem">
          <Text fontWeight="600" fontSize="0.87rem">
            {data.media_nr ? helper.currencyFormatter(data.media_nr) : "-"}
          </Text>
        </Box>
        <Box width="13.59%" px="0.5rem">
          <Text fontWeight="600" fontSize="0.87rem">
            {data.media_roi ? "$" + data.media_roi.toFixed(2) : "-"}
          </Text>
        </Box>
        <Divider
          orientation="vertical"
          borderColor={data.status === "PLANNING" ? "lightGray" : "#82C1AB"}
        />
        <Box width="14.56%" px="0.5rem">
          <Text fontWeight="600" fontSize="0.87rem">
            {data.vehicle_mix}
          </Text>
        </Box>
        <Box width="25.24%" px="0.5rem">
          <Text fontWeight="600" fontSize="0.87rem">
            {data.cost_exc_mix}
          </Text>
        </Box>
        <Box width="17.47%" px="0.5rem">
          <Text fontWeight="600" fontSize="0.87rem">
            {data.effectiveness}
          </Text>
        </Box>
      </Flex>
      <Box px="0.5rem" width="8%">
        <Text fontSize="0.87rem">{data.plan_by}</Text>
      </Box>
      <Box px="0.5rem" width="7%">
        <Text fontSize="0.87rem">
          {moment.utc(data.modified).local().format("DD/MM/YYYY")}
        </Text>
        <Text fontSize="0.87rem">
          {moment.utc(data.modified).local().format("hh:mm a")}
        </Text>
      </Box>
      <Box px="0.5rem" width="7%">
        <Text fontWeight="600" fontSize="0.87rem" textAlign="center">
          {data.scenario}
        </Text>
      </Box>
      <Box px="0.5rem" width="7%">
        {data.status === "PLANNING" ? (
          <Text
            fontWeight="600"
            textTransform="uppercase"
            fontSize="0.87rem"
            color="#972523"
            textAlign="right"
          >
            {data.status}
          </Text>
        ) : (
          <Text
            fontWeight="600"
            textTransform="uppercase"
            fontSize="0.87rem"
            color="#3BA17D"
            textAlign="right"
          >
            {data.status}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default RowForm;
