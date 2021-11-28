import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useRouter } from "next/router";
import app from "../firebase";
import Header from "../components/Header";
import { NavOptions } from "../components/header/NavOptions";
import { Context } from "../contexts/AppContext";

const Register = () => {
  const { state: {user} } = useContext(Context);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const isInvalid = false;

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const newUser = userCredential.user;
        updateProfile(newUser, {
          displayName: fullname
        });

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
      </Header>
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
              {loading? 'Processing...' : 'Sign Up'}
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
};

export default Register;
