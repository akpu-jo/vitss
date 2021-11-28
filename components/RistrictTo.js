import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { isAuth } from "../services/auth";

function RistrictTo({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth()) {
      router.push("/signin");
    } else if (isAuth().role === "user") {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
}

export default RistrictTo;
