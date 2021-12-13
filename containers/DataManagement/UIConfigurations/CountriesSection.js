import React, { useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";

import axios, { responseHandler, errorHandler } from "lib/http";
import { Section, Container } from "@/components/library";
import UIColumnBuilder from "@/components/common/UIColumnBuilder";
import EditCountry from "./EditCountry";
import FullScreenLoader from "@/components/common/FullScreenLoader";

const CountriesSection = ({ countryModalOpen }) => {
  const columnItems = [
    ["flag", "28%"],
    ["name", "50%"],
    ["code", "25%"],
  ];
  const [countriesList, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!countryModalOpen) {
      setLoading(true);
      axios({ url: "/data_mgmt/ui_config/countries" })
        .then(responseHandler)
        .then((res) => setCountries(res.countries))
        .catch(errorHandler)
        .finally(() => setLoading(false));
    }
  }, [countryModalOpen]);

  return (
    <Box py="1rem">
      {loading && <FullScreenLoader />}
      <Container>
        <Flex
          px="2rem"
          justifyContent="space-between"
          width="87%"
          margin="auto"
        >
          <Box width="100%">
            <Flex>
              <UIColumnBuilder
                columnItems={columnItems}
                bg="lightGray"
                mb="1rem"
              />
              <UIColumnBuilder
                columnItems={columnItems}
                bg="lightGray"
                mb="1rem"
              />
            </Flex>
            <Flex width="100%" flexWrap="wrap">
              {countriesList?.map((item, i) => (
                <Box key={i} width="48%" mr="1rem">
                  <EditCountry data={item} />
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default CountriesSection;
