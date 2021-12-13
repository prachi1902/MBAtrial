import React from "react";
import Layout from "@/components/Layout";
import InviteLayout from "@/containers/UserManagement/InviteUser/InviteUserLayout";

const InviteUserLayout = () => {
  return (
    <Layout title="User Management" navbar={false}>
      <InviteLayout />
    </Layout>
  );
};

export default InviteUserLayout;
