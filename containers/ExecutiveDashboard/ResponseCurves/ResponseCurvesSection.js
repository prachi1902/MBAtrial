import React, { useState, useEffect } from "react";
import { Container, Section, Page } from "../../../components/library";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";
import { CircularCheckbox, EditorDropdown } from "@/components/FormComponents";
import { useForm } from "react-hook-form";
import RC_VolumeSection from "./RC-VolumeSection";
import RC_CustomSection from "./RC-CustomSection";

const ResponseCurvesSection = () => {
  const [selectedType, setSelectedType] = useState("Volume");

  const { control } = useForm();

  const options = ["Volume", "ROI", "Reach", "Custom"];

  return (
    <Section mt="1rem">
      <Page py="1rem" pb="0.5rem">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          position="relative"
          px="1.5rem"
        >
          <Text>Historical Response Curves</Text>
          <EditorDropdown
            label="year"
            placeholder="Select"
            name="year"
            control={control}
            options={[
              { label: "2021", value: "2021" },
              { label: "2022", value: "2022" },
            ]}
            boxProps={{
              display: "flex",
              alignItems: "center",
              mr: "1rem",
            }}
            labelProps={{
              variant: "bold",
              fontSize: "0.8rem",
              mb: "0rem",
              mr: "0.5rem",
              ml: "0rem",
            }}
            pl="0rem"
            pr="0rem"
            width="9rem"
          />
        </Flex>

        <Flex
          justifyContent="space-between"
          alignItems="center"
          my="1rem"
          px="1.5rem"
        >
          <Flex alignItems="center">
            {options.map((option, i) => {
              if (option === selectedType) {
                return (
                  <Button
                    key={i}
                    borderRadius="6px"
                    fontWeight="400"
                    borderWidth="2px"
                    px="1rem"
                    maxHeight="2.1rem"
                  >
                    {option}
                  </Button>
                );
              } else {
                return (
                  <Text
                    key={i}
                    cursor="pointer"
                    color="darkGray"
                    fontSize="0.9rem"
                    px="1rem"
                    onClick={() => setSelectedType(option)}
                  >
                    {option}
                  </Text>
                );
              }
            })}
          </Flex>
          {selectedType === "Custom" && (
            <Text
              fontStyle="italic"
              color="darkGray"
              fontSize="0.9rem"
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
            >
              Select upto 2 dimensions
            </Text>
          )}
        </Flex>

        {selectedType === "Volume" ? (
          <RC_VolumeSection />
        ) : selectedType === "Custom" ? (
          <RC_CustomSection />
        ) : null}
      </Page>
    </Section>
  );
};

export default ResponseCurvesSection;
