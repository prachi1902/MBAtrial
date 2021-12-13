import React from "react";
import { useForm } from "react-hook-form";
import { Box, Flex, Text, FormLabel } from "@chakra-ui/react";

import { Container } from "components/library";

import { NewSwitch, Tabs } from "components/FormComponents";

const TabsSection = () => {
  const { control } = useForm({
    defaultValues: {
      planType: "Brand",
    },
  });

  return (
    <Box
      width="100%"
      bg="bgGray"
      px="5rem"
      py="0.8rem"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
      height="3.5rem"
    >
      <Container>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <FormLabel variant="bold" ml="0rem" mr="0.6rem" mb="0rem">
              media plan type
            </FormLabel>
            <Box position="relative">
              <Text
                position="absolute"
                borderRadius="5px"
                color="white"
                px="0.5rem"
                py="0.1rem"
                bg="#6D7278"
                mb="1rem"
                right="-15px"
                top="-15px"
                fontSize="0.875rem"
              >
                Coming Soon
              </Text>
              <Tabs
                name="planType"
                control={control}
                disabled={["Portfolio"]}
                options={["Brand", "Portfolio"]}
                fontSize="0.9rem"
              />
            </Box>
          </Flex>

          <Flex position="relative" alignItems="center">
            <Text
              position="absolute"
              borderRadius="5px"
              color="white"
              px="0.5rem"
              py="0.1rem"
              bg="#6D7278"
              mb="1rem"
              right="-8px"
              top="-22px"
              zIndex="2"
              fontSize="0.875rem"
            >
              Coming Soon
            </Text>
            <NewSwitch
              name="tabsSwitch"
              control={control}
              options={["USD", "CAD"]}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default TabsSection;
