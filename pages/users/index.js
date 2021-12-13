import React from "react";
import Layout from "@/components/Layout";
import UserManagementLayout from "@/containers/UserManagement/UserManagementLayout";

const UserManagement = () => {
  return (
    <Layout title="User Management" navbar={false}>
      <UserManagementLayout />
    </Layout>
  );
};

export default UserManagement;
