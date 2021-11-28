import React from "react";
import WritePost from "../../components/crud/post";
import { parseCookies } from "nookies";
import axios from "axios";
import { API } from "../../config";



function Write() {
  return (
      <WritePost />
  );
}

export async function getServerSideProps(context) {
  try {
    const cookies = parseCookies(context);
    const { data } = await axios.get(`${API}/users/admin`, {
      headers: {
        token: cookies.token,
      },
    });
    console.log(data)
    if (!data.admin) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

     return { props: {} };

  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "../signin",
      },
      props: {},
    };
  }
}

export default Write;
