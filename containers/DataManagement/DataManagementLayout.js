import React from "react";

import Navigations from "./Navigations";
import TabsSection from "./TabsSection";
import MasterLayout from "./Master/MasterLayout";
import DataSetLayout from "./DataSet/DataSetLayout";
import UIConfigurationsLayout from "./UIConfigurations/UIConfigurationsLayout";
import { useDataManagement } from "redux/DataManagementSlice";

const DataManagementLayout = () => {
  const { dataMngState } = useDataManagement();

  const tabs = ["Master", "Data Sets"];

  return (
    <>
      <Navigations />
      <TabsSection tabs={tabs} />
      {dataMngState.tab === "Master" ? (
        <MasterLayout />
      ) : dataMngState.tab === "Data Sets" ? (
        <DataSetLayout />
      ) : dataMngState.tab === "UI Configurations" ? (
        <UIConfigurationsLayout />
      ) : null}
    </>
  );
};

export default DataManagementLayout;
