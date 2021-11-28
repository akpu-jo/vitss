import React, { useState, useReducer, useEffect } from "react";
import Link from "next/link";
import AuthHeader from "../components/AuthHeader";
import { signup, authenticate } from "../services/auth";
import { useRouter } from 'next/router'
import { useUserContext } from "../contexts/userContext";


const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_REQUEST":
      return { ...state, loading: true };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        loading: false,
        error: '',
        signedInUser: action.payload,
        showForm: false,
      };
    case "SIGNUP_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Signup() {
  const {user, setUser} = useUserContext()

  const router = useRouter()

  if (user) {
    router.push('/')
  }

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    signedInUser: null,
    showForm: true,
  });
  const { loading, error, signedInUser, showForm } = state;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isInvalid = false;

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch({ type: "SIGNUP_REQUEST" });

    const formData = { fullname, email, password };

    signup(formData)
    .then((data) => {
      console.log(data);
      if (!data.success) {
        dispatch({ type: "SIGNUP_FAIL", payload: data.message });
      } else {
        authenticate(data, () => {
          dispatch({ type: "SIGNUP_SUCCESS", payload: data.user });
        })
      }
    });
  };

  useEffect(() => {
    if (signedInUser) {
      setUser(signedInUser)
      console.log('user', signedInUser);
      return router.push('/');
    }
  }, [signedInUser]);

  return (
    <>
      <AuthHeader />
      <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-10/12 sm:w-3/5 md:w-1/3">
        <form onSubmit={handleSignup}>
          <h3 className="text-2xl font-bold mb-4 tracking-wider">Sign Up.</h3>
          <div className="pb-2">
            <label className="block text-base text-gray-600 font-bold">
              Name
            </label>
            <input
              aria-label="Enter your full name"
              type="name"
              className="px-3 py-3 w-full rounded-lg text-base bg-gray-100 focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-pink-100"
              value={fullname}
              onChange={({ target }) => setFullname(target.value)}
            />
          </div>
          <div className="pb-2">
            <label className="block text-base text-gray-600 font-bold">
              Email
            </label>
            <input
              aria-label="Enter your full name"
              type="email"
              className="px-3 py-3 w-full rounded-lg text-base bg-gray-100 focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-pink-100"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="pb-2">
            <label className="block text-base text-gray-600 font-bold">
              Password
            </label>
            <input
              aria-label="Enter your full name"
              type="password"
              className="px-3 py-3 w-full rounded-lg text-base bg-gray-100 focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-pink-100"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          {error && (
            <p className=" text-center text-sm text-red-400">
              <small>{error}</small>
            </p>
          )}
          <div className=" pt-3">
            <button
              disabled={isInvalid}
              className={` bg-secondary-red2 bg-opacity-80 text-gray-50 active:bg-pink-400 hover:bg-pink-600 text-base font-bold px-6 py-3 w-full rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ${
                isInvalid && "cursor-not-allowed opacity-50"
              }`}
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-gray-800 text-sm text-center py-6">
          Already have an account?
          <Link href="/signin">
            <a className="pl-1 text-indigo-500 active:text-indigo-400 hover:text-indigo-600 font-bold">
              Sign In
            </a>
          </Link>
        </p>
      </div>
    </>
  );
}
