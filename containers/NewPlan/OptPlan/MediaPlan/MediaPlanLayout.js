import React, { useState, useEffect } from "react";

import Popup from "@/components/common/Popup";
import OptimizedPlan from "./OptimizedPlanSection";
import PlanKPIsSection from "./PlanKPIsSection";
import axios, { responseHandler, errorHandler } from "@/lib/http";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import FullScreenLoader from "@/components/common/FullScreenLoader";

const MediaPlanLayout = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [loading, setLoading] = useState(false);
  const { mediaPlanState, mediaPlanDispatch } = useMediaPlan();

  useEffect(() => {
    const getStatus = setInterval(() => {
      if (mediaPlanState.selectedPlan.integrateMMM) {
        setLoading(true);
        axios({
          url:
            "https://apigatewayschema.azurewebsites.net/job_status/" +
            mediaPlanState.selectedPlan.job_id,
        })
          .then(responseHandler)
          .then((response) => {
            if (response.job_status === "successful") {
              clearInterval(getStatus);
              axios({
                url:
                  "https://apigatewayschema.azurewebsites.net/complete_job_results/" +
                  mediaPlanState.selectedPlan.job_id,
              })
                .then(responseHandler)
                .then((executeJob) => {
                  mediaPlanDispatch.updateSelectedPlan({
                    spends: executeJob.optimize_response,
                  });
                  mediaPlanDispatch.updateSelectedPlan({
                    otherDetails: {
                      woa: null,
                      qwoa: null,
                      hiatus_period: null,
                    },
                  });
                })
                .catch(errorHandler)
                .finally(() => {
                  setLoading(false);
                });
            }
          })
          .catch((err) => {
            errorHandler(err);
            setLoading(false);
            clearInterval(getStatus);
          });
      } else {
        clearInterval(getStatus);
      }
    }, 5000);
    return () => clearInterval(getStatus);
  }, []);

  const executePlan = async () => {
    if (!mediaPlanState.selectedPlan.spends?.length) {
      setLoading(true);
      if (!mediaPlanState.selectedPlan.integrateMMM) {
        axios({
          url: "/opt_plan/execute",
          method: "post",
          params: { opt_id: mediaPlanState.selectedPlan.id },
        })
          .then(responseHandler)
          .then((data) => {
            mediaPlanDispatch.updateSelectedPlan({
              spends: data.optimize_response,
            });
            axios({
              url: "/hitausperiod",
              method: "post",
              params: { id: mediaPlanState.selectedPlan.id },
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
          .catch(errorHandler);
      }
    }
  };

  useEffect(() => {
    executePlan();
  }, []);

  return (
    <>
      {loading && <FullScreenLoader />}

      {showPopup && (
        <Popup
          imgSrc={"/svg/optimized plan illustration2.svg"}
          text={[
            "This optimized plan is a benchmark to be used to compare other scenarios.",
            <br key={1} />,
            "You can change the spend field and optimize again ",
            <br key={2} />,
            "or you can change constraints to create a new optimized plan.",
          ]}
          flexProps={{ marginRight: "10rem" }}
          setShowPopup={setShowPopup}
        />
      )}
      <OptimizedPlan />
      <PlanKPIsSection />
    </>
  );
};

export default MediaPlanLayout;
