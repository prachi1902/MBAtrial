import React from "react";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";

import { Page, Section, Container } from "@/components/library";
import ColumnBuilder from "@/components/common/ColumnBuilder";
import UnlockVehiclesRow from "./UnlockVehiclesRow";
import { InputBudget } from "@/components/FormComponents";

const UnlockVehiclesModal = ({ setUnlockVehiclesModal }) => {
  const columnItems = [
    ["vehicle", "35%"],
    ["woa", "25%"],
    ["mix (%)", "20%"],
    ["editable", "20%"],
  ];

  const data = [
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: false },
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: true },
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: true },
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: true },
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: true },
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: true },
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: false },
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: false },
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: false },
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: true },
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: true },
    { vehicle: "Vehicle Name", woa: "20", mix: "24.55%", editable: false },
  ];

  return (
    <Box
      width="100vw"
      height="100vh"
      top="0"
      left="0"
      zIndex="15"
      pt="4.5rem"
      position="fixed"
      bg="rgba(160,160,160,0.7)"
      css={{ backdropFilter: "blur(4px)" }}
    >
      <Page
        width="60%"
        p="0"
        bg="#fafafa"
        boxShadow="0px 2px 2px 0px rgba(0,0,0,0.2)"
        pb="2rem"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p="1rem"
          px="1.5rem"
        >
          <Text>
            Unlock Vehicles to Adjust Budget.
            <br />
            Edit Weeks on Air for each vehicle for new scenario.
          </Text>
          <Flex alignItems="center">
            <Button
              variant="primary"
              leftIcon={<Img src="/svg/adjustments.svg" />}
              fontWeight="500"
              mr="1rem"
            >
              Adjust & Create New Scenario
            </Button>
            <IconButton
              icon={<Img src="/svg/close4.svg" />}
              isRound={true}
              variant="iconbuttonGray"
              onClick={() => setUnlockVehiclesModal(false)}
            />
          </Flex>
        </Flex>
        <Box my="1.2rem" mt="0.5rem" textAlign="center">
          <Text
            textTransform="uppercase"
            color="textGray"
            fontSize="0.7rem"
            letterSpacing="0.9px"
            fontWeight="600"
            mb="0.5rem"
          >
            incremental
            <br />
            budget to be adjusted
          </Text>
          <Text fontSize="1.5rem">$ 60,000</Text>
        </Box>

        <Box>
          <ColumnBuilder
            columnItems={columnItems}
            flexProps={{
              bg: "lightGray",
              height: "2.5rem",
              borderRadius: "6px",
              px: "11rem",
              width: "95%",
              margin: "auto",
              pt: "0.55rem",
              mb: "0.3rem",
            }}
            textProps={{ fontSize: "0.9rem", color: "black" }}
          />
          {data.map((d, i) => {
            return <UnlockVehiclesRow data={d} key={i} />;
          })}
        </Box>
      </Page>
    </Box>
  );
};

export default UnlockVehiclesModal;
