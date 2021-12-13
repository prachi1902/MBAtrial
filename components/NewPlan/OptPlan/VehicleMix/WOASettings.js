import React from "react";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";

import { InputBudget } from "@/components/FormComponents";
import { Page, Section, Container } from "@/components/library";
import ColumnBuilder from "@/components/common/ColumnBuilder";

const TableContent = ({ content, flexProps }) => {
  return (
    <Flex flexWrap="wrap" mt="0.6rem">
      {content.map((tag, i) => (
        <Flex
          key={i}
          width="max-content"
          margin="auto"
          py="0.5rem"
          pl="8.5rem"
          pr="0rem"
          alignItems="center"
          {...flexProps}
        >
          <Flex justifyContent="space-between" width="100%">
            <Text>{tag[0]}</Text>
            <InputBudget flexProps={{ height: "33px" }} mr="4rem" />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

TableContent.defaultProps = {
  content: [
    ["Vehicle Name", "20"],
    ["Vehicle Name", "20"],
    ["Vehicle Name", "20"],
    ["Vehicle Name", "20"],
    ["Vehicle Name", "20"],
    ["Vehicle Name", "20"],
    ["Vehicle Name", "20"],
    ["Vehicle Name", "20"],
  ],
};

const WOASettings = ({ setWoaSettings }) => {
  const columnItems = [
    ["vehicle", "50%"],
    ["woa", "40%"],
  ];

  return (
    <Box
      width="100vw"
      height="100vh"
      top="0"
      left="0"
      zIndex="10"
      pt="4.5rem"
      position="fixed"
      bg="rgba(160,160,160,0.7)"
      css={{ backdropFilter: "blur(4px)" }}
    >
      <Page
        width="61%"
        p="0"
        bg="#fafafa"
        boxShadow="0px 2px 2px 0px rgba(0,0,0,0.2)"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p="1rem"
          px="1.5rem"
        >
          <Text>Weeks on Air Settings</Text>
          <Flex alignItems="center">
            <Button
              variant="gray"
              leftIcon={<Img src="/svg/reset.svg" />}
              mr="1rem"
            >
              Reset to Opt WoA
            </Button>
            <Button
              variant="primary"
              leftIcon={<Img src="/svg/save.svg" mr="0.3rem" />}
              fontSize="0.9rem"
              fontWeight="500"
              mr="1rem"
            >
              Save
            </Button>
            <IconButton
              icon={<Img src="/svg/close4.svg" />}
              isRound={true}
              variant="iconbuttonGray"
              // bg="lightGray"
              // border="none"
              onClick={() => setWoaSettings(false)}
            />
          </Flex>
        </Flex>

        <Flex
          px="2rem"
          justifyContent="space-between"
          width="100%"
          margin="auto"
        >
          <Box width="50%">
            <ColumnBuilder
              columnItems={columnItems}
              flexProps={{
                bg: "lightGray",
                height: "2rem",
                borderTopLeftRadius: "6px",
                borderBottomLeftRadius: "6px",
                py: "0.5rem",
                pl: "8rem",
              }}
              textProps={{ fontSize: "0.9rem", color: "black" }}
            />
            <TableContent />
          </Box>
          <Box width="50%">
            <ColumnBuilder
              columnItems={columnItems}
              flexProps={{
                bg: "lightGray",
                height: "2rem",
                borderTopRightRadius: "6px",
                borderBottomRightRadius: "6px",
                py: "0.5rem",
                pr: "7rem",
              }}
              textProps={{ fontSize: "0.9rem", color: "black" }}
            />
            <TableContent flexProps={{ pl: "1.5rem", pr: "7rem" }} />
          </Box>
        </Flex>
      </Page>
    </Box>
  );
};

export default WOASettings;
