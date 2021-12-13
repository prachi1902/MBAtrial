import React, { useEffect, useState } from "react";
import { Flex, Text, Img, Button, Box } from "@chakra-ui/react";

const Section4 = ({ selectedBU, setSelectedBU, user, masterData }) => {
  const { zones, countries } = masterData;
  const [tab, setTab] = useState(zones[0]?.zone_name);
  const [countryList, setCountryList] = useState([]);
  const [totalBUs, setTotalBUs] = useState(0);

  useEffect(() => {
    let total = 0;
    Object.keys(selectedBU).forEach((key) => {
      total += selectedBU[key]?.length;
    });
    setTotalBUs(total);
  }, [selectedBU]);

  useEffect(() => {
    setTab(zones[0]?.zone_name);
  }, [zones]);

  useEffect(() => {
    if (zones && tab) {
      setCountryList(
        zones.filter((zone) => zone.zone_name === tab)[0]?.countries
      );
    }
  }, [tab]);

  useEffect(() => {
    if (zones.length && user.permissions) {
      const temp = {};
      user.permissions.region_brand.forEach((region) => {
        const temp2 = [];
        const temp3 = zones.filter(
          (zone) => zone.zone_name === region.zone_name
        )[0];
        if (temp3) {
          temp3?.countries.forEach((country) => {
            region.countries.forEach((country2) => {
              if (country.country === country2.country_name) {
                temp2.push(country);
              }
            });
          });
        }
        temp[region.zone_name] = temp2;
      });
      setSelectedBU(temp);
    }
  }, [zones, user]);

  return (
    <Box
      width="100%"
      boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.2)"
      borderRadius="6px"
      bg="white"
      p="1rem"
      px="1.5rem"
      mb="1.5rem"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="0.4rem">
        <Text>
          BU Data Access ({totalBUs}/{countries.length})
        </Text>
        <Button
          onClick={() => {
            if (totalBUs === countries.length) {
              setSelectedBU({});
            } else {
              const obj = {};
              zones.map((zone) => (obj[zone.zone_name] = zone.countries));
              setSelectedBU(obj);
            }
          }}
          variant="primary"
          leftIcon={
            totalBUs === countries.length ? (
              <div />
            ) : (
              <Img src="/svg/save.svg" />
            )
          }
        >
          {totalBUs === countries.length ? "Unselect All" : "Full Access"}
        </Button>
      </Flex>
      <Box width="90%" mb="1rem">
        <Flex mt="1rem" width="80%" spacing={0}>
          {zones.map((zone, i) => {
            return (
              <Button
                variant={tab === zone.zone_name ? "primary" : "basic"}
                onClick={() => {
                  if (tab === zone.zone_name) {
                    null;
                  } else {
                    setTab(zone.zone_name);
                  }
                }}
                key={i}
                height="2rem"
                size="sm"
                px="1.75rem"
                border={
                  tab === zone.zone_name
                    ? "solid 1px #B27831 !important"
                    : "none"
                }
                color={tab === zone.zone_name ? "buttonText" : "darkGray"}
                boxShadow="none"
                fontWeight="normal"
                borderRadius="4px"
              >
                {zone.zone_name}
              </Button>
            );
          })}
        </Flex>
        <Flex wrap="wrap" mt="1rem">
          {countryList.map((pill, i) => {
            if (selectedBU[tab]?.includes(pill)) {
              return (
                <Button
                  variant="primary"
                  onClick={() => {
                    const obj = {};
                    Object.keys(selectedBU).map((temp) => {
                      obj[temp] = [...selectedBU[temp]];
                    });
                    const i = obj[tab]?.indexOf(pill);
                    obj[tab]?.splice(i, 1);
                    if (obj[tab]?.length === 0) {
                      delete obj[tab];
                    }
                    setSelectedBU(obj);
                  }}
                  border="solid 1px #B27831 !important"
                  size="xs"
                  px="1rem"
                  color="buttonText"
                  key={i}
                  mr="0.5rem"
                  mb="1rem"
                  height="25px"
                  fontWeight="normal"
                  borderRadius="30px"
                >
                  {pill.country}
                </Button>
              );
            } else {
              return (
                <Button
                  variant="basic"
                  onClick={() => {
                    let obj = { ...selectedBU };
                    if (selectedBU[tab]) {
                      obj[tab] = [...selectedBU[tab], pill];
                    } else {
                      obj[tab] = [pill];
                    }
                    setSelectedBU(obj);
                  }}
                  border="solid 1px lightGray !important"
                  size="xs"
                  fontSize="0.875rem"
                  px="1rem"
                  key={i}
                  mb="1rem"
                  height="25px"
                  fontWeight="normal"
                  borderRadius="30px"
                  mr="0.5rem"
                >
                  {pill.country}
                </Button>
              );
            }
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export default Section4;
