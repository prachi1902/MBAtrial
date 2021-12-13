import React, { useState } from "react";
import { Container, Section, Page } from "@/components/library";
import { Flex, Text, Img, Box, Button } from "@chakra-ui/react";

import ScenarioCard from "./ScenarioCard";

const ScenarioSection = ({ scenarioCardDetails }) => {
  const [stateFinalized, setStateFinalized] = useState(false);
  return (
    <Box
      width="100%"
      bg="url('/png/scenario bg.png') no-repeat"
      backgroundSize="cover"
      px="5rem"
      pt="8px"
      pb="10px"
      height="130px"
      zIndex="100"
      flexDirection="column"
      display="flex"
      justifyContent="space-between"
    >
      {/*      <Container>*/}
      <Flex
        alignItems="center"
        justifyContent="flex-end"
        mb="0.7rem"
        position="relative"
        mt={!stateFinalized && "14px"}
      >
        <Text
          color="white"
          textTransform="uppercase"
          fontSize="0.75rem"
          letterSpacing="0.05rem"
          py="0.6rem"
          textAlign="center"
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
        >
          select the final scenario
        </Text>
        {stateFinalized && (
          <Button
            variant="gray"
            leftIcon={<Img src="/svg/reset.svg" />}
            bg="#bbbbbb"
          >
            Reset
          </Button>
        )}
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        {scenarioCardDetails.map((scenario, index) => (
          <ScenarioCard
            key={index}
            title={scenario.title}
            bg={scenario.bg}
            tagBg={scenario.tagBg}
            menu={scenario.menu}
            current={scenario.current}
            tag={scenario.tag}
            subheading={scenario.subheading}
            subhead={scenario.subhead}
            subheadColor={scenario.subheadColor}
            setStateFinalized={setStateFinalized}
          />
        ))}
      </Flex>
      {/*      </Container>*/}
    </Box>
  );
};

export default ScenarioSection;
