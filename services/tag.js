import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import next from "next";
import { API } from "../config";

export const createTag = (tag, token) => {
  console.log(tag)
    return fetch(`${API}/tags`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(tag),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const getTags = ( token) => {
    return fetch(`${API}/tags`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const getTag = (slug, token) => {
    return fetch(`${API}/tags/${slug}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const removeTag = (slug, token) => {
    return fetch(`${API}/tags/${slug}`, {
        method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };