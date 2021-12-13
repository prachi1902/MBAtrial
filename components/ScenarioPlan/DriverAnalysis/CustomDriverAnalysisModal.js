import React from "react";
import {
  Flex,
  Text,
  Img,
  Button,
  Box,
  IconButton,
  Grid,
} from "@chakra-ui/react";

import { Page } from "../../library";

const CustomDriverAnalysisModal = ({
  setCdaModal,
  selectedVehicles,
  setSelectedVehicles,
}) => {
  const buttonsAll = [
    "Vehicle 1",
    "Vehicle 2",
    "Vehicle 3",
    "Vehicle 4",
    "Vehicle 5",
    "Vehicle 6",
    "Vehicle 7",
    "Vehicle 8",
    "Vehicle 9",
    "Vehicle 10",
    "Vehicle 11",
    "Vehicle 12",
    "Vehicle 13",
    "Vehicle 14",
    "Vehicle 15",
    "Vehicle 16",
    "Vehicle 17",
    "Vehicle 18",
    "Vehicle 19",
    "Vehicle 20",
  ];

  return (
    <Box
      width="100vw"
      height="100vh"
      top="0"
      left="0"
      zIndex="9"
      pt="6rem"
      position="fixed"
      bg="rgba(160,160,160,0.7)"
      css={{ backdropFilter: "blur(4px)" }}
    >
      <Page width="70%" py="1.5rem" boxShadow="none">
        <Box px="1.5rem">
          <Flex justifyContent="space-between" mb="2rem" alignItems="center">
            <Text fontSize="0.95rem" letterSpacing="0.02rem">
              Custom Driver Analysis
            </Text>
            <Text
              fontSize="0.9rem"
              ml="8.5rem"
              color="darkGray"
              fontStyle="italic"
            >
              Select vehicles to include
            </Text>
            <Flex alignItems="center">
              <Button
                border="none"
                fontWeight="normal"
                leftIcon={<Img src="/svg/reset.svg" mr="0.3rem" />}
                onClick={() => setSelectedVehicles([])}
                fontSize="0.85rem"
                bg="lightGray"
                mr="1rem"
              >
                Clear All
              </Button>
              <Button
                leftIcon={<Img src="/svg/maximize.svg" />}
                onClick={() => setCdaModal(false)}
                fontWeight="normal"
                mr="1rem"
              >
                Analyse
              </Button>
              <IconButton
                size="md"
                icon={<Img src="/svg/close small.svg" />}
                isRound={true}
                border="none"
                onClick={() => {
                  setSelectedVehicles([]);
                  setCdaModal(false);
                }}
                bg="bgGray"
              />
            </Flex>
          </Flex>
          <Box border="0.1px solid #cccccc" borderRadius="8px" mb="0.7rem">
            <Grid templateColumns="repeat(4, 1fr)">
              {buttonsAll.map((button, i) => {
                if (selectedVehicles.includes(button)) {
                  return (
                    <Button
                      variant="vehicle"
                      onClick={() => {
                        const i = selectedVehicles.indexOf(button);
                        let newData = selectedVehicles;
                        newData.splice(i, 1);
                        setSelectedVehicles(newData);
                      }}
                      borderTopLeftRadius={i === 0 && "8px"}
                      borderTopRightRadius={i === 3 && "8px"}
                      borderBottomLeftRadius={i === 12 && "8px"}
                      borderBottomRightRadius={i === 15 && "8px"}
                      bg="#C7DFD7"
                      borderColor="#88B8A9"
                      borderWidth="1px"
                      justifyContent="space-between"
                      rightIcon={<Img src="/svg/selected_item_green.svg" />}
                    >
                      {button}
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      variant="vehicle"
                      onClick={() => {
                        setSelectedVehicles((state) => [...state, button]);
                      }}
                      borderTopLeftRadius={i === 0 && "8px"}
                      borderTopRightRadius={i === 3 && "8px"}
                      borderBottomLeftRadius={i === 12 && "8px"}
                      borderBottomRightRadius={i === 15 && "8px"}
                    >
                      {button}
                    </Button>
                  );
                }
              })}
            </Grid>
          </Box>
        </Box>
      </Page>
    </Box>
  );
};

export default CustomDriverAnalysisModal;
