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
import { Section, Container } from "../library";
import ConstraintSection from "./ConstraintSection";
import TableSection from "./TableSection";

const ConstraintAdjustmentSection = () => {
  const [showConstraint, setShowConstraint] = useState(false);
  const [showAdjustment, setShowAdjustment] = useState(false);
  return (
    <>
      <Section my="1rem">
        <Container>
          <Button
            onClick={() => setShowConstraint(!showConstraint)}
            leftIcon={
              showConstraint ? (
                <Img src="/svg/hide.svg" />
              ) : (
                <Img src="/svg/chart.svg" />
              )
            }
            variant="secondary"
            mr="1rem"
          >
            {showConstraint
              ? "Hide Opt constraints"
              : "Optimization constraints"}
          </Button>
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
      {showConstraint && <ConstraintSection />}
      {showAdjustment && <TableSection />}
    </>
  );
};

export default ConstraintAdjustmentSection;
