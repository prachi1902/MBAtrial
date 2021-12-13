import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Img,
  Grid,
  Box,
  IconButton,
  Collapse,
} from "@chakra-ui/react";

import CustomScrollbar from "components/common/CustomScrollbar";
import { StyledInput } from "@/components/FormComponents/FormatInput";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const Table = ({ children, showTable }) => {
  return (
    <Box
      maxH="575px"
      display={showTable ? "block" : "none"}
      position="relative"
      maxWidth="200%"
      overflowX="auto"
      overflowY="auto"
    >
      <CustomScrollbar height="575px" horizontal={false}>
        {children}
      </CustomScrollbar>
    </Box>
  );
};

const Columns = () => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return (
    <Flex bg="#ddd">
      <Text
        fontWeight="600"
        pl="1rem"
        py="0.5rem"
        width="12rem"
        minW="12rem"
        fontSize="0.8rem"
        borderRight="1px solid #ccc"
      >
        VEHICLE
      </Text>
      <Grid width="100%" templateColumns="repeat(12, 1fr)">
        {months.map((month, i) => (
          <Text
            width="5rem"
            key={i}
            py="0.5rem"
            borderLeft={i ? "solid 1px #ccc" : "none"}
            pl="1rem"
            fontSize="0.8rem"
            fontWeight="600"
          >
            {month}
          </Text>
        ))}
      </Grid>
    </Flex>
  );
};

const CategoryRow = ({ title, children, values }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Flex cursor="pointer" bg="#f0eae3">
        <Flex
          px="1rem"
          py={children ? "0.5rem" : "0.875rem"}
          width="12rem"
          minW="12rem"
          align="center"
          justify="space-between"
          borderRight="1px solid #ccc"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="0.8rem" fontWeight="600">
            {title}
          </Text>
          {children &&
            (isOpen ? (
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
            ))}
        </Flex>
        <Grid width="100%" templateColumns="repeat(12, 1fr)">
          {[
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ].map((item, i) => (
            <Box
              width="5rem"
              key={i}
              py="0.75rem"
              borderLeft={i ? "solid 1px #ccc" : "none"}
              pl="1rem"
              fontSize="0.8rem"
            >
              -
            </Box>
          ))}
        </Grid>
      </Flex>
      <Collapse in={isOpen}>{children}</Collapse>
    </>
  );
};

const Row = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Flex borderBottom="solid 1px #eee" cursor="pointer" bg="#fff">
        <Flex
          pr="1rem"
          pl="2rem"
          py={children ? "0.5rem" : "0.875rem"}
          width="12rem"
          minW="12rem"
          borderRight="1px solid #ccc"
          align="center"
          justify="space-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="0.875rem">{title}</Text>
          {children &&
            (isOpen ? (
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
            ))}
        </Flex>
        <Grid width="100%" templateColumns="repeat(12, 1fr)">
          {[
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ].map((item, i) => (
            <Cell title={title} item={item} key={title + item} />
          ))}
        </Grid>
      </Flex>
      <Box overflow="hidden" height={isOpen ? "auto" : "0"}>
        {children}
      </Box>
    </>
  );
};

const Cell = ({ title, item }) => {
  const { mediaPlanDispatch, mediaPlanState } = useMediaPlan();
  useEffect(() => {
    if (!mediaPlanState.impMediaInflationValues[item + title])
      mediaPlanDispatch.updateIMPMIValues({
        [item + title]: {
          maco_per_hl: 0,
          month: item,
          vehicles: title,
        },
      });
  }, [mediaPlanState.selectedPlan.id]);
  return (
    <Box
      width="5rem"
      py="0.75rem"
      borderLeft={item !== "JAN" ? "solid 1px #ccc" : "none"}
      px="0.5rem"
      minHeight="3.5rem"
      fontSize="0.875rem"
    >
      <Box height="2rem">
        <StyledInput
          fontSize="0.875rem"
          defaultValue={0}
          max={1}
          min={-1}
          height="2rem"
          name="value"
          disabled={mediaPlanState.selectedPlan?.hasExecuted}
          suffix="%"
          value={
            mediaPlanState.impMediaInflationValues[item + title]?.maco_per_hl
          }
          onValueChange={(values) => {
            const { floatValue } = values;
            mediaPlanDispatch.updateIMPMIValues({
              [item + title]: {
                maco_per_hl: floatValue,
                month: item,
                vehicles: title,
              },
            });
          }}
          thousandSeparator={true}
        />
      </Box>
      <Text color="primaryRed">
        {parseFloat(
          mediaPlanState.impMediaInflationValues[item + title]?.maco_per_hl
        ) > 100
          ? "Max is 100"
          : parseFloat(
              mediaPlanState.impMediaInflationValues[item + title]?.maco_per_hl
            ) < -100
          ? "Min is -100"
          : ""}
      </Text>
    </Box>
  );
};

Table.Columns = Columns;
Table.Row = Row;
Table.CategoryRow = CategoryRow;

export default Table;
