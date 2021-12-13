import React from "react";
import { Flex, Text, Img, Button, Box } from "@chakra-ui/react";

import { Page } from "@/components/library";
import FinalizeScenarioTable from "./FinalizeScenarioTable";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import BetaTagWrapper from "../common/BetaTagWrapper";

const FinalizeScenarioModal = ({ setShowFinalizeModal, setFinalized }) => {
  const { mediaPlanState } = useMediaPlan();
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
      <Page width="89%" py="1rem" borderBottomRadius="0px" boxShadow="none">
        <Text textAlign="center" mb="1rem">
          Finalize Scenario{" "}
          <strong>&quot;{mediaPlanState.selectedPlan.title}&quot;</strong>
        </Text>
        <Box my="1rem">
          <FinalizeScenarioTable />
        </Box>
        <Flex width="max-content" margin="auto">
          <Button
            variant="secondary"
            maxHeight="2.25rem"
            leftIcon={<Img src="/svg/close2.svg" mr="0.6rem" />}
            fontWeight="500"
            onClick={() => setShowFinalizeModal(false)}
            bg="#dddddd"
            mr="1rem"
            width="7rem"
          >
            Cancel
          </Button>
          <BetaTagWrapper type="coming">
            <Button
              variant="primary"
              maxHeight="2.25rem"
              leftIcon={
                <Img src="/svg/final scenario badge.svg" boxSize="1.6rem" />
              }
              fontWeight="500"
              disabled
            >
              Finalize Scenario
            </Button>
          </BetaTagWrapper>
        </Flex>
      </Page>
    </Box>
  );
};

export default FinalizeScenarioModal;
