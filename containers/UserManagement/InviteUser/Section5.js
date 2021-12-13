import React, { useState, useEffect } from "react";
import { Flex, Text, Img, Button, Box, SimpleGrid } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { SelectAsync } from "components/FormComponents";

const Section5 = ({ selectedBU, accessData, setAccessData, masterData }) => {
  const [brands, setBrands] = useState([]);
  const [buOptions, setBuOptions] = useState([]);

  const { control, watch } = useForm();
  const buDropdownValue = watch("bu");

  useEffect(() => {
    const temp = [];
    Object.keys(selectedBU).forEach((bu) => {
      selectedBU[bu].map((country) => {
        temp.push({ ...country, zone: bu });
      });
    });
    setBuOptions(temp);
  }, [selectedBU]);

  useEffect(() => {
    if (buDropdownValue?.brands) {
      setBrands(buDropdownValue?.brands);
    }
  }, [buDropdownValue]);

  return (
    <Box
      width="100%"
      boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.2)"
      borderRadius="6px"
      bg="white"
      py="1rem"
      mb="1.5rem"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        position="relative"
        mb="1rem"
        px="1.5rem"
      >
        <Text>
          Brand Data Access ({accessData[buDropdownValue?.country]?.length || 0}
          /{brands?.length})
        </Text>
        <Flex align="center">
          <Text mr="0.5rem" fontSize="0.875rem">
            Select BU
          </Text>
          <SelectAsync
            name="bu"
            control={control}
            defaultOptions={buOptions}
            width="6rem"
            optionLabel="country"
            optionValue="brands"
            menuListWidth="150%"
          />
        </Flex>
        <Button
          onClick={() => {
            if (
              accessData[buDropdownValue?.country]?.length === brands?.length
            ) {
              setAccessData({});
            } else {
              const temp = {};
              buOptions.map((bu) => {
                temp[bu.country] = bu.brands.map((brand) => brand.brand);
              });
              setAccessData(temp);
            }
          }}
          variant="primary"
          leftIcon={
            accessData[buDropdownValue?.country]?.length === brands?.length ? (
              <div />
            ) : (
              <Img src="/svg/save.svg" />
            )
          }
        >
          {accessData[buDropdownValue?.country]?.length === brands?.length
            ? "Unselect All"
            : "Full Access"}
        </Button>
      </Flex>
      <Box bg="#f2f2f2" width="98%" margin="auto">
        <SimpleGrid columns={6} width="100%" pt="2rem" px="1rem" pb="0rem">
          {brands.map((item, i) => (
            <Flex
              bg="white"
              fontSize="0.875rem"
              lineHeight="1.2"
              borderRadius="8px"
              userSelect="none"
              cursor="pointer"
              key={i}
              boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
              onClick={() => {
                if (
                  accessData[buDropdownValue?.country]?.includes(item.brand)
                ) {
                  const obj = {};
                  Object.keys(accessData).map((temp) => {
                    obj[temp] = [...accessData[temp]];
                  });
                  const i = obj[buDropdownValue?.country]?.indexOf(item.brand);
                  obj[buDropdownValue?.country]?.splice(i, 1);
                  if (obj[buDropdownValue?.country]?.length === 0) {
                    delete obj[buDropdownValue?.country];
                  }
                  setAccessData(obj);
                } else {
                  let obj = { ...accessData };
                  if (accessData[buDropdownValue?.country]) {
                    obj[buDropdownValue?.country] = [
                      ...accessData[buDropdownValue?.country],
                      item.brand,
                    ];
                  } else {
                    obj[buDropdownValue?.country] = [item?.brand];
                  }
                  setAccessData(obj);
                }
              }}
              opacity={
                accessData[buDropdownValue?.country]?.includes(item.brand)
                  ? "1"
                  : "0.4"
              }
              px="0.75rem"
              py="1rem"
              alignItems="center"
              mr="1rem"
              mb="1.5rem"
              height="4.5rem"
            >
              {item.brand}
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Section5;
