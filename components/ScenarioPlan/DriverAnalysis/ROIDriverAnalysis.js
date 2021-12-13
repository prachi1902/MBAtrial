import React, { useState, useEffect } from "react";
import { Section, Page } from "@/components/library";
import { Flex, Text, Img, Box, Button, FormLabel } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { SelectDropdown, Tabs } from "@/components/FormComponents";
import CustomDriverAnalysisModal from "./CustomDriverAnalysisModal";

const ROIDriverAnalysis = () => {
  const [cdaModal, setCdaModal] = useState(false);
  const [customSelected, setCustomSelected] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const { control, watch } = useForm({
    defaultValues: {
      level: "Brand",
    },
  });

  const levelValue = watch("level");

  if (levelValue === "Custom") {
    if (!customSelected) setCustomSelected(true);
  }

  useEffect(() => {
    if (customSelected === true) {
      setCdaModal(true);
    }
  }, [customSelected]);

  return (
    <Section as="section" mt="1rem">
      <Page px="1.5rem" py="0.8rem">
        <Flex alignItems="center" justifyContent="space-between" mb="1.5rem">
          <Text letterSpacing="0.03rem">ROI driver analysis</Text>
          <Button
            leftIcon={<Img src="/svg/maximize.svg" />}
            height="2.25rem !important"
          >
            Analyse
          </Button>
        </Flex>
        <Flex mb="1.5rem">
          <Box mr="1.5rem">
            <FormLabel>Level</FormLabel>
            <Tabs
              options={["Brand", "Traditional", "Digital", "Custom"]}
              name="level"
              control={control}
              fontSize="0.87rem"
              flexProps={{ height: "2rem" }}
            />
            <Flex mt="0.5rem" ml="1rem">
              {selectedVehicles?.map((vehicle, i) => {
                if (i === selectedVehicles.length - 1) {
                  return <Text fontSize="0.87rem">{vehicle}</Text>;
                } else {
                  return <Text fontSize="0.87rem">{vehicle},&nbsp;</Text>;
                }
              })}
            </Flex>
          </Box>
          <Flex mr="1.5rem">
            <SelectDropdown
              label="reference year"
              name="reference-year"
              control={control}
              labelProps={{
                fontWeight: "normal",
                letterSpacing: "0.03rem",
                fontSize: "0.72rem",
              }}
              boxProps={{ width: "11.5rem" }}
              minHeight="2rem"
              borderTopRightRadius="0px"
              borderBottomRightRadius="0px"
              borderRight="0px solid #cccccc"
              pr="0rem"
              pl="0rem"
            />
            <SelectDropdown
              label="period"
              name="period"
              control={control}
              // value="2018"
              labelProps={{
                fontWeight: "normal",
                letterSpacing: "0.03rem",
                fontSize: "0.72rem",
              }}
              boxProps={{ width: "12.5rem" }}
              minHeight="2rem"
              borderTopLeftRadius="0px"
              borderBottomLeftRadius="0px"
              pr="0rem"
              pl="0rem"
            />
          </Flex>
          <Flex>
            <SelectDropdown
              label="focus year"
              name="focus-year"
              control={control}
              // value="2018"
              labelProps={{
                fontWeight: "normal",
                letterSpacing: "0.03rem",
                fontSize: "0.72rem",
              }}
              boxProps={{ width: "11.5rem" }}
              minHeight="2rem"
              borderTopRightRadius="0px"
              borderBottomRightRadius="0px"
              borderRight="none"
              pr="0rem"
              pl="0rem"
            />
            <SelectDropdown
              label="period"
              name="period"
              control={control}
              // value="2018"
              labelProps={{
                fontWeight: "normal",
                letterSpacing: "0.03rem",
                fontSize: "0.72rem",
              }}
              boxProps={{ width: "12.5rem" }}
              minHeight="2rem"
              borderTopLeftRadius="0px"
              borderBottomLeftRadius="0px"
              pr="0rem"
              pl="0rem"
            />
          </Flex>
        </Flex>
        <Img src="/png/roi.png" />
        <Img src="/png/roi-handle.png" width="58%" margin="auto" />
        {cdaModal && (
          <CustomDriverAnalysisModal
            setCdaModal={setCdaModal}
            selectedVehicles={selectedVehicles}
            setSelectedVehicles={setSelectedVehicles}
          />
        )}
      </Page>
    </Section>
  );
};

export default ROIDriverAnalysis;
