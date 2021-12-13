import React from "react";
import { useForm } from "react-hook-form";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

import { Container, Section, Page } from "../library";

import { NewSwitch } from "../FormComponents";

const TabsSection = ({ tabs, selected, setSelected }) => {
  const { control } = useForm();

  return (
    <Box
      width="100%"
      bg="bgGray"
      px="5rem"
      py="0.5rem"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
    >
      <Container>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            {tabs.map((item, i) =>
              selected.includes(item.keyword) ? (
                <Button key={i} mr="1.75rem" variant="whiteTab">
                  {item.name}
                </Button>
              ) : (
                <Box position="relative">
                  {item.disabled && (
                    <Text
                      position="absolute"
                      borderRadius="5px"
                      color="white"
                      px="0.5rem"
                      top="-15px"
                      py="0.1rem"
                      bg="#6D7278"
                      mb="1rem"
                      fontSize="0.75rem"
                    >
                      Coming Soon
                    </Text>
                  )}
                  <Text
                    key={i}
                    as="a"
                    color="darkGray"
                    fontSize="0.85rem"
                    mr="1.75rem"
                    onClick={() => {
                      if (item.disabled) return;
                      setSelected(item.keyword);
                    }}
                  >
                    {item.name}
                  </Text>
                </Box>
              )
            )}
          </Flex>

          <Flex alignItems="center">
            {/* Add Select BU */}
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
