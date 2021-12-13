import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import axios, { responseHandler, errorHandler } from "@/lib/http";
import Navigation from "components/NewPlan/Navigation";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import ScenarioPlanLayout from "./SimPlan/ScenarioPlanLayout";
import OptPlanLayout from "./OptPlan/OptPlanLayout";
import IdealMediaPlanLayout from "./IdealPlan/IdealPlanLayout";
import ScenarioSection from "@/containers/NewPlan/ScenarioSection";
import TabsSection from "@/containers/NewPlan/TabsSection";
import { analytics } from "@/lib/firebase";

const NewMediaPlanLayout = () => {
  const { mediaPlanDispatch, mediaPlanState } = useMediaPlan();

  useEffect(() => {
    if (mediaPlanState.createNew) {
      axios({ url: "/media_plan", method: "post", params: { type: "media" } })
        .then(responseHandler)
        .then((response) => {
          mediaPlanDispatch.createNewPlan({
            id: response.id,
            name: response.name,
          });
          analytics().logEvent("new_media_plan_created", {
            name: "button_click",
          });
        })
        .catch(errorHandler);
    }
  }, [mediaPlanState.createNew]);

  return (
    <Box pb="4rem">
      <Navigation
        idealMediaPlan={false}
        setFinalized={mediaPlanState.step === "scenario" && true}
      />
      <ScenarioSection />
      <TabsSection />
      {mediaPlanState.selectedPlan.type === "ideal" && (
        <IdealMediaPlanLayout key={mediaPlanState.selectedPlan.id} />
      )}
      {mediaPlanState.selectedPlan.type === "opt" && <OptPlanLayout />}
      {mediaPlanState.selectedPlan.type === "sim" && <ScenarioPlanLayout />}
    </Box>
  );
};

export default NewMediaPlanLayout;
