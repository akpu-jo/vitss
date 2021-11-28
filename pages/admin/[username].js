import React from "react";
import RistrictTo from "../../components/RistrictTo";
import { Layout } from "../../components/Layout";
import Tag from "../../components/crud/tag";

function Admin() {
  return (
    <Layout>
      <RistrictTo>
        Admin Dasboard
        <Tag />
      </RistrictTo>
    </Layout>
  );
}

export default Admin;
