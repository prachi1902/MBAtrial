import React from "react";
import { Flex, Text, Box, FormErrorMessage } from "@chakra-ui/react";

import { Section, Page } from "@/components/library";
import { InputWithSymbol } from "@/components/FormComponents";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const ConstraintSection = ({ showConstraint }) => {
  const { mediaPlanDispatch, mediaPlanState } = useMediaPlan();
  return (
    <Section display={showConstraint ? "block" : "none"}>
      <Page py="1rem" px="1.5rem">
        <Flex alignItems="flex-end" justifyContent="space-between">
          <Text>Optimization Constraints</Text>
          <Flex width="10rem" />
        </Flex>
        <Flex mt="2rem">
          <InputWithSymbol
            height="60px"
            fontWeight="600"
            fontSize="1.25rem"
            backSymbol="%"
            mr="0.5rem"
            disabled={mediaPlanState.selectedPlan?.hasExecuted}
            width="13%"
            label="wkyl reach min (%)"
            value={mediaPlanState.selectedPlan?.constraints?.weakly_reach_min}
            onChange={(e) => {
              mediaPlanDispatch.updateSelectedPlan({
                constraints: {
                  ...mediaPlanState.selectedPlan?.constraints,
                  opt_plan_id: mediaPlanState.selectedPlan?.id,
                  weakly_reach_min: e.target.value,
                },
              });
            }}
          />
          <InputWithSymbol
            height="60px"
            fontWeight="600"
            fontSize="1.25rem"
            backSymbol="%"
            disabled={mediaPlanState.selectedPlan?.hasExecuted}
            mr="1.5rem"
            width="13%"
            label="wkyl reach max (%)"
            value={mediaPlanState.selectedPlan?.constraints?.weakly_reach_max}
            onChange={(e) => {
              mediaPlanDispatch.updateSelectedPlan({
                constraints: {
                  ...mediaPlanState.selectedPlan?.constraints,
                  opt_plan_id: mediaPlanState.selectedPlan?.id,
                  weakly_reach_max: e.target.value,
                },
              });
            }}
          />
          <Box>
            <InputWithSymbol
              height="60px"
              fontWeight="600"
              fontSize="1.25rem"
              disabled={mediaPlanState.selectedPlan?.hasExecuted}
              width="14%"
              label="min qwoa"
              type="number"
              value={mediaPlanState.selectedPlan?.constraints?.min_qwoa}
              onChange={(e) => {
                console.log(e.target.value);
                mediaPlanDispatch.updateSelectedPlan({
                  constraints: {
                    ...mediaPlanState.selectedPlan?.constraints,
                    opt_plan_id: mediaPlanState.selectedPlan?.id,
                    min_qwoa: parseInt(e.target.value),
                  },
                });
              }}
            />
            <FormErrorMessage>
              {mediaPlanState.selectedPlan?.constraints?.min_qwoa < 0
                ? "Min QWOA cannot be negative."
                : mediaPlanState.selectedPlan?.constraints?.min_qwoa >
                  mediaPlanState.selectedPlan.woa
                ? "Min QWOA cannot be greater than WOA."
                : ""}
            </FormErrorMessage>
          </Box>
        </Flex>
      </Page>
    </Section>
  );
};

export default ConstraintSection;
