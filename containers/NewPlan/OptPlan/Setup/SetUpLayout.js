import React from "react";
import ConstraintAdjustmentSection from "components/NewPlan/OptPlan/SetUp/ConstraintAdjustmentSection";
import SetupForm from "@/components/NewPlan/OptPlan/SetUp/SetupForm";

const SetUpLayout = () => {
  return (
    <>
      <SetupForm />
      <ConstraintAdjustmentSection />
    </>
  );
};

export default SetUpLayout;
