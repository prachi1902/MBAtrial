import React, { useState } from "react";
import { Flex, Text, Img, Button, IconButton } from "@chakra-ui/react";

import { useBrandOverview } from "@/redux/BrandOverviewSlice";
import { Page, ModalWrapper } from "components/library";
import BetaTagWrapper from "../common/BetaTagWrapper";

const SelectBUModal = ({ setData, data }) => {
  const { brandOverviewDispatch, brandOverviewState } = useBrandOverview();
  const [selectedBU, setSelectedBU] = useState([]);

  const onSubmit = () => {
    brandOverviewDispatch.setSelectedCountry(selectedBU);
    brandOverviewDispatch.updateSelectedBrands([]);
    setData(false);
  };

  return (
    <ModalWrapper isOpen={data}>
      <Page mt="3rem" p="1rem" px="1.5rem" width="58%">
        <Flex align="center" justifyContent="space-between">
          <Text width="150px">Select BU</Text>
          <BetaTagWrapper right="-40px" top="-10px" type="coming">
            <Button
              fontSize="0.9rem"
              bg="lightGray"
              variant="gray"
              leftIcon={<Img mr="0.2rem" src="/svg/select global.svg" />}
            >
              Global
            </Button>
          </BetaTagWrapper>
          <Flex alignItems="center">
            <Button
              px="0.9rem"
              height="2.25rem"
              variant="primary"
              onClick={onSubmit}
              leftIcon={<Img mr="0.4rem" src="/svg/save.svg" />}
            >
              Apply
            </Button>
            <IconButton
              borderRadius="50%"
              ml="1rem"
              maxH="none"
              onClick={() => setData(false)}
              icon={<Img src="/svg/close2.svg" />}
              variant="gray"
              bg="lightGray"
            />
          </Flex>
        </Flex>
        <Flex mt="1rem" width="80%" spacing={0}>
          <Button
            variant="primary"
            height="2rem"
            size="sm"
            px="1.75rem"
            border="solid 1px #B27831 !important"
            color="buttonText"
            boxShadow="none"
            fontWeight="normal"
            borderRadius="4px"
          >
            All BUs
          </Button>
        </Flex>
        <Flex wrap="wrap" mt="1rem">
          {brandOverviewState?.countriesData.map((pill, i) => {
            if (selectedBU.country === pill.country) {
              return (
                <Button
                  variant="primary"
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
                  onClick={() => setSelectedBU(pill)}
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
      </Page>
    </ModalWrapper>
  );
};

export default SelectBUModal;
