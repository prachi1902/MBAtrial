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
    <Box className="table-with-scrollbar" maxHeight="575px" overflow="auto">
      <table style={{ width: "100%" }}>{children}</table>
    </Box>
  );
};

const Columns = () => {
  const columns = ["Total", ...weeks];
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
        fontSize="0.8rem"
        borderRight="1px solid #ccc"
      >
        VEHICLE
      </Text>
      <Grid templateColumns="repeat(53, 1fr)">
        {columns.map((column, i) => (
          <Text
            minW="5rem"
            key={i}
            py="0.5rem"
            as="th"
            position="sticky"
            bg="#ddd"
            left={i ? "unset" : "12rem"}
            zIndex={i ? "1" : "2"}
            top="0"
            borderRight={i ? "none" : "solid 1px #ccc"}
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

const CategoryRow = ({ title, children, values }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Flex as="tr" width="min-content" cursor="pointer" bg="#f0eae3">
        <Flex
          position="sticky"
          left="0"
          bg="#f0eae3"
          zIndex="2"
          px="1rem"
          py={children ? "0.5rem" : "0.875rem"}
          minWidth="12rem"
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
        <Grid templateColumns="repeat(53, 1fr)">
          {["total", ...weeks].map((item, i) => (
            <Box
              key={i}
              bg="#f0eae3"
              position="sticky"
              left={i ? "unset" : "12rem"}
              zIndex={i ? "1" : "2"}
              minW="5rem"
              py="0.75rem"
              as="td"
              borderRight="solid 1px #ccc"
              pl="1rem"
              fontSize="0.8rem"
            >
              {helper.currencyFormatter(values[item])}
            </Box>
          ))}
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
      <Flex
        as="tr"
        borderBottom="solid 1px #eee"
        width="min-content"
        cursor="pointer"
      >
        <Flex
          pr="1rem"
          pl="2rem"
          py={children ? "0.5rem" : "0.875rem"}
          minWidth="12rem"
          borderRight="1px solid #ccc"
          align="center"
          justify="space-between"
          onClick={() => setIsOpen(!isOpen)}
          position="sticky"
          zIndex="2"
          left="0"
          bg="#fff"
          as="td"
        >
          <Text fontSize="0.8rem">{title}</Text>
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
        <Grid templateColumns="repeat(53, 1fr)">
          {["total", ...weeks].map((item, i) => (
            <Box
              key={i}
              minW="5rem"
              bg="#fff"
              position="sticky"
              left={i ? "unset" : "12rem"}
              zIndex={i ? "1" : "2"}
              py="0.75rem"
              borderRight="solid 1px #ccc"
              pl="1rem"
              fontSize="0.875rem"
              as="td"
            >
              {helper.currencyFormatter(values[item]) || "-"}
            </Box>
          ))}
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
    <Flex bg="#f4f4f4">
      <Text
        pl="3rem"
        py="0.875rem"
        width="14.7%"
        borderRight="1px solid #ccc"
        fontSize="0.875rem"
      >
        {title}
      </Text>
      <Grid width="78.5%" templateColumns="repeat(53, 1fr) 1.75fr">
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

const weeks = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
];
