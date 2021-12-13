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
import { InputBudget } from "@/components/FormComponents";

const Table = ({ children }) => {
  return (
    <Box maxH="575px" position="relative" overflowX="hidden" overflowY="auto">
      <Box
        width="1px"
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
    "OPTIMAL (%)",
    "OPT EFFICACY",
    "CUSTOM (%)",
    "CUSTOM EFFICACY",
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
      <Grid width="78.5%" templateColumns="2.5fr 1.5fr 3fr 7fr">
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
                bg="rgba(0,0,0,0.1)"
                variant="gray"
                isRound
                size="sm"
                icon={<Img src="/svg/collapse.svg" />}
              />
            ) : (
              <IconButton
                bg="rgba(0,0,0,0.1)"
                variant="gray"
                isRound
                size="sm"
                icon={<Img src="/svg/expand.svg" />}
              />
            ))}
        </Flex>
        <Grid width="78.5%" templateColumns="2.5fr 1.5fr 3fr 7fr">
          {[...Array(4)].map((item, i) => (
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
  const rowData = ["-", "1", "-", "0.9"];
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
                bg="rgba(0,0,0,0.1)"
                isRound
                variant="gray"
                size="sm"
                icon={<Img src="/svg/collapse.svg" />}
              />
            ) : (
              <IconButton
                bg="rgba(0,0,0,0.1)"
                isRound
                variant="gray"
                size="sm"
                icon={<Img src="/svg/expand.svg" />}
              />
            ))}
        </Flex>
        <Grid width="78.5%" templateColumns="2.5fr 1.5fr 3fr 7fr">
          {rowData.map((item, i) => (
            <Text
              key={i}
              py="0.75rem"
              borderLeft={i ? "solid 1px #ccc" : "none"}
              pl="1rem"
              fontSize="0.875rem"
            >
              {item}
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
  const subRowData = [
    "25%",
    "-",
    <InputBudget
      key={1}
      flexProps={{ border: "solid 1px #811E1C", height: "32px" }}
    />,
    "-",
  ];
  return (
    <Flex bg="#f4f4f4">
      <Text pl="3rem" py="0.75rem" width="22.5%" fontSize="0.875rem">
        {title}
      </Text>
      <Grid width="78.5%" templateColumns="2.5fr 1.5fr 3fr 7fr">
        {subRowData.map((item, i) => (
          <Text
            key={i}
            py="0.5rem"
            borderLeft={i ? "solid 1px #ccc" : "none"}
            pl={i === 2 ? "0.7rem" : "1.125rem"}
            pr={i === 2 && "0.7rem"}
            fontSize="0.875rem"
          >
            {item}
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
