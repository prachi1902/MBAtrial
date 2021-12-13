import React from "react";
import Layout from "@/components/Layout";
import EditUser from "@/containers/UserManagement/EditUser/EditUserLayout";

const EditUserLayout = ({ user_id }) => {
  return (
    <Layout title="Edit User" navbar={false}>
      <EditUser id={user_id} />
    </Layout>
  );
};

export default EditUserLayout;

export const getServerSideProps = async (ctx) => {
  const user_id = ctx.params.user_id;
  return {
    props: {
      user_id,
    },
  };
};
