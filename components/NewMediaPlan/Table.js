import React, { useState } from "react";
import {
  Flex,
  Text,
  Img,
  Grid,
  Button,
  Box,
  IconButton,
} from "@chakra-ui/react";
import CustomScrollbar from "components/common/CustomScrollbar";

const Table = ({ children }) => {
  return (
    <Box maxH="575px" position="relative" overflowX="hidden" overflowY="auto">
      <Box
        width="2px"
        top="0"
        height="100%"
        left="22%"
        zIndex="5"
        position="absolute"
        bg="#666"
      />
      <CustomScrollbar height="575px">{children}</CustomScrollbar>
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
        width="22.5%"
        fontSize="0.8rem"
      >
        VEHICLE
      </Text>
      <Grid width="78.5%" templateColumns="repeat(11, 1fr) 1.75fr">
        {months.map((month, i) => (
          <Text
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

const CategoryRow = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Flex cursor="pointer" bg="#f0eae3">
        <Flex
          px="1rem"
          py={children ? "0.5rem" : "0.875rem"}
          width="22.5%"
          align="center"
          justify="space-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="0.8rem" fontWeight="600">
            {title}
          </Text>
          {children &&
            (isOpen ? (
              <IconButton
                border="none"
                bg="rgba(0,0,0,0.1)"
                isRound
                size="sm"
                icon={<Img src="/svg/collapse.svg" />}
              />
            ) : (
              <IconButton
                border="none"
                bg="rgba(0,0,0,0.1)"
                isRound
                size="sm"
                icon={<Img src="/svg/expand.svg" />}
              />
            ))}
        </Flex>
        <Grid width="78.5%" templateColumns="repeat(11, 1fr) 1.75fr">
          {[...Array(12)].map((item, i) => (
            <Text
              key={i}
              py="0.75rem"
              borderLeft={i ? "solid 1px #ccc" : "none"}
              pl="1rem"
              fontSize="0.8rem"
            >
              -
            </Text>
          ))}
        </Grid>
      </Flex>
      <Box overflow="hidden" height={isOpen ? "auto" : "0"}>
        {children}
      </Box>
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
          width="22.5%"
          align="center"
          justify="space-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="0.875rem">{title}</Text>
          {children &&
            (isOpen ? (
              <IconButton
                border="none"
                bg="rgba(0,0,0,0.1)"
                isRound
                size="sm"
                icon={<Img src="/svg/collapse.svg" />}
              />
            ) : (
              <IconButton
                border="none"
                bg="rgba(0,0,0,0.1)"
                isRound
                size="sm"
                icon={<Img src="/svg/expand.svg" />}
              />
            ))}
        </Flex>
        <Grid width="78.5%" templateColumns="repeat(11, 1fr) 1.75fr">
          {[...Array(12)].map((item, i) => (
            <Text
              key={i}
              py="0.75rem"
              borderLeft={i ? "solid 1px #ccc" : "none"}
              pl="1rem"
              fontSize="0.875rem"
            >
              Value
            </Text>
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
      <Text pl="3rem" py="0.875rem" width="22.5%" fontSize="0.875rem">
        {title}
      </Text>
      <Grid width="78.5%" templateColumns="repeat(11, 1fr) 1.75fr">
        {[...Array(12)].map((item, i) => (
          <Text
            key={i}
            py="0.75rem"
            borderLeft={i ? "solid 1px #ccc" : "none"}
            pl="1.125rem"
            fontSize="0.875rem"
          >
            Value
          </Text>
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
