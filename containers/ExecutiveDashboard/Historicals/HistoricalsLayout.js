import React, { useEffect } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Tabs } from "@/components/FormComponents";
import { Container, Section, Page } from "components/library";
import BrandsCarousel from "@/components/ExecutiveDashboard/BrandsCarousel";
import BrandTab from "./BrandTab";
import BetaTagWrapper from "@/components/common/BetaTagWrapper";

const HistoricalsLayout = () => {
  const { watch, control, setValue } = useForm({
    defaultValues: {
      historicalTabs: "Brand",
      historicalDuration: "Yearly",
    },
  });
  const [tabValue] = watch(["historicalTabs"]);

  useEffect(() => {
    setValue("vehicle", null);
  }, [tabValue]);

  return (
    <Container mt="1rem" pb="10rem">
      <Section position="relative">
        <BrandsCarousel />
      </Section>
      <Section mt="1rem">
        <Page py="1rem" pb="0.5rem">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            position="relative"
            px="1.5rem"
          >
            <Text>Historicals</Text>
            <BetaTagWrapper type="coming">
              <Tabs
                options={["Brand", "Vehicle", "Format"]}
                disabled={["Format"]}
                name="historicalTabs"
                control={control}
              />
            </BetaTagWrapper>
            <Box width="80px" />
          </Flex>
          <BrandTab selectedTab={tabValue} />
        </Page>
      </Section>
    </Container>
  );
};

export default HistoricalsLayout;
