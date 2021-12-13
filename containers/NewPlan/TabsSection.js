import React, { useState } from "react";
import { Flex, Text, Img, Box, Button } from "@chakra-ui/react";

import { useMediaPlan } from "@/redux/MediaPlanSlice";
import axios, { responseHandler, errorHandler } from "@/lib/http";
import { Container } from "../../components/library";
import NewMediaModal from "@/components/NewMediaPlan/NewMediaModal";
import { analytics } from "@/lib/firebase";
import { slugify } from "@/lib/helper";

const TabsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mediaPlanState, mediaPlanDispatch } = useMediaPlan();

  const executeIdealMediaPlan = async () => {
    setLoading(true);
    try {
      const response = axios({
        url: "/ideal_plan/media_plan",
        method: "put",
        data: {
          id: mediaPlanState.newPlanDetails?.id,
          country: mediaPlanState.newPlanDetails?.country,
          brand: mediaPlanState.newPlanDetails?.brand,
          year: mediaPlanState.newPlanDetails?.year,
          period: mediaPlanState.newPlanDetails?.period,
          woa: mediaPlanState.newPlanDetails?.rec_woa,
        },
      });
      responseHandler(response);

      const temp = Object.keys(mediaPlanState.impMediaInflationValues).map(
        (item) => mediaPlanState.impMediaInflationValues[item]
      );
      const mediaInflationRes = await axios({
        url: "/ideal_plan/imp_adjustment_MI",
        method: "post",
        data: { imp_plan_id: mediaPlanState.newPlanDetails?.id, mi_list: temp },
      });
      responseHandler(mediaInflationRes);

      const bvtTemp = [];
      Object.keys(mediaPlanState.impBvtValues).forEach((item) =>
        bvtTemp.push(mediaPlanState.impBvtValues[item])
      );
      const nrTemp = [];
      Object.keys(mediaPlanState.impNRHLValues).forEach((item) =>
        nrTemp.push(mediaPlanState.impNRHLValues[item])
      );
      const macoTemp = [];
      Object.keys(mediaPlanState.impMacoHLValues).forEach((item) =>
        macoTemp.push(mediaPlanState.impMacoHLValues[item])
      );
      const tablesRes = await axios({
        url: "/ideal_plan/imp_adjustment",
        method: "post",
        data: {
          imp_plan_id: mediaPlanState.newPlanDetails?.id,
          year: mediaPlanState.newPlanDetails?.year,
          maco_per_hl_list: macoTemp,
          nr_per_hl_list: nrTemp,
          bvt_list: bvtTemp,
        },
      });
      responseHandler(tablesRes);
      mediaPlanDispatch.updateTab("Media Plan");
      mediaPlanDispatch.executeIdealPlan();
    } catch (error) {
      error;
    }
    setLoading(false);
  };

  const optimizePlan = async () => {
    setLoading(true);
    try {
      if (!mediaPlanState.selectedPlan.integrateMMM) {
        const response = await axios({
          url: "/opt_plan/optimize_plan",
          method: "put",
          data: {
            media_plan_id: mediaPlanState.newPlanDetails?.id,
            opt_plan_id: mediaPlanState.selectedPlan?.id,
            objective: mediaPlanState.selectedPlan?.objective,
            media_budget: mediaPlanState.selectedPlan?.media_budget,
            value: mediaPlanState.selectedPlan?.value,
            woa: mediaPlanState.selectedPlan?.woa,
          },
        });
        responseHandler(response);

        const constraintRes = await axios({
          url: "/opt_plan/opt_contraints",
          method: "post",
          data: mediaPlanState.selectedPlan?.constraints,
        });
        responseHandler(constraintRes);

        const temp = Object.keys(mediaPlanState.mediaInflationValues).map(
          (item) => mediaPlanState.mediaInflationValues[item]
        );
        const mediaInflationRes = await axios({
          url: "/opt_plan/opt_adjustment_MI",
          method: "post",
          data: { opt_plan_id: mediaPlanState.selectedPlan?.id, mi_list: temp },
        });
        responseHandler(mediaInflationRes);

        const bvtTemp = [];
        Object.keys(mediaPlanState.bvtValues).forEach((item) =>
          bvtTemp.push(mediaPlanState.bvtValues[item])
        );
        const nrTemp = [];
        Object.keys(mediaPlanState.nrHLValues).forEach((item) =>
          nrTemp.push(mediaPlanState.nrHLValues[item])
        );
        const macoTemp = [];
        Object.keys(mediaPlanState.macoHLValues).forEach((item) =>
          macoTemp.push(mediaPlanState.macoHLValues[item])
        );
        const tablesRes = await axios({
          url: "/opt_plan/opt_adjustment",
          method: "post",
          data: {
            opt_plan_id: mediaPlanState.selectedPlan?.id,
            year: mediaPlanState.newPlanDetails?.year,
            maco_per_hl_list: macoTemp,
            nr_per_hl_list: nrTemp,
            bvt_list: bvtTemp,
          },
        });
        responseHandler(tablesRes);
      } else {
        const model_id = await axios({
          url:
            "https://apigatewayschema.azurewebsites.net/job/" +
            mediaPlanState.newPlanDetails.country,
        })
          .then(responseHandler)
          .then((res) => res[0].job_id)
          .catch(errorHandler);
        const trends = [];
        Object.keys(mediaPlanState.bvtValues).forEach((item) =>
          trends.push(mediaPlanState.bvtValues[item]?.bvt)
        );
        const nr = [];
        Object.keys(mediaPlanState.nrHLValues).forEach((item) =>
          nr.push(mediaPlanState.nrHLValues[item]?.nr_per_hl)
        );
        const maco = [];
        Object.keys(mediaPlanState.macoHLValues).forEach((item) =>
          maco.push(mediaPlanState.macoHLValues[item]?.maco_per_hl)
        );
        const inflations = {};
        const temp = [];
        Object.keys(mediaPlanState.mediaInflationValues).forEach((item) => {
          const month =
            mediaPlanState.mediaInflationValues[item]?.month?.toLowerCase();
          inflations[mediaPlanState.mediaInflationValues[item]?.vehicles] = {
            ...inflations[mediaPlanState.mediaInflationValues[item]?.vehicles],
            country: mediaPlanState.newPlanDetails.country.toLowerCase(),
            brand: mediaPlanState.newPlanDetails.brand.toLowerCase(),
            category: mediaPlanState.mediaInflationValues[item]?.category,
            vehicle: slugify(
              mediaPlanState.mediaInflationValues[item]?.vehicles
            ),
            [month]: mediaPlanState.mediaInflationValues[item]?.maco_per_hl,
          };
        });
        Object.keys(inflations).forEach((item) => {
          temp.push(inflations[item]);
        });
        console.log(model_id, temp);
        const job_id = await axios({
          url: "https://apigatewayschema.azurewebsites.net/optimization_run",
          method: "post",
          data: {
            payload: {
              model_id: model_id,
              optz_msg: `Optimization-${Math.random()}`,
              optz_type: "brand",
              optz_module: "ideal_media_investment",
              brand_level_constraints: {
                country: mediaPlanState.newPlanDetails.country.toLowerCase(),
                brand: mediaPlanState.newPlanDetails.brand.toLowerCase(),
                planning_year: mediaPlanState.newPlanDetails.year,
                period: mediaPlanState.newPlanDetails.period,
                min_reach:
                  mediaPlanState.selectedPlan.constraints.weakly_reach_min,
                max_reach:
                  mediaPlanState.selectedPlan.constraints.weakly_reach_max,
                min_qwoa: mediaPlanState.selectedPlan.constraints.min_qwoa,
                optimization_objective: slugify(
                  mediaPlanState.selectedPlan.objective
                ),
                media_budget: mediaPlanState.selectedPlan.media_budget,
                min_spend: 0,
                max_spend: 0,
                target_value: 0,
                start_date: `${mediaPlanState.newPlanDetails.year}-01-01`,
                end_date: `${mediaPlanState.newPlanDetails.year}-12-31`,
              },
              media_hierarchy_level_constraints: [],
              brand_level_financials: {
                nr: {
                  [mediaPlanState.newPlanDetails.year]: nr,
                },
                maco: { [mediaPlanState.newPlanDetails.year]: maco },
                trend: { [mediaPlanState.newPlanDetails.year]: trends },
              },
              media_hierarchy_level_inflation: temp,
            },
          },
        });
        mediaPlanDispatch.updateSelectedPlan({
          job_id: job_id.data.job_id,
        });
      }
      mediaPlanDispatch.updateSelectedPlan({
        hasExecuted: true,
      });
      mediaPlanDispatch.updateTab("Media Plan");
      analytics().logEvent("optimize_plan", {
        name: "button_click",
      });
    } catch (error) {
      errorHandler(error);
    }
    setLoading(false);
  };
  return (
    <Box
      width="100%"
      bg="bgGray"
      px="5rem"
      py="0.5rem"
      boxShadow="0px 2px 0px 0px rgb(0 0 0 / 16%)"
    >
      <Container>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            {mediaPlanState.selectedPlan?.type === "ideal" ? (
              <IdealTabs
                selected={mediaPlanState.selectedTab}
                setSelected={mediaPlanDispatch.updateTab}
                setIsOpen={setIsOpen}
              />
            ) : mediaPlanState.selectedPlan?.type === "opt" ? (
              <OptTabs
                selected={mediaPlanState.selectedTab}
                setSelected={mediaPlanDispatch.updateTab}
                setIsOpen={setIsOpen}
              />
            ) : (
              <SimTabs
                selected={mediaPlanState.selectedTab}
                setSelected={mediaPlanDispatch.updateTab}
                setIsOpen={setIsOpen}
              />
            )}
          </Flex>
          {mediaPlanState.selectedPlan?.type === "ideal" &&
          !mediaPlanState.selectedPlan?.hasExecuted ? (
            <Button
              leftIcon={<Img src="/png/Key.png" />}
              variant="primary"
              fontWeight="500"
              onClick={executeIdealMediaPlan}
              disabled={
                !mediaPlanState.newPlanDetails?.country ||
                !Object.keys(mediaPlanState?.impNRHLValues).length ||
                !Object.keys(mediaPlanState?.impMacoHLValues).length
              }
              isLoading={loading}
            >
              Show Ideal Media Plan
            </Button>
          ) : null}
          {mediaPlanState.selectedPlan?.type === "opt" &&
          !mediaPlanState.selectedPlan?.hasExecuted ? (
            <Button
              leftIcon={<Img mr="0.5rem" src="/png/run plan.png" />}
              variant="primary"
              onClick={optimizePlan}
              disabled={
                !(
                  mediaPlanState.selectedPlan?.objective &&
                  mediaPlanState.selectedPlan?.media_budget &&
                  mediaPlanState.selectedPlan?.woa
                )
              }
              isLoading={loading}
            >
              Optimize Plan
            </Button>
          ) : null}
          {isOpen && <NewMediaModal setView={setIsOpen} />}
        </Flex>
      </Container>
    </Box>
  );
};

export default TabsSection;

const IdealTabs = ({ setIsOpen, selected, setSelected }) => {
  const { mediaPlanState } = useMediaPlan();
  const tabs = [
    { name: "Set Up", coming: false },
    { name: "Media Plan", coming: false },
    { name: "Vehicle Mix", coming: true },
    { name: "Driver Analysis", coming: true },
  ];
  return (
    <>
      {tabs.map((item, i) =>
        selected === item.name ? (
          <Button key={i} mr="1rem" variant="whiteTab">
            {item.name}
          </Button>
        ) : (
          <Box key={i} position="relative">
            {item.coming && (
              <Text
                top="-15px"
                borderRadius="5px"
                color="white"
                px="0.5rem"
                py="0.1rem"
                position="absolute"
                bg="#6D7278"
                mb="1rem"
                fontSize="0.75rem"
              >
                Coming Soon
              </Text>
            )}
            <Text
              as="a"
              color="darkGray"
              fontSize="0.85rem"
              mr="2rem"
              onClick={() => {
                if (item.coming) {
                  return;
                }
                if (
                  item.name === "Media Plan" &&
                  !mediaPlanState.selectedPlan?.hasExecuted
                ) {
                  setIsOpen(true);
                  return;
                }
                setSelected(item.name);
              }}
            >
              {item.name}
            </Text>
          </Box>
        )
      )}
    </>
  );
};

const OptTabs = ({ setIsOpen, selected, setSelected }) => {
  const { mediaPlanState } = useMediaPlan();
  const tabs = [
    { name: "Set Up", coming: false },
    { name: "Media Plan", coming: false },
    { name: "Vehicle Mix", coming: true },
    { name: "Driver Analysis", coming: true },
  ];
  return (
    <>
      {tabs.map((item, i) =>
        selected === item.name ? (
          <Button key={i} mr="1rem" variant="whiteTab">
            {item.name}
          </Button>
        ) : (
          <Box key={i} position="relative">
            {item.coming && (
              <Text
                top="-15px"
                borderRadius="5px"
                color="white"
                px="0.5rem"
                py="0.1rem"
                position="absolute"
                bg="#6D7278"
                mb="1rem"
                fontSize="0.75rem"
              >
                Coming Soon
              </Text>
            )}
            <Text
              as="a"
              color="darkGray"
              fontSize="0.85rem"
              mr="2rem"
              onClick={() => {
                if (item.coming) {
                  return;
                }
                if (
                  item.name === "Media Plan" &&
                  !mediaPlanState.selectedPlan?.hasExecuted
                ) {
                  setIsOpen(true);
                  return;
                }
                setSelected(item.name);
              }}
            >
              {item.name}
            </Text>
          </Box>
        )
      )}
    </>
  );
};

const SimTabs = ({ setIsOpen, selected, setSelected }) => {
  const tabs = [
    { name: "Media Plan", coming: false },
    { name: "Vehicle Mix", coming: true },
    { name: "Maximize KPIs", coming: true },
    { name: "Driver Analysis", coming: true },
  ];
  return (
    <>
      {tabs.map((item, i) =>
        selected === item.name ? (
          <Button key={i} mr="1rem" variant="whiteTab">
            {item.name}
          </Button>
        ) : (
          <Box key={i} position="relative">
            {item.coming && (
              <Text
                top="-15px"
                borderRadius="5px"
                color="white"
                px="0.5rem"
                py="0.1rem"
                position="absolute"
                bg="#6D7278"
                mb="1rem"
                fontSize="0.75rem"
              >
                Coming Soon
              </Text>
            )}
            <Text
              as="a"
              color="darkGray"
              fontSize="0.85rem"
              mr="2rem"
              onClick={() => {
                if (item.coming) {
                  return;
                }
                setSelected(item.name);
              }}
            >
              {item.name}
            </Text>
          </Box>
        )
      )}
    </>
  );
};
