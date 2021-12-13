import React, { useState } from "react";
import { Flex, Text, Img, Grid, Box, IconButton } from "@chakra-ui/react";
import CustomScrollbar from "components/common/CustomScrollbar";
import { InputBudget } from "@/components/FormComponents";

const months = ["SPEND", "INC NR", "INC MACO", "INC VOLUME", "MEDIA ROI"];

const Table = ({ children }) => {
  return (
    <Box maxH="575px" position="relative" overflowX="auto" overflowY="auto">
      <CustomScrollbar height="575px">{children}</CustomScrollbar>
    </Box>
  );
};

const Columns = ({ weeks = false, weekArray = [] }) => {
  let weeksNo = [];
  weekArray.map((week) => {
    weeksNo.push(week.week_no);
  });

  return (
    <Flex bg="#ddd">
      <Text
        fontWeight="600"
        pl="1rem"
        py="0.5rem"
        width="22.2%"
        fontSize="0.8rem"
        borderRight="1px solid #ccc"
      >
        VEHICLE
      </Text>
      {weeks ? (
        <Flex width="77.8%">
          {weeksNo.map((w, i) => (
            <Text
              key={i}
              py="0.5rem"
              borderLeft={i ? "solid 1px #ccc" : "none"}
              pl="1rem"
              fontSize="0.8rem"
              fontWeight="600"
              width="75px"
            >
              WK {w}
            </Text>
          ))}
        </Flex>
      ) : (
        <Grid width="77.8%" templateColumns="repeat(4, 1fr) 1.75fr">
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
      )}
    </Flex>
  );
};

const CategoryRow = ({ title, children, data, weeks = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Flex cursor="pointer" bg="#F0EAE3">
        <Flex
          px="1rem"
          py={children ? "0.5rem" : "0.875rem"}
          width="22.2%"
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
        {weeks ? (
          <Flex width="77.8%">
            {data.map((item, i) => (
              <Box
                key={i}
                py="0.75rem"
                borderLeft={i ? "solid 1px #ccc" : "none"}
                fontSize="0.8rem"
                width="75px"
              >
                <InputBudget
                  flexProps={{ height: "32px", width: "85%", margin: "auto" }}
                  defaultValue={item}
                />
              </Box>
            ))}
          </Flex>
        ) : (
          <Grid width="77.8%" templateColumns="repeat(4, 1fr) 1.75fr">
            {data.map((item, i) => (
              <Box
                key={i}
                py="0.75rem"
                borderLeft={i ? "solid 1px #ccc" : "none"}
                pl="1rem"
                fontSize="0.8rem"
              >
                <InputBudget
                  flexProps={{ height: "32px", width: "90%", mx: "0px" }}
                  defaultValue={item}
                />
              </Box>
            ))}
          </Grid>
        )}
      </Flex>
      <Box overflow="hidden" height={isOpen ? "auto" : "0"}>
        {children}
      </Box>
    </>
  );
};

const Row = ({ title, children, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Flex cursor="pointer" bg="#ffffff">
        <Flex
          pr="1rem"
          pl="2rem"
          py={children ? "0.5rem" : "0.875rem"}
          width="22.2%"
          align="center"
          justify="space-between"
          onClick={() => setIsOpen(!isOpen)}
          borderRight="1px solid #ccc"
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
        <Flex width="77.8%">
          {data.map((item, i) => (
            <Box
              key={i}
              py="0.75rem"
              borderLeft={i ? "solid 1px #ccc" : "none"}
              fontSize="0.875rem"
              width="75px"
            >
              <InputBudget
                flexProps={{ height: "32px", width: "85%", margin: "auto" }}
                defaultValue={item}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
      <Box overflow="hidden" height={isOpen ? "auto" : "0"}>
        {children}
      </Box>
    </>
  );
};

const SubRow = ({ title, children, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Flex borderBottom="solid 1px #eee" cursor="pointer" bg="#f4f4f4">
        <Flex
          pr="1rem"
          pl="3rem"
          py={children ? "0.5rem" : "0.875rem"}
          width="22.2%"
          align="center"
          justify="space-between"
          onClick={() => setIsOpen(!isOpen)}
          borderRight="1px solid #ccc"
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
        <Grid width="77.8%" templateColumns="repeat(4, 1fr) 1.75fr">
          {data.map((item, i) => (
            <Box
              key={i}
              py="0.75rem"
              borderLeft={i ? "solid 1px #ccc" : "none"}
              pl="1rem"
              fontSize="0.875rem"
            >
              <InputBudget
                flexProps={{ height: "32px", width: "90%", mx: "0px" }}
                defaultValue={item}
              />
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

const SubSubRow = ({ title, data }) => {
  return (
    <Flex bg="#E6E6E6" cursor="pointer">
      <Text
        pl="4rem"
        py="0.875rem"
        fontSize="0.875rem"
        width="22.2%"
        borderRight="1px solid #ccc"
      >
        {title}
      </Text>
      <Grid width="77.8%" templateColumns="repeat(4, 1fr) 1.75fr">
        {data.map((item, i) => (
          <Box
            key={i}
            py="0.75rem"
            borderLeft={i ? "solid 1px #ccc" : "none"}
            pl="1.125rem"
            fontSize="0.875rem"
          >
            <InputBudget
              flexProps={{ height: "32px", width: "90%", mx: "0px" }}
              defaultValue={item}
            />
          </Box>
        ))}
      </Grid>
    </Flex>
  );
};

Table.Columns = Columns;
Table.SubRow = SubRow;
Table.SubSubRow = SubSubRow;
Table.Row = Row;
Table.CategoryRow = CategoryRow;

export default Table;
