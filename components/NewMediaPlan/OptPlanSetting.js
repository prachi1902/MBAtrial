import React, { useEffect, useState } from "react";
import { Section, Page } from "../library";
import { Flex, Text, Box, FormLabel } from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

import { InputWithSymbol, SelectDropdown } from "../FormComponents";
import RightWidget from "./RightWidget";
import Slider from "@/components/FormComponents/Slider";

const OptPlanSetting = () => {
  const { control, watch } = useForm();

  const objective = watch("objective");
  const [objectiveValue, setObjectiveValue] = useState({ label: "" });

  useEffect(() => {
    setObjectiveValue(objective?.label);
  }, [objective]);

  return (
    <Section as="section" mt="1rem">
      <Page bg="#f8f8f8">
        <Flex width="100%">
          <Box px="3.5rem" py="3rem" width="65%" height="22rem">
            <Flex
              justifyContent="space-between"
              width="70%"
              margin="auto"
              mb="1rem"
            >
              <SelectDropdown
                name="objective"
                control={control}
                options={[
                  { label: "Max Volume", value: "mv" },
                  { label: "Max NR", value: "mnr" },
                  { label: "Max NACO", value: "mnaco" },
                  { label: "Max ROI", value: "mroi" },
                  { label: "Max ROI (Prioritize Attention)", value: "mroipa" },
                  { label: "Target Volume", value: "tvol" },
                  { label: "Target NR", value: "tnr" },
                  { label: "Target maco", value: "tmaco" },
                  { label: "Target ROI", value: "troi" },
                  { label: "Max Marketing Lever", value: "mml" },
                ]}
                label="Optimization Objective"
                boxProps={{ width: "48%" }}
                labelProps={{ variant: "bold" }}
                height="3.5rem"
                inputHeight="3.5rem"
                menuWidth="500px"
                multipleColumns={true}
              />
              {objectiveValue === "Target Volume" ? (
                <InputWithSymbol
                  width="48%"
                  backSymbol="HL"
                  height="3.5rem"
                  label="Target Volume HL"
                />
              ) : objectiveValue === "Max ROI (Prioritize Attention)" ? (
                <Slider />
              ) : (
                <Flex
                  alignItems="center"
                  mt="20px"
                  px="1rem"
                  width="48%"
                  bg="#fbfbfb"
                  color="#8c8c8c"
                  border="solid 1px #e2e2e2"
                  height="3.5rem"
                >
                  -
                </Flex>
              )}
            </Flex>
            <Flex justifyContent="space-between" width="70%" margin="auto">
              <InputWithSymbol
                width="100%"
                height="3.5rem"
                frontSymbol="$"
                fontSize="1.25rem"
                placeholder="Enter Media Budget"
                borderColor="#ffc885"
                bg="#fff1df"
                inputRightText={
                  <Flex fontSize="0.875rem" color="green" alignItems="center">
                    <TriangleUpIcon mr="0.5rem" />
                    10.4%
                  </Flex>
                }
                label="media budget"
              />
            </Flex>
            <Flex mt="1rem" width="70%" marginX="auto">
              <Box>
                <FormLabel>ideal max budget</FormLabel>
                <Text fontSize="1.25rem">$ 5.255MM</Text>
              </Box>
              <Box>
                <FormLabel>ly budget</FormLabel>
                <Text fontSize="1.25rem">$ 3.850MM</Text>
              </Box>
            </Flex>
          </Box>
          <RightWidget />
        </Flex>
      </Page>
    </Section>
  );
};

export default OptPlanSetting;
