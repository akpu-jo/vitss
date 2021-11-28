import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useUserContext } from "../../contexts/userContext";

export default function index() {
  const { user } = useUserContext();

  const router = useRouter();

  useEffect(() => {
    router.replace(`/admin/${encodeURIComponent(user.username)}`);
  }, []);

  return <></>;
}
