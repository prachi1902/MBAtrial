import React, { useState, useEffect } from "react";
import { Section } from "@/components/library";
import { Flex, Text, Box } from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import CompareDropdown from "@/components/common/CompareDropdown";
import { Tabs } from "@/components/FormComponents";
import BrandKPIsTable from "../MediaPlan/BrandKPIsTable";

function BrandResults({ tab, setTab }) {
  const { control, watch } = useForm({
    defaultValues: { brandResults: "Brand" },
  });

  // const [tab, setTab] = useState("Brand");
  const tabValue = watch("brandResults");

  useEffect(() => {
    if (tab !== tabValue) {
      setTab(tabValue);
    }
  }, [tabValue]);

  return (
    <Section bg="formBgGray" px="1.5rem">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        position="relative"
        py="1rem"
      >
        {tab === "Brand" ? (
          <Text>Brand Results</Text>
        ) : (
          <Text>Youtube + Facebook + TV Results</Text>
        )}
        <Box position="absolute" left="50%" transform="translateX(-50%)">
          <Tabs
            options={["Brand", "Vehicle", "Format"]}
            name="brandResults"
            control={control}
          />
        </Box>
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
          labelProps={{ variant: "bold" }}
          height="0px"
          inputHeight="3.5rem"
        />
      </Flex>

      <Flex>
        <BrandKPIsTable />
      </Flex>
    </Section>
  );
}

export default BrandResults;
