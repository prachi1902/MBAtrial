import React, { useState } from "react";
import { Img, Button, Text, Box } from "@chakra-ui/react";
import { Section, Container } from "@/components/library";
import ConstraintSection from "./ConstraintSection";
import TableSection from "./TableSection";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const ConstraintAdjustmentSection = () => {
  const [showConstraint, setShowConstraint] = useState(false);
  const [showAdjustment, setShowAdjustment] = useState(false);
  const { mediaPlanState } = useMediaPlan();
  return (
    <>
      <Section my="1rem">
        <Container display="flex">
          <Box position="relative">
            {!mediaPlanState.selectedPlan.integrateMMM && (
              <Text
                borderRadius="5px"
                color="white"
                px="0.5rem"
                py="0.1rem"
                bg="#6D7278"
                zIndex="2"
                mb="1rem"
                left="-30px"
                top="-10px"
                fontSize="0.875rem"
                position="absolute"
              >
                Coming Soon
              </Text>
            )}
            <Button
              onClick={() => setShowConstraint(!showConstraint)}
              leftIcon={
                showConstraint ? (
                  <Img src="/svg/hide.svg" />
                ) : (
                  <Img src="/svg/chart.svg" />
                )
              }
              disabled={!mediaPlanState.selectedPlan.integrateMMM}
              variant="secondary"
              mr="1rem"
            >
              {showConstraint
                ? "Hide Opt constraints"
                : "Optimization constraints"}
            </Button>
          </Box>
          <Button
            onClick={() => setShowAdjustment(!showAdjustment)}
            leftIcon={
              showAdjustment ? (
                <Img src="/svg/hide.svg" />
              ) : (
                <Img src="/svg/adjustments.svg" />
              )
            }
            variant="secondary"
          >
            {showAdjustment ? "Hide Adjustments" : "Adjustments"}
          </Button>
        </Container>
      </Section>
      <ConstraintSection showConstraint={showConstraint} />
      <TableSection showAdjustment={showAdjustment} />
    </>
  );
};

export default ConstraintAdjustmentSection;
