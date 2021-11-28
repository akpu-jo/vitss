import React from "react";
import { Layout } from "../../components/Layout";
import Private from "../../components/private";

function Account() {
  return (
    <Layout>
      <Private>Account Settings</Private>
    </Layout>
  );
}

export default Account;
