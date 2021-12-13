import React, { useState } from "react";
import { Img, Button } from "@chakra-ui/react";
import { Section, Container } from "@/components/library";
import Constraints from "./MaximizeConstraints/Constraints";
import Adjustments from "./Adjustments/Adjustments";

const MaximiseConstraints = () => {
  const [showConstraint, setShowConstraint] = useState(true);
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
              ? "Hide Maximization constraints"
              : "Maximization constraints"}
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
      {showConstraint && <Constraints />}
      {showAdjustment && <Adjustments />}
    </>
  );
};

export default MaximiseConstraints;
