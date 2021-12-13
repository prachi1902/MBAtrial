import React from "react";
import { Section } from "../../../library";
import { Flex, Text, Img, Button } from "@chakra-ui/react";
import MediaTable from "./MediaTable";

import { useForm } from "react-hook-form";
import CompareDropdown from "@/components/common/CompareDropdown";

function MediaSection() {
  const { control } = useForm();

  return (
    <Section bg="formBgGray" px="1.5rem">
      <Flex alignItems="center" justifyContent="space-between">
        <Text py="1rem">Social Media | Facebook Results</Text>
        <Flex alignItems="center" justifyContent="space-between">
          <CompareDropdown
            name="COMPARE SCENARIOS"
            placeholder="COMPARE SCENARIOS"
            control={control}
            options={[
              { label: "LY", value: "boxvalue0" },
              {
                label: "Ideal Media Plan",
                value: "boxvalue1",
              },
              { label: "Opt Plan1", value: "boxvalue2" },
              { label: "User Defined 1", value: "boxvalue3" },
              { label: "User Defined 2", value: "boxvalue4" },
              { button: true },
            ]}
            boxProps={{
              width: "100%",
            }}
            labelProps={{ variant: "bold" }}
            height="0px"
            inputHeight="3.5rem"
          />
        </Flex>
      </Flex>

      <Flex alignItems="center">
        <MediaTable />
        <Button
          variant="primary"
          leftIcon={<Img src="/svg/maximize.svg" />}
          height="2.3rem"
          fontSize="0.9rem"
          mb="4rem"
        >
          Maximize
        </Button>
      </Flex>
    </Section>
  );
}

export default MediaSection;
