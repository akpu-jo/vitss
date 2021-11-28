import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import app from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Header from "../components/Header";
import { NavOptions } from "../components/header/NavOptions";
import { Context } from "../contexts/AppContext";

const login = () => {
  const { state: {user} } = useContext(Context);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isInvalid = false;

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const newUser = userCredential.user;
        setLoading(false);
        return router.push('/');
      })
      .catch((error) => {
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
        <form onSubmit={handleSignin}>
          <h3 className="text-2xl font-bold mb-4 tracking-wider">Sign In.</h3>
          <div className="pb-4">
            <label className="block text-base text-gray-600 font-bold md:pb-1">
              Email
            </label>
            <input
              aria-label="Enter your email address"
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
              aria-label="Enter your password"
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
              {loading ? "Processing..." : "Sign In"}{" "}
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
};

export default login;
