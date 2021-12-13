import React from "react";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";

import { Page, Section, Container } from "@/components/library";

const NewScenarioModal = ({ setNewScenarioModal, setUnlockVehiclesModal }) => {
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
        width="45%"
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
          <Text>New Scenario from Vehicle Mix</Text>
          <IconButton
            icon={<Img src="/svg/close4.svg" />}
            isRound={true}
            variant="iconbuttonGray"
            onClick={() => setNewScenarioModal(false)}
          />
        </Flex>
        <Box my="1.5rem" textAlign="center">
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
            budget required
          </Text>
          <Text fontSize="1.5rem">$ 60,000</Text>
        </Box>
        <Box pb="2rem" width="100%">
          <Box width="max-content" margin="auto" mb="1rem">
            <Button
              variant="primary"
              leftIcon={<Img src="/svg/include.svg" />}
              fontWeight="500"
            >
              Include in Media Budget
            </Button>
          </Box>
          <Box width="max-content" margin="auto" mb="1rem">
            {" "}
            <Button
              variant="primary"
              leftIcon={<Img src="/svg/adjustments.svg" />}
              fontWeight="500"
              onClick={() => {
                // setNewScenarioModal(false);
                setUnlockVehiclesModal(true);
              }}
            >
              Don&apos;t include, Adjust From Unlocked Vehicles
            </Button>
          </Box>
          <Box width="max-content" margin="auto">
            {" "}
            <Button
              variant="gray"
              leftIcon={<Img src="/svg/adjustments.svg" />}
            >
              Don&apos;t include, Tweak Mix Manually
            </Button>
          </Box>
        </Box>
      </Page>
    </Box>
  );
};

export default NewScenarioModal;
