import React from "react";

import NewMediaSetting from "./Setup/NewMediaSetting";
import IdealMediaPlanLayout from "@/containers/NewPlan/IdealPlan/MediaPlan/IdealMediaPlanLayout";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const IdealPlanLayout = () => {
  const { mediaPlanState } = useMediaPlan();

  return (
    <>
      {mediaPlanState.selectedTab === "Media Plan" ? (
        <IdealMediaPlanLayout />
      ) : (
        <NewMediaSetting />
      )}
    </>
  );
};

export default IdealPlanLayout;
