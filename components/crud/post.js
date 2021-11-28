import React, { useState, useReducer, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie } from "../../services/auth";
import { createPost } from "../../services/post";
import { PhotographIcon } from "@heroicons/react/solid";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.bubble.css";
import { QuillFormats, QuillModules } from "../../utils/quill";
import Header from "../Header";
import { NavOptions } from "../header/NavOptions";
import CreateTags from "./CreateTags";

const WritePost = ({ router }) => {
  const postFromLS = (body) => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem(body)) {
      return JSON.parse(localStorage.getItem(body));
    } else {
      return false;
    }
  };

  const titleFromLS = (name) => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    } else {
      return null;
    }
  };

  //Tags
  const [postTags, setPostTags] = useState([])

  const [picture, setPicture] = useState(null);

  const [body, setBody] = useState(postFromLS("body"));
  const [title, setTitle] = useState(titleFromLS("title"));

  const [values, setValues] = useState({
    // title: titleFromLS("title"),
    error: "",
    sizeError: false,
    success: false,
    FormData: "",
    hidePublishButton: false,
  });

  const { error, sizeError, success, formData, hidePublishButton } = values;
  const token = getCookie("token");
  const isInvalid = false;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, [router]);


  const publish = (e) => {
    e.preventDefault();
    // console.log("ready to publish");
    formData.set("tags", postTags);
    createPost(formData, token).then((data) => {
      console.log(data);

      if (data.errors || data.error) {
        setValues({ ...values, error: data.message });
      } else {
        setValues({
          ...values,
          error: "",
          success: `A new post titled "${data.result.title}" is created`,
        });
        setTitle("");
        localStorage.removeItem("title");
        setBody("");
        setPicture(null);
      }
    });
  };

  const handleTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
    formData.set("title", value);
    if (typeof window !== "undefined") {
      localStorage.setItem("title", value);
    }
  };
  const handleChange = (tname) => (e) => {
    tname === "photo" && setPicture(URL.createObjectURL(e.target.files[0]));
    const value = tname === "photo" ? e.target.files[0] : e.target.value;
    formData.set(tname, value);
    setValues({ ...values, [tname]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("body", JSON.stringify(e));
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const newPostForm = () => {
    return (
      <form onSubmit={publish}>
        <div className="pt-1">
          {showError()}
          {showSuccess()}
        </div>
        <div className="flex items-center justify-start">
          <label className="flex items-center justify-center">
            <input
              className="h-0 w-0 opacity-0"
              type="file"
              onChange={handleChange("photo")}
              accept="image/*"
            />
            <span
              title="Upload featured Image"
              className="text-xl font-bold cursor-pointer"
            >
              <PhotographIcon className=" w-8 h-8 text-gray-500" />
            </span>
          </label>
          <input
            type="text"
            required
            className=" w-10/12 font-bold text-2xl text-gray-500 text-left tracking-wide py-3 px-2 focus:outline-none"
            placeholder="Title"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className=" my-5">
          <ReactQuill
            className=" placeholder-red-900"
            theme="bubble"
            required
            modules={QuillModules}
            formats={QuillFormats}
            onChange={handleBody}
            value={body}
            placeholder="Tell your story..."
          />
        </div>
      </form>
    );
  };


  return (
    <div className=" max-w-7xl mx-auto">
      <Header>
        <CreateTags postTags={postTags} setPostTags={setPostTags} />
        <NavOptions>
          <button
            disabled={isInvalid}
            className={`bg-secondary-red2 bg-opacity-80 text-gray-50 active:bg-pink-400 hover:bg-pink-600 text-base font-bold px-4 py-2 ml-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ${
              isInvalid && "cursor-not-allowed opacity-50"
            }`}
            type="submit"
            onClick={publish}
          >
            Publish
          </button>
        </NavOptions>
      </Header>
      <figure className="block py-4">
        {picture && (
          <Image
            className=" object-cover "
            src={picture}
            alt=""
            layout="responsive"
            width={500}
            height={250}
          />
        )}
      </figure>
      {newPostForm()}
    </div>
  );
};

export default withRouter(WritePost);
