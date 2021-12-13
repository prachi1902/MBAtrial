import React from "react";
import BrandResults from "./BrandResults";
import Navbar from "./Navbar";
import ScenarioSection from "./ScenarioSection";
import ScenarioVehicleMix from "./ScenarioVehicleMix";

const CompareScenarioLayout = () => {
  return (
    <>
      <Navbar />
      <ScenarioSection
        scenarioCardDetails={[
          {
            title: "Ideal Media Plan",
            bg: "cardRed",
            tagBg: "#F9B0AF",
            menu: false,
            current: true,
            subhead: false,
          },
          {
            title: "Opt Plan 1",
            bg: "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%);",
            tagBg: "#F7E3C9",
            menu: false,
            current: true,
            subhead: true,
            subheading: "MAX NR",
            subheadColor: "#905F26",
          },
          {
            title: "Sim Plan 1",
            bg: "white",
            tagBg: "#f4f4f4",
            menu: false,
            current: true,
            subhead: true,
            subheading: "FROM OPT PLAN 1",
          },
        ]}
      />
      <BrandResults />
      <ScenarioVehicleMix />
    </>
  );
};

export default CompareScenarioLayout;
