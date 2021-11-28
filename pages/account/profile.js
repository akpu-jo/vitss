import React from "react";
import { Layout } from "../../components/Layout";
import Private from "../../components/private";

function Profile() {
  return (
    <Layout>
      <Private>Profile Settings</Private>
    </Layout>
  );
}

export default Profile;