import React, { useState, useReducer, useEffect } from "react";
import Link from "next/link";
import AuthHeader from "../components/AuthHeader";
import { signin, authenticate } from "../services/auth";
import { useUserContext } from "../contexts/userContext";
import { useRouter } from 'next/router'

const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN_REQUEST":
      return { ...state, loading: true };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: '',
        signedInUser: action.payload,
        showForm: false,
      };
    case "SIGNIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function signup() {

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isInvalid = false;

  const handleSignin = async (e) => {
    e.preventDefault();
    dispatch({ type: "SIGNIN_REQUEST" });

    const formData = { email, password };
    const data = await signin(formData)

    if (!data.success) {
      dispatch({ type: "SIGNIN_FAIL", payload: data.message });
    }
    authenticate(data, () => {
      dispatch({ type: "SIGNIN_SUCCESS", payload: data.user });
      })

  };

  useEffect(() => {
    console.log(user);
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
        <form onSubmit={handleSignin}>
          <h3 className="text-2xl font-bold mb-4 tracking-wider">Sign In.</h3>
          <div className="pb-4">
            <label className="block text-base text-gray-600 font-bold md:pb-1">
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
            <div className="flex justify-between items-end md:pb-1">
              <label className="block text-base text-gray-600 font-bold">
                Password
              </label>
              <Link href="/forgot-password">
                <a className="text-indigo-500 active:text-indigo-400 hover:text-indigo-600 text-sm">
                  Forgot Password
                </a>
              </Link>
            </div>
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
              className={`bg-secondary-red2 bg-opacity-80 text-gray-50 active:bg-pink-400 hover:bg-pink-600 text-base font-bold px-6 py-3 w-full rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ${
                isInvalid && "cursor-not-allowed opacity-50"
              }`}
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-gray-800 text-sm text-center py-6">
          Not a member?
          <Link href="/signup">
            <a className="pl-1 text-indigo-500 active:text-indigo-400 hover:text-indigo-600 font-bold">
              Sign up now
            </a>
          </Link>
        </p>
      </div>
    </>
  );
}
