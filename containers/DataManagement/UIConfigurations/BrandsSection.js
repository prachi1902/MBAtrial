import React, { useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";

import axios, { responseHandler, errorHandler } from "lib/http";
import { Section, Container } from "@/components/library";
import UIColumnBuilder from "@/components/common/UIColumnBuilder";
import EditBrand from "./EditBrand";
import FullScreenLoader from "@/components/common/FullScreenLoader";

const BrandsSection = ({ brandModalOpen }) => {
  const columnItems = [
    ["logo", "28%"],
    ["name", "72%"],
  ];
  const [brandsList, setBrandsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!brandModalOpen) {
      setLoading(true);
      axios({ url: "/data_mgmt/ui_config/brands" })
        .then(responseHandler)
        .then((res) => setBrandsList(res.brands))
        .catch(errorHandler)
        .finally(() => setLoading(false));
    }
  }, [brandModalOpen]);

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
              {brandsList.map((item, i) => (
                <Box key={i} width="48%" mr="1rem">
                  <EditBrand data={item} />
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default BrandsSection;
