import React from "react";

import Layout from "@/components/Layout";
import BrandOverviewLayout from "@/containers/ExecutiveDashboard/ExecutiveDashboardLayout";

const BrandOverview = () => {
  return (
    <Layout withAuth title="Brand Overview">
      <BrandOverviewLayout />
    </Layout>
  );
};

export default BrandOverview;
