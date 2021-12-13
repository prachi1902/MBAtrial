import React, { useState, useEffect } from "react";

import Navbar from "components/Navbar/Navbar";
import axios, { responseHandler, errorHandler } from "lib/http";
import MediaPlanType from "./MediaPlanType";
import MediaTable from "./MediaTable";
import TabsSection from "./TabsSection";
import helper from "@/lib/helper";

const MediaPlannerLayout = () => {
  const [loading, setLoading] = useState(false);
  const [planListing, setPlanListing] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios({ url: "/media_plan/all" })
      .then(responseHandler)
      .then((response) => {
        const tempCountry = [];
        const tempBrand = [];
        const formattedListing = response.media_plans?.map((plan) => {
          if (!tempCountry.includes(plan.country)) {
            tempCountry.push(plan.country);
          }
          if (!tempBrand.includes(plan.brand)) {
            tempBrand.push(plan.brand);
          }
          return {
            brand: plan.brand,
            country: plan.country?.substring(0, 3) || "-",
            period: plan.period || "-",
            year: plan.year || "-",
            spend: plan.spend,
            media_nr: plan.media_nr,
            media_roi: plan.media_roi,
            vehicle_mix: plan.vehicle_mix || "-",
            cost_exc_mix: plan.cost_exc_mix || "-",
            effectiveness: plan.effectiveness || "-",
            plan_by: plan.plan_by || "Krishna",
            modified: plan.modified || "-",
            scenario: Math.floor(Math.random() * 3 + 1),
            status: plan.status || "-",
            fullCountry: plan.country,
            id: plan.id,
          };
        });
        setCountryOptions(helper.arrayToOptions(tempCountry));
        setBrandOptions(helper.arrayToOptions(tempBrand));
        setPlanListing(formattedListing);
        setDisplayData(formattedListing);
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <TabsSection />
      <MediaPlanType
        countryOptions={countryOptions}
        brandOptions={brandOptions}
        loading={loading}
        planListing={planListing}
        setDisplayData={setDisplayData}
      />
      <MediaTable planListing={displayData} loading={loading} />
    </>
  );
};

export default MediaPlannerLayout;
