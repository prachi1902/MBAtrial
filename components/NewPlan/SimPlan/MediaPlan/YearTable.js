import React, { useState } from "react";
import {
  Flex,
  Text,
  Img,
  Grid,
  Box,
  IconButton,
  Collapse,
} from "@chakra-ui/react";

import helper from "@/lib/helper";

const Table = ({ children }) => {
  return (
    <Box
      className="table-with-scrollbar"
      maxHeight="575px"
      position="relative"
      overflow="auto"
    >
      <table style={{ width: "100%" }}>{children}</table>
    </Box>
  );
};

const Columns = () => {
  const months = ["Spend", "INC NR", "INC MACO", "INC VOLUME", "MEDIA ROI"];

  return (
    <Flex as="thead" position="sticky" top="0" zIndex="2" bg="#ddd">
      <Text
        fontWeight="600"
        as="th"
        py="0.5rem"
        minWidth="12rem"
        width="12rem"
        fontSize="0.8rem"
        borderRight="1px solid #ccc"
      >
        VEHICLE
      </Text>
      <Grid width="100%" bg="#ddd" templateColumns="repeat(5, 1fr)">
        {months.map((month, i) => (
          <Text
            key={i}
            py="0.5rem"
            as="th"
            borderLeft={i ? "solid 1px #ccc" : "none"}
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
      <Flex as="tr" cursor="pointer" bg="#f0eae3">
        <Flex
          px="1rem"
          py={children ? "0.5rem" : "0.875rem"}
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
        <Grid width="100%" bg="#f0eae3" templateColumns="repeat(5, 1fr)">
          {[
            "opt_planned_spend",
            "final_nr",
            "final_maco",
            "final_adjusted_volume",
          ].map((item, i) => (
            <Box
              key={i}
              as="td"
              py="0.75rem"
              borderLeft={i ? "solid 1px #ccc" : "none"}
              pl="1rem"
              fontSize="0.8rem"
            >
              {helper.currencyFormatter(values[item])}
            </Box>
          ))}
          <Box
            py="0.75rem"
            borderLeft="solid 1px #ccc"
            pl="1rem"
            fontSize="0.875rem"
          >
            {helper.currencyFormatter(
              values.final_maco / values.opt_planned_spend
            ) || "-"}
          </Box>
        </Grid>
      </Flex>
      <Collapse in={isOpen}>{children}</Collapse>
    </>
  );
};

const Row = ({ title, children, values }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Flex as="tr" borderBottom="solid 1px #eee" cursor="pointer" bg="#fff">
        <Flex
          pr="1rem"
          pl="2rem"
          py={children ? "0.5rem" : "0.875rem"}
          minWidth="12rem"
          width="12rem"
          borderRight="1px solid #ccc"
          align="center"
          justify="space-between"
          as="td"
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
        <Grid width="100%" templateColumns="repeat(5, 1fr)">
          {[
            "opt_planned_spend",
            "final_nr",
            "final_maco",
            "final_adjusted_volume",
          ].map((item, i) => (
            <Box
              key={i}
              py="0.75rem"
              borderLeft={i ? "solid 1px #ccc" : "none"}
              pl="1rem"
              fontSize="0.875rem"
              as="td"
            >
              {helper.currencyFormatter(values[item]) || "-"}
            </Box>
          ))}
          <Box
            py="0.75rem"
            borderLeft="solid 1px #ccc"
            pl="1rem"
            fontSize="0.875rem"
          >
            {helper.currencyFormatter(
              values.final_maco / values.opt_planned_spend
            ) || "-"}
          </Box>
        </Grid>
      </Flex>
      <Box overflow="hidden" height={isOpen ? "auto" : "0"}>
        {children}
      </Box>
    </>
  );
};

const SubRow = ({ title }) => {
  return (
    <Flex bg="#f4f4f4" width="100%">
      <Text
        pl="3rem"
        py="0.875rem"
        minWidth="12rem"
        width="12rem"
        borderRight="1px solid #ccc"
        fontSize="0.875rem"
      >
        {title}
      </Text>
      <Grid templateColumns="repeat(11, 1fr) 1.75fr">
        {[...Array(12)].map((item, i) => (
          <Box
            key={i}
            py="0.75rem"
            borderLeft={i ? "solid 1px #ccc" : "none"}
            pl="1.125rem"
            fontSize="0.875rem"
          >
            0
          </Box>
        ))}
      </Grid>
    </Flex>
  );
};

Table.Columns = Columns;
Table.SubRow = SubRow;
Table.Row = Row;
Table.CategoryRow = CategoryRow;

export default Table;
