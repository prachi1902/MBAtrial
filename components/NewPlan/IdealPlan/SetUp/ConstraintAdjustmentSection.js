import React, { useState } from "react";
import { Img, Button } from "@chakra-ui/react";
import { Section, Container } from "@/components/library";
import TableSection from "./TableSection";

const ConstraintAdjustmentSection = () => {
  const [showAdjustment, setShowAdjustment] = useState(false);
  return (
    <>
      <Section my="1rem">
        <Container display="flex">
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
      <TableSection showAdjustment={showAdjustment} />
    </>
  );
};

export default ConstraintAdjustmentSection;
