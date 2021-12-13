import React, { useMemo, useState } from "react";
import { Flex } from "@chakra-ui/react";

const Row = (props) => {
  const [mediaVolume, setMediaVolume] = useState(0);
  useMemo(() => {
    let total = 0;
    weeks.forEach((week, index) => {
      if (props[week]) {
        total = parseFloat(props[week]) + total;
      }
    });
    setMediaVolume(total);
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
        width="12%"
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
        width="15%"
      >
        {props.Vehicle}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="15%"
      >
        {props.SubVehicle}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="15%"
      >
        {props.Format}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="15%"
      >
        {mediaVolume.toFixed(2)}
      </Flex>
      <Flex
        px="0.5rem"
        align="center"
        height="100%"
        borderRight="solid 1px #ccc"
        width="8%"
      >
        {props.Year}
      </Flex>
    </Flex>
  );
};

export default React.memo(Row);

const weeks = [
  "WK1",
  "WK2",
  "WK3",
  "WK4",
  "WK5",
  "WK6",
  "WK7",
  "WK8",
  "WK9",
  "WK10",
  "WK11",
  "WK12",
  "WK13",
  "WK14",
  "WK15",
  "WK16",
  "WK17",
  "WK18",
  "WK19",
  "WK20",
  "WK21",
  "WK22",
  "WK23",
  "WK24",
  "WK25",
  "WK26",
  "WK27",
  "WK28",
  "WK29",
  "WK30",
  "WK31",
  "WK32",
  "WK33",
  "WK34",
  "WK35",
  "WK36",
  "WK37",
  "WK38",
  "WK39",
  "WK40",
  "WK41",
  "WK42",
  "WK43",
  "WK44",
  "WK45",
  "WK46",
  "WK47",
  "WK48",
  "WK49",
  "WK50",
  "WK51",
  "WK52",
];
