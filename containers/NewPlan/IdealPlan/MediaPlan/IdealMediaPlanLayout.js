import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import OptimizedPlan from "./OptimizedPlanSection";
import PlanDetailsTable from "./PlanDetailsTable";

import Popup from "components/common/Popup";
import axios, { responseHandler, errorHandler } from "@/lib/http";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import FullScreenLoader from "@/components/common/FullScreenLoader";

const IdealMediaPlanLayout = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [loading, setLoading] = useState(false);
  const { mediaPlanState, mediaPlanDispatch } = useMediaPlan();

  useEffect(() => {
    if (!mediaPlanState.idealPlanSpends?.length) {
      setLoading(true);
      axios({
        url: "/ideal_plan/execute",
        method: "post",
        params: { imp_id: mediaPlanState.newPlanDetails.id },
      })
        .then(responseHandler)
        .then((data) => {
          mediaPlanDispatch.updateIdealPlanSpends(data.ideal_media_response);
          axios({
            url: "/hitausperiod",
            method: "post",
            params: { id: mediaPlanState.newPlanDetails.id },
          })
            .then(responseHandler)
            .then((data) => {
              mediaPlanDispatch.updateSelectedPlan({
                otherDetails: {
                  woa: data.response.woa,
                  qwoa: data.response.woa,
                  hiatus_period: data.response.hiatus_period,
                },
              });
            })
            .catch(errorHandler)
            .finally(() => setLoading(false));
        })
        .catch(errorHandler)
        .finally(() => setLoading(false));
    }
  }, []);
  return (
    <Box pb="4rem">
      {loading && <FullScreenLoader />}
      {showPopup && (
        <Popup
          imgSrc={"/svg/carousel2.svg"}
          text={[
            "This ideal media plan is a benchmark to be used to compare other scenarios",
            <br key={1} />,
            "This plan processes the maximum spending possible while maximising ROI for every vehicle",
          ]}
          flexProps={{ marginBottom: "2rem", marginRight: "5rem" }}
          setShowPopup={setShowPopup}
        />
      )}
      <OptimizedPlan />
      <PlanDetailsTable />
    </Box>
  );
};

export default IdealMediaPlanLayout;
