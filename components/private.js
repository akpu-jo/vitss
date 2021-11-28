import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { isAuth } from "../services/auth";

function Private({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth()) {
      router.push("/signin");
    }
  }, [isAuth()]);

  return <>{children}</>;
}

export default Private;
