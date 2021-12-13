import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Flex, Text, Box, FormLabel } from "@chakra-ui/react";

import { Section, Page } from "@/components/library";
import {
  InputWithSymbol,
  SelectDropdown,
  FormatInput,
} from "@/components/FormComponents";
import RightWidget from "./RightWidget";
import Slider from "@/components/FormComponents/Slider";
import useAxios from "@/components/Hooks/useAxios";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import helper from "@/lib/helper";
import Error from "@/components/FormComponents/ErrorMessage";
import Switch from "@/components/FormComponents/NewSwitch";

const SetupForm = () => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: { value: 0, integrateMMM: "No" },
    mode: "onChange",
  });
  const { mediaPlanDispatch, mediaPlanState } = useMediaPlan();

  const [objectives, setObjectives] = useState([]);
  const [objectiveOptions, setObjectiveOptions] = useState([]);
  const [showSecondary, setShowSecondary] = useState(false);
  const [inputType, setInputType] = useState("");
  const [totalIdealSpend, setTotalIdealSpend] = useState(0);
  const { execute, error, response } = useAxios({
    url: "/opt_plan/opt_objective",
    method: "get",
    manual: true,
  });

  const objective = watch("objective");
  const media_budget = watch("media_budget");
  const integrateMMM = watch("integrateMMM");
  const value = watch("value", 0);
  const woa = watch("woa", 0);

  const [objectiveValue, setObjectiveValue] = useState(null);

  useEffect(() => {
    execute();
    if (mediaPlanState.idealPlanSpends) {
      let temp = 0;
      mediaPlanState.idealPlanSpends.forEach((item) => {
        temp += parseFloat(item.opt_planned_spend) || 0;
      });
      setTotalIdealSpend(temp);
    }
  }, []);

  useEffect(() => {
    if (mediaPlanState.selectedPlan.objective) {
      setValue("objective", {
        label: mediaPlanState.selectedPlan.objective,
        value: mediaPlanState.selectedPlan.objective,
      });
      setValue("media_budget", mediaPlanState.selectedPlan.media_budget);
      setValue("woa", mediaPlanState.selectedPlan.woa);
    }
  }, [mediaPlanState.selectedPlan]);

  useEffect(() => {
    if (response) {
      setObjectives(response.objectives);
      let tempArray = [];
      response.objectives.map((obj, i) => {
        tempArray.push({
          label: obj.objective,
          value: obj.objective,
        });
      });
      setObjectiveOptions(tempArray);
    }
    if (error) {
      console.log(error);
    }
  }, [response, error]);

  useEffect(() => {
    setObjectiveValue(objective?.label);
    objectives.find((obj, i) => {
      if (obj.objective === objective?.label) {
        if (obj.secondary_input) {
          setShowSecondary(true);
          setInputType(obj.seconday_input_type);
        } else {
          setShowSecondary(false);
        }
      }
    });
  }, [objective]);

  useEffect(() => {
    if (objectiveValue && media_budget && woa) {
      if (woa > 52) {
        setError("woa_custom", {
          type: "manual",
          message: "WOA cannot be more than 52.",
        });
        mediaPlanDispatch.updateSelectedPlan({
          objective: 0,
          media_budget: 0,
          value: 0,
          woa: 0,
        });
      } else if (woa < 0) {
        setError("woa_custom", {
          type: "manual",
          message: "WOA cannot be negative.",
        });
        mediaPlanDispatch.updateSelectedPlan({
          objective: 0,
          media_budget: 0,
          value: 0,
          woa: 0,
        });
      } else {
        clearErrors("woa_custom");
        mediaPlanDispatch.updateSelectedPlan({
          objective: objectiveValue,
          media_budget: media_budget,
          value: value ?? 0,
          woa: woa ?? 0,
        });
      }
    }
  }, [objectiveValue, media_budget, value, woa]);

  useEffect(() => {
    mediaPlanDispatch.updateSelectedPlan({
      integrateMMM: integrateMMM === "Yes",
    });
  }, [integrateMMM]);

  return (
    <Section as="section" mt="1rem">
      <Page bg="#f8f8f8">
        <Flex width="100%">
          <Box px="3.5rem" py="3rem" width="65%" height="22rem">
            <Flex
              justifyContent="space-between"
              width="70%"
              margin="auto"
              mb="1rem"
            >
              <SelectDropdown
                disabled={mediaPlanState.selectedPlan?.hasExecuted}
                name="objective"
                control={control}
                options={objectiveOptions}
                label="Optimization Objective"
                boxProps={{ width: "48%" }}
                labelProps={{ variant: "bold" }}
                height="3.5rem"
                inputHeight="3.5rem"
                menuWidth="500px"
                multipleColumns={true}
              />
              {showSecondary ? (
                inputType === "textfield" ? (
                  <InputWithSymbol
                    width="48%"
                    backSymbol="HL"
                    height="3.5rem"
                    type="number"
                    label={objectiveValue}
                    {...register("value")}
                  />
                ) : inputType === "slider" ? (
                  <Slider />
                ) : null
              ) : (
                <Flex
                  alignItems="center"
                  mt="20px"
                  px="1rem"
                  width="48%"
                  bg="#fbfbfb"
                  color="#8c8c8c"
                  border="solid 1px #e2e2e2"
                  height="3.5rem"
                >
                  -
                </Flex>
              )}
            </Flex>
            <Flex justifyContent="space-between" width="70%" margin="auto">
              <FormatInput
                name="media_budget"
                control={control}
                placeholder="Enter Media Budget"
                inputStyles={{
                  width: "100%",
                  height: "3.5rem",
                  fontSize: "1.25rem",
                  backgroundColor: "#fff1df",
                }}
                label="media budget"
                rules={{ required: "Required" }}
                boxProps={{
                  width: "48%",
                  height: "4.5rem",
                }}
                errors={errors}
                borderColor="#ffc885"
                disabled={mediaPlanState.selectedPlan?.hasExecuted}
              />
              <Box width="48%">
                <InputWithSymbol
                  height="60px"
                  fontWeight="600"
                  type="number"
                  errors={errors}
                  flexProps={{ mb: "0" }}
                  fontSize="1.25rem"
                  bg={
                    mediaPlanState.selectedPlan?.hasExecuted
                      ? "pageBg"
                      : "white"
                  }
                  disabled={mediaPlanState.selectedPlan?.hasExecuted}
                  mr="0.5rem"
                  color={
                    mediaPlanState.selectedPlan?.hasExecuted
                      ? "#a3a3a3"
                      : "inherit"
                  }
                  label="Weeks on Air"
                  {...register("woa", {
                    min: { value: 0, message: "WOA cannot be negative." },
                    max: { value: 52, message: "WOA cannot be more than 52." },
                  })}
                />
                <Error name="woa_custom" errors={errors} />
              </Box>
            </Flex>
            <Flex mt="1rem" width="70%" marginX="auto">
              <Box>
                <FormLabel>ideal max budget</FormLabel>
                <Text fontSize="1.25rem">
                  {helper.currencyFormatter(totalIdealSpend)}
                </Text>
              </Box>
              <Box>
                <FormLabel>ly budget</FormLabel>
                <Text fontSize="1.25rem">
                  {helper.currencyFormatter(
                    mediaPlanState.lyDetails?.totalSpend || 0
                  )}
                </Text>
              </Box>
              <Box ml="1.5rem">
                <FormLabel>integrated with MMM</FormLabel>
                <Switch
                  disabled={mediaPlanState.selectedPlan?.hasExecuted}
                  flexProps={{ mt: "0.5rem" }}
                  name="integrateMMM"
                  control={control}
                  options={["No", "Yes"]}
                />
              </Box>
            </Flex>
          </Box>
          <RightWidget />
        </Flex>
      </Page>
    </Section>
  );
};

export default SetupForm;
