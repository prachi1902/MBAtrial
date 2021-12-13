import React from "react";
import { useForm } from "react-hook-form";
import { Flex, Img, Button, Box, Text, Skeleton } from "@chakra-ui/react";

import { Container, Section } from "components/library";
import { SelectAsync } from "components/FormComponents";

const MediaPlanType = ({
  loading,
  countryOptions,
  brandOptions,
  planListing,
  setDisplayData,
}) => {
  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValue: { country: [], brand: [], status: [], createdBy: [] },
  });

  const [countryValue, brandValue, createdByValue, statusValue] = watch([
    "country",
    "brand",
    "createdBy",
    "status",
  ]);

  const applyFilters = (data) => {
    console.log(data);
    const temp = [];
    planListing.forEach((item) => {
      if (
        (!data.country?.length ||
          data.country?.some(({ value }) => value === item.fullCountry)) &&
        (!data.brand?.length ||
          data.brand?.some(({ value }) => value === item.brand)) &&
        (!data.status?.length ||
          data.status?.some(({ value }) => value === item.status)) &&
        (!data.createdBy?.length ||
          data.createdBy?.some(({ value }) => value === item.createdBy))
      ) {
        temp.push(item);
      }
    });
    setDisplayData(temp);
  };

  const reset = () => {
    setValue("country", null);
    setValue("brand", null);
    setValue("createdBy", null);
    setValue("status", null);
    setDisplayData(planListing);
  };

  return (
    <Section as="section" mt="1rem" mb="2rem">
      <Container>
        <Flex
          as="form"
          onSubmit={handleSubmit(applyFilters)}
          justifyContent="space-between"
          width="100%"
        >
          <Flex width="70%">
            {loading ? (
              <>
                <Skeleton width="170px" height="38px" mt="0.5rem" mr="1rem" />
                <Skeleton width="170px" height="38px" mt="0.5rem" mr="1rem" />
                <Skeleton width="170px" height="38px" mt="0.5rem" mr="1rem" />
                <Skeleton width="170px" height="38px" mt="0.5rem" />
              </>
            ) : (
              <>
                <Box width="19%" mr="1rem">
                  <SelectAsync
                    label="country"
                    placeholder="Select"
                    name="country"
                    control={control}
                    isMulti={true}
                    noValues
                    defaultOptions={countryOptions}
                    boxProps={{}}
                    labelProps={{ variant: "bold" }}
                  />
                  <Text mt="0.25rem" fontSize="0.875rem">
                    {countryValue?.map((country, i) =>
                      i ? ", " + country.label : country.label
                    )}
                  </Text>
                </Box>
                <Box width="19%" mr="1rem">
                  <SelectAsync
                    label="brand"
                    placeholder="Select"
                    name="brand"
                    control={control}
                    isMulti={true}
                    noValues
                    defaultOptions={brandOptions}
                    labelProps={{ variant: "bold" }}
                    pl="0rem"
                    pr="0rem"
                    fontSize="0.9rem"
                  />
                  <Text mt="0.25rem" fontSize="0.875rem">
                    {brandValue?.map((brand, i) =>
                      i ? ", " + brand.label : brand.label
                    )}
                  </Text>
                </Box>
                <SelectAsync
                  label="created by"
                  placeholder="Select"
                  name="createdBy"
                  control={control}
                  isMulti={true}
                  noValues
                  options={[]}
                  boxProps={{ width: "19%", mr: "1rem" }}
                  labelProps={{ variant: "bold" }}
                  pl="0rem"
                  pr="0rem"
                  fontSize="0.9rem"
                />
                <Box width="19%" mr="1rem">
                  <SelectAsync
                    label="status"
                    placeholder="Select"
                    name="status"
                    control={control}
                    isMulti={true}
                    noValues
                    defaultOptions={[
                      { label: "PLANNING", value: "PLANNING" },
                      { label: "FINAL", value: "FINAL" },
                    ]}
                    labelProps={{ variant: "bold" }}
                    pl="0rem"
                    pr="0rem"
                    fontSize="0.9rem"
                  />{" "}
                  <Text mt="0.25rem" fontSize="0.875rem">
                    {statusValue?.map((status, i) =>
                      i ? ", " + status.label : status.label
                    )}
                  </Text>
                </Box>
              </>
            )}
            {/* <SelectAsync
              label="sort"
              placeholder="Select"
              name="sort"
              control={control}
              options={[]}
              boxProps={{ width: "19%", mr: "1rem" }}
              labelProps={{ variant: "bold" }}
              pl="0rem"
              pr="0rem"
              fontSize="0.9rem"
            /> */}
          </Flex>
          <Flex mt="1rem">
            <Button
              variant="gray"
              leftIcon={<Img src="/svg/reset.svg" />}
              mr="0.8rem"
              type="button"
              onClick={reset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="primary"
              leftIcon={<Img src="/svg/save.svg" />}
              maxHeight="2.25rem"
            >
              Apply
            </Button>
          </Flex>
        </Flex>
        <Flex width="100%" justify="center">
          <Text ml="10rem" color="darkGray" fontSize="0.875rem">
            Showing latest optimized scenario KPIs for non-finalized plans
          </Text>
        </Flex>
      </Container>
    </Section>
  );
};

export default MediaPlanType;
