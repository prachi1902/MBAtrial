import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import NewMediaPlanLayout from "@/containers/NewPlan/NewMediaPlanLayout";

import { useMediaPlan } from "redux/MediaPlanSlice";

const MediaPlanner = () => {
  const { mediaPlanDispatch } = useMediaPlan();

  useEffect(() => {
    mediaPlanDispatch.changeNewPlanFlag(true);
  }, []);

  return (
    <Layout withAuth title="New Media Plan">
      <NewMediaPlanLayout />
    </Layout>
  );
};

export default MediaPlanner;
