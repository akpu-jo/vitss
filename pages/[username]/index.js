import React from "react";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import Private from "../../components/private";

function Username() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Layout>
      <Private>Your public page: {username}</Private>
    </Layout>
  );
}

export default Username;
