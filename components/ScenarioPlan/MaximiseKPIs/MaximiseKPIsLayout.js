import React from "react";
import Popup from "@/components/common/Popup";
import BrandResultsSection from "./BrandResultsSection";
import MaximizationLayout from "./Maximize/MaximizationLayout";

const MaximizeKPIsLayout = ({ setMaximizeKPI, maximizeKPI }) => {
  return maximizeKPI ? (
    <>
      <MaximizationLayout />
    </>
  ) : (
    <>
      <Popup
        imgSrc={"/svg/optimized plan illustration2.svg"}
        text={[
          "When your simulated KPIs are underperforming compare to Optimized plans choose to 'Maximize'",
          <br key={1} />,
          "Define a new Maximization Objective & Maximization Constraints to Maximize this simulation.",
        ]}
        closeButton={false}
        textProps={{
          fontSize: "0.96rem",
          lineHeight: "2rem",
          letterSpacing: "0.02rem",
          wordSpacing: "0.06rem",
        }}
        flexProps={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        bg="#ffffff"
      />
      <BrandResultsSection setMaximizeKPI={setMaximizeKPI} />
    </>
  );
};

export default MaximizeKPIsLayout;
