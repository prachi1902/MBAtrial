import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

import { useMediaPlan } from "@/redux/MediaPlanSlice";
import DriverAnalysisLayout from "components/ScenarioPlan/DriverAnalysis/DriverAnalysisLayout";
import MediaPlanLayout from "./MediaPlan/MediaPlanLayout";
import MaximiseKPIsLayout from "components/ScenarioPlan/MaximiseKPIs/MaximiseKPIsLayout";

const ScenarioPlanLayout = () => {
  const [selected, setSelected] = useState("media-plan");
  const [maximizeKPI, setMaximizeKPI] = useState(false);
  const { mediaPlanState } = useMediaPlan();

  return (
    <Box pb="4rem">
      {mediaPlanState.selectedTab === "Media Plan" ? (
        <MediaPlanLayout />
      ) : selected === "maximize-kpis" ? (
        <MaximiseKPIsLayout
          setMaximizeKPI={setMaximizeKPI}
          maximizeKPI={maximizeKPI}
        />
      ) : selected === "driver-analysis" ? (
        <DriverAnalysisLayout />
      ) : null}
    </Box>
  );
};

export default ScenarioPlanLayout;
