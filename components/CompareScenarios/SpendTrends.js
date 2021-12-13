import React from "react";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Tabs, CircularCheckbox } from "../FormComponents";

const SpendTrends = () => {
  const { control } = useForm();

  return (
    <Box p="1rem" mt="1rem">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <Text>Spend Trends</Text>
        <Tabs
          options={["Brand", "Vehicle", "Format"]}
          name="scenarioTabs"
          control={control}
          flexProps={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </Flex>
      <Img src="/png/72-graph.png" mb="1.5rem" />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <Text textTransform="uppercase" fontSize="0.75rem">
          scenarios
        </Text>
        <Flex position="absolute" left="50%" transform="translateX(-50%)">
          <Flex alignItems="center" mr="1rem">
            <CircularCheckbox
              backgroundColor="#379972"
              onCheckBG="#379972"
              width="24px"
              height="24px"
              compareScenario={true}
            />
            <Text ml="0.5rem">Ideal Plan</Text>
          </Flex>
          <Flex alignItems="center" mr="1rem">
            <CircularCheckbox
              backgroundColor="#811B1A"
              onCheckBG="#811B1A"
              width="24px"
              height="24px"
              compareScenario={true}
            />
            <Text ml="0.5rem">Opt Plan 1</Text>
          </Flex>
          <Flex alignItems="center">
            <CircularCheckbox
              backgroundColor="#f5a73b"
              onCheckBG="#f5a73b"
              width="24px"
              height="24px"
              compareScenario={true}
            />
            <Text ml="0.5rem">Sim Plan 1</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SpendTrends;
