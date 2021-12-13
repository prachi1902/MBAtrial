import React, { useMemo, useState } from "react";
import { Flex } from "@chakra-ui/react";

const Row = (props) => {
  const [macoValue, setMacoValue] = useState(0);
  useMemo(() => {
    let total = 0;
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].forEach((month) => {
      total = parseFloat(props[month]) + total;
    });
    setMacoValue(total);
  }, [props]);
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
        {props.Brand}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="22%"
      >
        {macoValue.toFixed(2)}
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
