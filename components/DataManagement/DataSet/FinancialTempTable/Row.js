import React from "react";
import { Flex } from "@chakra-ui/react";

const Row = (props) => {
  return (
    <Flex
      justifyContent="space-between"
      borderTop="solid 1px #F7F6F7"
      width="100%"
      fontSize="0.875rem"
      bg="white"
      height="3.5rem"
    >
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="10%"
      >
        {props.Country}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="10%"
      >
        {props.Brand}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="12%"
      >
        {props.Category}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="14%"
      >
        {props.Vehicle}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="14%"
      >
        {props.SubVehicle}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="14%"
      >
        {props.Format}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="8%"
      >
        {props.MediaMACO}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="8%"
      >
        {props.MediaNR}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="8%"
      >
        {props.MediaROI}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="8%"
      >
        {props.MediaSpend}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="8%"
      >
        {props.MediaVolume}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="6%"
      >
        {props.Year}
      </Flex>
    </Flex>
  );
};

export default React.memo(Row);
