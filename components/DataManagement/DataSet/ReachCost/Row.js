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
        width="22%"
      >
        {props.Country}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="22%"
      >
        {props.Vehicle}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="22%"
      >
        {props.SubVehicle}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="22%"
      >
        {props.Target_Group}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="22%"
      >
        {props.Reach}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="22%"
      >
        {props.Spend}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="22%"
      >
        {props.Year}
      </Flex>
    </Flex>
  );
};

export default React.memo(Row);
