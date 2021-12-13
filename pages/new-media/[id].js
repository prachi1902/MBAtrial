import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import NewMediaPlanLayout from "@/containers/NewPlan/NewMediaPlanLayout";

import axios, { responseHandler, errorHandler } from "lib/http";
import { useMediaPlan } from "redux/MediaPlanSlice";
import FullScreenLoader from "@/components/common/FullScreenLoader";

const MediaPlanner = ({ id }) => {
  const { mediaPlanDispatch } = useMediaPlan();
  const [loading, setLoading] = useState(true);
  const setup = async () => {
    setLoading(true);
    const dump = {
      opt_spends: {},
      opt_hiatus: {},
    };
    await axios({ url: "/media_plan", params: { media_plan_id: id } })
      .then(responseHandler)
      .then(async (res) => {
        const idealPlans = [
          {
            type: "ideal",
            title: "Ideal Media Plan",
            hasExecuted: true,
          },
        ];
        await axios({
          url: "/ideal_plan/execute",
          method: "post",
          params: { imp_id: id },
        })
          .then(responseHandler)
          .then((data) => {
            mediaPlanDispatch.updateIdealPlanSpends(data.ideal_media_response);
            axios({
              url: "/hitausperiod",
              method: "post",
              params: { id: id },
            })
              .then(responseHandler)
              .then((data) => {
                idealPlans[0].otherDetails = {
                  woa: data.response.woa,
                  qwoa: data.response.woa,
                  hiatus_period: data.response.hiatus_period,
                };
                mediaPlanDispatch.updateSelectedPlan({
                  otherDetails: {
                    woa: data.response.woa,
                    qwoa: data.response.woa,
                    hiatus_period: data.response.hiatus_period,
                  },
                });
              })
              .catch(errorHandler);
          })
          .catch(errorHandler);
        const optPlans = await Promise.all(
          res.media_plans.opt_plans.map(async (item) => {
            let otherDetails = {};
            return axios({
              url: "/opt_plan/execute",
              method: "post",
              params: { opt_id: item.opt_plan_id },
            })
              .then(responseHandler)
              .then((res) => {
                dump.opt_spends[item.opt_plan_id] = res.optimize_response;
                return axios({
                  url: "/hitausperiod",
                  method: "post",
                  params: { id: item.opt_plan_id },
                })
                  .then(responseHandler)
                  .then((data) => {
                    otherDetails = {
                      woa: data.response.woa,
                      qwoa: data.response.woa,
                      hiatus_period: data.response.hiatus_period,
                    };
                    dump.opt_hiatus[item.opt_plan_id] = {
                      woa: data.response.woa,
                      qwoa: data.response.woa,
                      hiatus_period: data.response.hiatus_period,
                    };
                    return {
                      type: "opt",
                      title: item.opt_plan_name,
                      id: item.opt_plan_id,
                      hasExecuted: true,
                      objective: item.objective,
                      media_budget: item.media_budget,
                      value: item.value,
                      spends: res.optimize_response,
                      woa: data.response.woa,
                      otherDetails,
                    };
                  })
                  .catch(errorHandler);
              })
              .catch(errorHandler);
          })
        );
        const simPlans = await Promise.all(
          res.media_plans.sim_plans.map(async (item) => {
            const simSpends = await axios({
              url: "/sim_plan/execute",
              method: "post",
              params: { sim_id: item.sim_plan_id },
            })
              .then(responseHandler)
              .then((res) => {
                return res.simulate_response;
              })
              .catch(errorHandler);
            return {
              type: "sim",
              title: item.name,
              id: item.sim_plan_id,
              hasExecuted: true,
              sim_spends: simSpends,
              opt_spends: dump.opt_spends[item.opt_plan_id] || [],
              opt_id: item.opt_plan_id,
              opt_plan_details: dump.opt_hiatus[item.opt_plan_id] || {},
              opt_plan_name:
                "From " +
                optPlans.filter((opt) => opt.id === item.opt_plan_id)[0].title,
            };
          })
        );
        mediaPlanDispatch.updatePlanBrandDetails({
          ...res.media_plans.ideal_plan,
          id,
        });
        mediaPlanDispatch.updateListOfPlans([
          ...idealPlans,
          ...optPlans,
          ...simPlans,
        ]);
        mediaPlanDispatch.selectPlan(idealPlans[0]);
      })
      .catch(errorHandler);
    setLoading(false);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <Layout withAuth title="New Media Plan">
      {loading && <FullScreenLoader />}
      <NewMediaPlanLayout />
    </Layout>
  );
};

export default MediaPlanner;

export const getServerSideProps = async (ctx) => {
  const id = ctx.params?.id;
  return {
    props: {
      id,
    },
  };
};
