import fetch from "isomorphic-fetch";
import { stringify } from "postcss";
import queryString from 'query-string'
import { API } from "../config";

export const createPost = (post, token) => {
  return fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listPostsAndTags = async (page) => {
  const data = {
    page,
  };
  try {
    const res = await fetch(
      page
        ? `${API}/posts/posts-tags-categories?page=${page}`
        : `${API}/posts/posts-tags-categories`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(res);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (slug, token) => {
  return fetch(`${API}/posts/${slug}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllPosts = (limit, skip) => {
  return fetch(`${API}/posts?limit=${limit}&skip=${skip}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getRecentPosts = async () => {
  try {
    const res = await fetch(`${API}/posts/recent`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export const getFeaturedPosts = async () =>{
  try {
    const res = await fetch(`${API}/posts/featured`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
export const getRelatedPosts = async (post) => {
  console.log(post)
  try {
    const res = await fetch(`${API}/posts/related`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const listSearch = (params) => {

  let query = queryString.stringify(params)

  return fetch(`${API}/posts/search?${query}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};