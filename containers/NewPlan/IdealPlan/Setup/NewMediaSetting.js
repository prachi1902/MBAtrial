import React, { useEffect, useState } from "react";
import { Flex, Box, Img, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Section, Page } from "components/library";
import { SelectDropdown } from "components/FormComponents";
import RightWidget from "components/NewMediaPlan/RightWidget";
import useAxios from "components/Hooks/useAxios";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import FullScreenLoader from "components/common/FullScreenLoader";
import helper from "@/lib/helper";
import ConstraintAdjustmentSection from "components/NewPlan/IdealPlan/SetUp/ConstraintAdjustmentSection";

const NewMediaSetting = () => {
  const { control, watch, setValue, register } = useForm();
  const { mediaPlanDispatch, mediaPlanState } = useMediaPlan();
  const [countryOptions, setCountryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const {
    execute: countryExe,
    error: countryError,
    response: countryRes,
    isLoading: countryLoading,
  } = useAxios({
    url: "/country_brand",
    method: "get",
    manual: true,
  });

  const { execute, error, response, isLoading } = useAxios({
    url: "/ideal_plan/brand_details",
    method: "post",
    manual: true,
  });

  const [selectedCountry, selectedBrand, selectedYear, selectedPeriod] = watch([
    "country",
    "brand",
    "year",
    "period",
  ]);

  useEffect(() => {
    if (mediaPlanState.selectedPlan.hasExecuted || !mediaPlanState.createNew) {
      setValue("brand", {
        label: (
          <Img
            width="4rem"
            src={`/Logos/Brand_Logos/${helper.toTitleCase(
              mediaPlanState.newPlanDetails.brand
            )}.png`}
          />
        ),
        value: mediaPlanState.newPlanDetails.brand,
      });
      setValue("country", {
        label: mediaPlanState.newPlanDetails.country,
        value: mediaPlanState.newPlanDetails.country,
      });
      setValue("year", {
        label: mediaPlanState.newPlanDetails.year,
        value: mediaPlanState.newPlanDetails.year,
      });
      setValue("period", {
        label: mediaPlanState.newPlanDetails.period,
        value: mediaPlanState.newPlanDetails.period,
      });
    }
  }, [
    mediaPlanState.newPlanDetails.brand,
    mediaPlanState.newPlanDetails.country,
    countryRes,
  ]);

  useEffect(() => {
    countryExe();
  }, []);

  useEffect(() => {
    if (selectedCountry && !mediaPlanState.selectedPlan.hasExecuted) {
      const options = selectedCountry?.brand?.map((brand) => {
        return {
          label: <BrandLabel name={brand.brand} />,
          value: brand.brand,
        };
      });
      setBrandOptions(options);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (countryRes) {
      const options = countryRes?.countries?.map((country) => {
        return {
          label: country.country,
          value: country.country,
          brand: country.brands,
        };
      });
      setCountryOptions(options);
    }
    if (countryError) {
      console.log(countryError);
    }
  }, [countryRes, countryError]);

  useEffect(() => {
    if (
      selectedBrand?.value &&
      selectedCountry?.value &&
      selectedPeriod?.value &&
      selectedYear?.value
    ) {
      execute({
        data: {
          country: selectedCountry.value,
          brand: selectedBrand.value,
          year: selectedYear.value,
          period: selectedPeriod.value,
        },
      });
    }
  }, [
    selectedBrand,
    selectedCountry,
    selectedPeriod,
    selectedYear,
    mediaPlanState.selectedPlan.hasExecuted,
  ]);

  useEffect(() => {
    if (response) {
      mediaPlanDispatch.updatePlanBrandDetails(response.brand_details[0]);
    }
  }, [response, error]);

  return (
    <>
      <Section as="section" mt="1rem">
        {(isLoading || countryLoading) && <FullScreenLoader />}
        <Page bg="#f8f8f8">
          <Flex width="100%">
            <Box p="5rem" width="65%" height="22rem">
              <Flex
                justifyContent="space-between"
                width="75%"
                margin="auto"
                mb="1rem"
              >
                <SelectDropdown
                  name="country"
                  control={control}
                  options={countryOptions}
                  label="country"
                  boxProps={{ width: "48%" }}
                  labelProps={{ variant: "bold" }}
                  height="60px"
                  inputHeight="3.5rem"
                  disabled={mediaPlanState.selectedPlan.hasExecuted}
                />
                <SelectDropdown
                  name="brand"
                  control={control}
                  options={brandOptions}
                  label="brand"
                  boxProps={{ width: "48%" }}
                  labelProps={{ variant: "bold" }}
                  height="60px"
                  disabled={mediaPlanState.selectedPlan.hasExecuted}
                  inputHeight="3.5rem"
                />
              </Flex>
              <Flex justifyContent="space-between" width="75%" margin="auto">
                <SelectDropdown
                  name="year"
                  control={control}
                  options={[
                    { label: "2021", value: "2021" },
                    { label: "2022", value: "2022" },
                  ]}
                  label="year"
                  boxProps={{ width: "48%" }}
                  labelProps={{ variant: "bold" }}
                  height="60px"
                  disabled={mediaPlanState.selectedPlan.hasExecuted}
                  inputHeight="3.5rem"
                />
                <SelectDropdown
                  name="period"
                  control={control}
                  options={[{ label: "1YP", value: "1yp" }]}
                  label="period"
                  boxProps={{ width: "48%" }}
                  labelProps={{ variant: "bold" }}
                  height="60px"
                  disabled={mediaPlanState.selectedPlan.hasExecuted}
                  inputHeight="3.5rem"
                />
              </Flex>
            </Box>
            <RightWidget />
          </Flex>
        </Page>
      </Section>
      <ConstraintAdjustmentSection />
    </>
  );
};

export default NewMediaSetting;

const BrandLabel = ({ name }) => {
  const [showImage, setShowImage] = useState(true);
  return (
    <Box>
      {showImage ? (
        <Img
          width="5rem"
          onError={() => setShowImage(false)}
          src={`/Logos/Brand_Logos/${helper.toTitleCase(name)}.png`}
        />
      ) : (
        <Text>{name}</Text>
      )}
    </Box>
  );
};
