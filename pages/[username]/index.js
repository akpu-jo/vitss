import React from "react";
import { useRouter } from "next/router";

function Username() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <div>Your public page: {username}</div>
    </>
  );
}

export default Username;
