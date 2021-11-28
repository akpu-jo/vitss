import { getAuth } from "@firebase/auth";
import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import next from "next";
import { API } from "../config";
import app from "../firebase";
import { axiosPrivate } from "./axios";

export const signup = (user) => {
  return fetch(`${API}/users/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = async (user) => {
  try {
    const res = await fetch(`${API}/users/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`${API}/users/signout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("Signout success");
    })
    .catch((err) => console.log(err));
};

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 30,
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 30,
    });
  }
};

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = (key) => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const isAdmin = () => {
  axiosPrivate
    .post("/users/auth")
    .then((res) => {
      const { user } = res.data;
      if (user.role === "admin"){
        console.log(user);
        return user
      } else {
        console.log(user);
        return false
      }
    })
    .catch((err) => {
      console.log(err);
      return false
    });
};
