import React, { useContext } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { API } from "../config";
import { Context } from "../contexts/AppContext";

const PrivateTest = ({ children }) => {
  const { state } = useContext(Context);

  return <div>{children}</div>;
};

export async function getServerSideProps(context) {
  try {
    const cookies = parseCookies(context);
    const { data } = await axios.get(`${API}/users/private`, {
      headers: {
        token: cookies.token,
      },
    });
    if (data.ok) return { props: {} };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "./signin",
      },
      props: {},
    };
  }
}
export default PrivateTest;
