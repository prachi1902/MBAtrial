import React, { useState } from "react";
import { Flex, Text, Box, Button, Img } from "@chakra-ui/react";

import { Container, Section } from "@/components/library";
import CountriesSection from "./CountriesSection";
import BrandsSection from "./BrandsSection";
import AddCountryModal from "./AddCountryModal";
import AddBrandModal from "./AddBrandModal";

const UIConfigurationsLayout = () => {
  const [tabs, setTabs] = useState("country");
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);

  return (
    <Section py="1rem">
      <AddCountryModal
        key={"country" + countryModalOpen}
        open={countryModalOpen}
        setOpen={setCountryModalOpen}
      />
      <AddBrandModal
        key={"brand" + brandModalOpen}
        open={brandModalOpen}
        setOpen={setBrandModalOpen}
      />
      <Container>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          position="relative"
        >
          <Flex alignItems="center">
            <Text
              mr="1rem"
              color={tabs !== "country" && "darkGray"}
              onClick={() => setTabs("country")}
              cursor="pointer"
            >
              Countries
            </Text>
            <Text
              color={tabs !== "brand" && "darkGray"}
              onClick={() => setTabs("brand")}
              cursor="pointer"
            >
              Brands
            </Text>
          </Flex>
          <Box position="absolute" left="50%" transform="translateX(-50%)">
            {tabs === "country" ? (
              <Text fontSize="0.9rem" color="darkGray" fontStyle="italic">
                Double-click to edit country details
              </Text>
            ) : (
              <Text fontSize="0.9rem" color="darkGray" fontStyle="italic">
                Double-click to edit brand details
              </Text>
            )}
          </Box>
          {tabs === "country" ? (
            <Button
              onClick={() => setCountryModalOpen(true)}
              leftIcon={<Img src="/svg/add.svg" />}
            >
              Add Country
            </Button>
          ) : (
            <Button
              onClick={() => setBrandModalOpen(true)}
              leftIcon={<Img src="/svg/add.svg" />}
            >
              Add Brand
            </Button>
          )}
        </Flex>
        {tabs === "country" ? (
          <CountriesSection countryModalOpen={countryModalOpen} />
        ) : (
          <BrandsSection brandModalOpen={brandModalOpen} />
        )}
      </Container>
    </Section>
  );
};

export default UIConfigurationsLayout;
