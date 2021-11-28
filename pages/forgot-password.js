import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../firebase";
import { DOMAIN } from "../config";
import Header from "../components/Header";
import { NavOptions } from "../components/header/NavOptions";
import { Context } from "../contexts/AppContext";
import { useRouter } from "next/router";


function ForgotPassword() {
  const { state: {user} } = useContext(Context);

  const router = useRouter();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const isInvalid = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: `${DOMAIN}/login`,
      handleCodeInApp: true,
    };
    const auth = getAuth(app);
    sendPasswordResetEmail(auth, email, config)
      .then(() => {
        setEmail("");
        setSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        setSuccess(true);
        setLoading(false);
        setError(error.message);
      });
  };

  
  useEffect(() => {
    if(user){
      return router.push('/');
    }
  }, [user])

  return (
    <>
      <Header>
        <NavOptions dec="text-gray-500 hover:text-gray-600 text-base font-semibold tracking-wider">
          <Link href="/signin">
            <a>Sign In</a>
          </Link>
        </NavOptions>
        <NavOptions>
          <button className="bg-transparent text-gray-500 border-2 border-purple-200 hover:bg-purple-50 text-lg font-bold tracking-widest px-4 py-2 rounded-lg hover:shadow focus:outline-none">
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </button>
        </NavOptions>
      </Header>{" "}
      <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-10/12 sm:w-3/5 md:w-1/3">
        <h3 className="text-2xl font-bold mb-4 tracking-wide">
          {" "}
          Forgot your password?
        </h3>

        <p className="text-gray-500 font-semibold pb-10">
          Enter your registered email below to receive password reset
          instruction
        </p>
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
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

          {error && (
            <div className="text-white px-6  border-0 rounded relative mb-4 bg-red-400">
              <span className="inline-block align-middle mr-8">
                <p>
                  <small>{error}</small>
                </p>
              </span>
            </div>
          )}

          <div className=" pt-3">
            <button
              disabled={isInvalid}
              className={` bg-secondary-red2 bg-opacity-80 text-gray-50 active:bg-pink-400 hover:bg-pink-600 text-base font-bold px-6 py-3 w-full rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ${
                isInvalid && "cursor-not-allowed opacity-50"
              }`}
              type="submit"
            >
              {loading ? "Processing..." : "Send Email"}
            </button>
          </div>
        </form>
        <p className="text-gray-800 text-sm text-center py-6">
          Remember password?
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

export default ForgotPassword;
