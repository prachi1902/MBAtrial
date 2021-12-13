import React from "react";
import {
  Flex,
  Text,
  Img,
  Grid,
  Button,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { Section, Page } from "../library";
import { Tabs, InputWithSymbol } from "@/components/FormComponents";
import { useForm } from "react-hook-form";

const ConstraintSection = () => {
  const { control } = useForm();
  return (
    <Section>
      <Page py="1rem" px="1.5rem">
        <Flex alignItems="flex-end" justifyContent="space-between">
          <Text>Optimization Constraints</Text>
          <Tabs
            height="32px"
            fontSize="0.875rem"
            name="type"
            control={control}
            options={["General", "Overrides"]}
          />
          <Flex width="10rem" />
        </Flex>
        <Flex mt="2rem">
          <InputWithSymbol
            height="60px"
            fontWeight="600"
            fontSize="1.25rem"
            backSymbol="%"
            mr="0.5rem"
            width="13%"
            label="wkyl reach min (%)"
          />
          <InputWithSymbol
            height="60px"
            fontWeight="600"
            fontSize="1.25rem"
            backSymbol="%"
            mr="1.5rem"
            width="13%"
            label="wkyl reach max (%)"
          />
          <InputWithSymbol
            height="60px"
            fontWeight="600"
            fontSize="1.25rem"
            width="14%"
            label="min qwoa"
          />
        </Flex>
      </Page>
    </Section>
  );
};

export default ConstraintSection;
