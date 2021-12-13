import React, { useState, useEffect } from "react";
import { Flex, Img, IconButton, Text, Box } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import { useBrandOverview } from "@/redux/BrandOverviewSlice";
import axios, { responseHandler, errorHandler } from "lib/http";
import SelectBUModal from "./SelectBUModal";

const CustomRightArrow = (props) => {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  return (
    <IconButton
      display={isLastItemVisible ? "none" : "flex"}
      position="absolute"
      right="1%"
      borderRadius="50%"
      variant="primary"
      zIndex="9"
      bottom="30px"
      _focus={{
        outline: "none",
      }}
      icon={<Img src="/svg/right.svg" />}
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
    />
  );
};
const CustomLeftArrow = (props) => {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);
  return (
    <IconButton
      disabled={isFirstItemVisible}
      display={isFirstItemVisible ? "none" : "flex"}
      onClick={() => scrollPrev()}
      position="absolute"
      left="1%"
      bottom="30px"
      borderRadius="50%"
      variant="primary"
      zIndex="9"
      _focus={{
        outline: "none",
      }}
      icon={<Img src="/svg/left.svg" />}
    />
  );
};

const BrandsCarousel = () => {
  const [buModalOpen, setBUModalOpen] = useState(false);
  const { brandOverviewDispatch, brandOverviewState } = useBrandOverview();

  useEffect(() => {
    axios({ url: "/country_brand" })
      .then(responseHandler)
      .then((res) => {
        brandOverviewDispatch.setCountriesData(res.countries);
        brandOverviewDispatch.setSelectedCountry(res.countries[0]);
        brandOverviewDispatch.updateSelectedBrands([
          res.countries[0].brands[0].brand,
        ]);
      })
      .catch(errorHandler);
  }, []);

  return (
    <Box
      position="relative"
      bg="bgGray"
      borderRadius="8px"
      px="1rem"
      pt="0.5rem"
    >
      <SelectBUModal data={buModalOpen} setData={setBUModalOpen} />
      <Flex
        cursor="pointer"
        alignItems="center"
        borderRadius="50px"
        height="2rem"
        pl="0.75rem"
        mb="0.5rem"
        bg="white"
        width="fit-content"
        onClick={() => setBUModalOpen(true)}
      >
        <Text mt="0.1rem" fontWeight="600" mr="0.5rem" fontSize="0.75rem">
          SELECT BU
        </Text>
        <Img mr="0.5rem" src="/svg/dropdown 2.svg" />
        <Flex
          bg="bgGray"
          borderRadius="50px"
          justify="center"
          align="center"
          fontSize="0.875rem"
          mr="0.5rem"
          height="75%"
          px="0.75rem"
        >
          {brandOverviewState?.selectedCountry?.country}
        </Flex>
      </Flex>
      <Flex
        as={ScrollMenu}
        LeftArrow={CustomLeftArrow}
        RightArrow={CustomRightArrow}
      >
        {brandOverviewState?.selectedCountry?.brands?.map((brand, i) => {
          return (
            <Flex
              bg="white"
              borderRadius="8px"
              userSelect="none"
              cursor="pointer"
              key={i}
              mb="1rem"
              boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
              py="1rem"
              onClick={() => {
                const i = brandOverviewState.selectedBrands?.indexOf(
                  brand.brand
                );
                if (i >= 0) {
                  let newData = [...brandOverviewState.selectedBrands];
                  newData.splice(i, 1);
                  brandOverviewDispatch.updateSelectedBrands(newData);
                } else {
                  brandOverviewDispatch.updateSelectedBrands([
                    ...brandOverviewState.selectedBrands,
                    brand.brand,
                  ]);
                }
              }}
              opacity={
                brandOverviewState.selectedBrands?.includes(brand.brand)
                  ? "1"
                  : "0.4"
              }
              px="0.75rem"
              width="5.875rem"
              minWidth="5.875rem"
              height="4.5rem"
              alignItems="center"
              mr="1rem"
              justify="center"
              overflow="hidden"
              itemId={i}
            >
              {/* <Img
                pointerEvents="none"
                userSelect="none"
                maxWidth="100%"
                src={`/Logos/Brand_Logos/${brand.brand}.png`}
              /> */}
              <Text fontSize="0.8rem" lineHeight="1.2">
                {brand.brand}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default BrandsCarousel;
