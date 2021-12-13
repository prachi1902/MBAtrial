import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Img,
  Grid,
  Box,
  IconButton,
  Collapse,
} from "@chakra-ui/react";

import { useMediaPlan } from "redux/MediaPlanSlice";
import helper from "@/lib/helper";
import { StyledInput } from "@/components/FormComponents/FormatInput";

const Table = ({ children }) => {
  return (
    <Box className="table-with-scrollbar" maxHeight="575px" overflow="auto">
      <table style={{ width: "100%" }}>{children}</table>
    </Box>
  );
};

const Columns = () => {
  return (
    <Flex as="thead" top="0" position="sticky" width="min-content" zIndex="3">
      <Text
        fontWeight="600"
        py="0.5rem"
        minWidth="12rem"
        as="th"
        bg="#ddd"
        zIndex="9"
        position="sticky"
        left="0"
        width="12rem"
        fontSize="0.8rem"
        borderRight="1px solid #ccc"
      >
        VEHICLE
      </Text>
      <Grid bg="#ddd" templateColumns="repeat(52, 1fr)">
        {weeks.map((column, i) => (
          <Text
            minW="7rem"
            key={i}
            py="0.5rem"
            as="th"
            borderLeft={i ? "solid 1px #ccc" : "none"}
            fontSize="0.8rem"
            fontWeight="600"
          >
            {column}
          </Text>
        ))}
      </Grid>
    </Flex>
  );
};

const CategoryRow = ({ title, vehicles, data, setData, total }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { mediaPlanState } = useMediaPlan();
  return (
    <>
      <Flex as="tr" width="min-content" cursor="pointer" bg="#f0eae3">
        <Flex
          position="sticky"
          left="0"
          bg="#f0eae3"
          zIndex="2"
          px="1rem"
          py="0.5rem"
          minWidth="12rem"
          width="12rem"
          align="center"
          justify="space-between"
          borderRight="1px solid #ccc"
          onClick={() => setIsOpen(!isOpen)}
          as="td"
        >
          <Text fontSize="0.8rem" fontWeight="600">
            {title}
          </Text>
          {isOpen ? (
            <IconButton
              bg="rgba(0,0,0,0.1)"
              isRound
              size="sm"
              variant="gray"
              icon={<Img src="/svg/collapse.svg" />}
            />
          ) : (
            <IconButton
              bg="rgba(0,0,0,0.1)"
              isRound
              size="sm"
              variant="gray"
              icon={<Img src="/svg/expand.svg" />}
            />
          )}
        </Flex>
        <Grid bg="#f0eae3" templateColumns="repeat(52, 1fr)">
          {weeks.map((item, i) => (
            <Box
              key={i}
              as="td"
              minW="7rem"
              py="0.75rem"
              borderLeft={i ? "solid 1px #ccc" : "none"}
              px="0.5rem"
              fontSize="0.8rem"
              textAlign="center"
            >
              {mediaPlanState.selectedPlan.hasExecuted
                ? helper.currencyFormatter(total[item])
                : "-"}
            </Box>
          ))}
        </Grid>
      </Flex>
      <Collapse in={isOpen}>
        {Object.keys(vehicles).map((vehicle, i) => {
          return (
            <Row
              key={i}
              submitData={data}
              setSubmitData={setData}
              title={vehicle}
              data={vehicles[vehicle]}
            />
          );
        })}
      </Collapse>
    </>
  );
};

const Row = ({ title, data, submitData, setSubmitData }) => {
  return (
    <>
      <Flex
        as="tr"
        borderBottom="solid 1px #eee"
        width="min-content"
        cursor="pointer"
        bg="#fff"
      >
        <Flex
          pr="1rem"
          pl="2rem"
          py="0.875rem"
          minWidth="12rem"
          width="12rem"
          borderRight="1px solid #ccc"
          align="center"
          justify="space-between"
          position="sticky"
          zIndex="2"
          left="0"
          bg="#fff"
          as="td"
        >
          <Text fontSize="0.8rem">{title}</Text>
        </Flex>
        <Grid bg="#fff" templateColumns="repeat(52, 1fr)">
          {data.slice(0, 52).map((item, i) => (
            <Cell
              submitData={submitData}
              setSubmitData={setSubmitData}
              key={title + item.week + i}
              title={title}
              item={item}
              index={i}
            />
          ))}
        </Grid>
      </Flex>
    </>
  );
};

const Cell = ({ title, item, submitData, setSubmitData, index }) => {
  const { mediaPlanState } = useMediaPlan();

  const handleChange = (value) => {
    setSubmitData({
      ...submitData,
      [title + (index + 1)]: {
        country: item.country,
        brand: item.brand,
        vehicle: title,
        week: index + 1,
        planned_spend: value,
        month: item.month,
        maco_per_hl: item.maco_per_hl,
        nr_per_hl: item.nr_per_hl,
        bvt: item.bvt,
        mi: item.mi,
        volume: item.final_adjusted_volume,
        past_year_spend: item.planned_spend,
      },
    });
  };

  return (
    <Box
      width="7rem"
      py="0.5rem"
      borderLeft="solid 1px #ccc"
      textAlign="center"
      fontSize="0.875rem"
    >
      {mediaPlanState.selectedPlan?.hasExecuted ? (
        helper.currencyFormatter(item.planned_spend) || "-"
      ) : (
        <Box mx="0.5rem" width="80%" height="1.8rem">
          <StyledInput
            prefix="$"
            value={submitData[title + (index + 1)]?.planned_spend}
            onValueChange={(values) => {
              const { floatValue } = values;
              handleChange(floatValue);
            }}
            thousandSeparator={true}
            disabled={mediaPlanState.selectedPlan?.hasExecuted}
            defaultValue={parseFloat(item.planned_spend)?.toFixed(2)}
            name="value"
          />
        </Box>
      )}
    </Box>
  );
};

Table.Columns = Columns;
Table.Row = Row;
Table.CategoryRow = CategoryRow;

export default Table;

const weeks = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
];
