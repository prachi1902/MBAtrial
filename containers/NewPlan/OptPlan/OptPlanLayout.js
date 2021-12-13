import React from "react";
import { Box } from "@chakra-ui/react";

import { useMediaPlan } from "@/redux/MediaPlanSlice";
import VehicleMixEditor from "components/NewPlan/OptPlan/VehicleMix/VehicleMixEditor";
import MediaPlanLayout from "./MediaPlan/MediaPlanLayout";
import SetUpLayout from "./Setup/SetUpLayout";

const OptPlanLayout = () => {
  const { mediaPlanState } = useMediaPlan();
  return (
    <Box pb="4rem">
      {mediaPlanState.selectedTab === "Set Up" ? (
        <SetUpLayout />
      ) : mediaPlanState.selectedTab === "Media Plan" ? (
        <MediaPlanLayout />
      ) : mediaPlanState.selectedTab === "Vehicle Mix" ? (
        <VehicleMixEditor />
      ) : null}
    </Box>
  );
};

export default OptPlanLayout;
