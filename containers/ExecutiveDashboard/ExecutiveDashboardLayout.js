import React, { useState } from "react";

import Navbar from "components/Navbar/Navbar";
import HistoricalsLayout from "./Historicals/HistoricalsLayout";
import MyDeckLayout from "./MyDeck/MyDeckLayout";
import ProjectionsLayout from "./Projections/ProjectionsLayout";
import ResponseCurvesLayout from "./ResponseCurves/ResponseCurvesLayout";
import TabsSection from "@/components/ExecutiveDashboard/TabsSection";

const BrandOverviewLayout = () => {
  const [selected, setSelected] = useState("historicals");

  const tabs = [
    { name: "Historicals", keyword: "historicals" },
    { name: "Projections", keyword: "projections", disabled: true },
    { name: "Response Curves", keyword: "response-curves", disabled: true },
    { name: "My Deck", keyword: "my-deck" },
  ];

  return (
    <>
      <Navbar />
      <TabsSection tabs={tabs} selected={selected} setSelected={setSelected} />
      {selected === "historicals" ? (
        <HistoricalsLayout />
      ) : selected === "projections" ? (
        <ProjectionsLayout />
      ) : selected === "response-curves" ? (
        <ResponseCurvesLayout />
      ) : selected === "my-deck" ? (
        <MyDeckLayout />
      ) : null}
    </>
  );
};

export default BrandOverviewLayout;
