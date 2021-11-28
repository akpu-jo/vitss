import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NProgress from "nprogress";
import ".././node_modules/nprogress/nprogress.css";
import { useRouter } from "next/router";
import UserOptions from "./header/UserOptions";
import { Context } from "../contexts/AppContext";

export default function Header({children}) {
  const { state } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <div className="flex justify-between items-center max-w-7xl mx-auto py-4">
      <ul className="flex space-x-6 items-center">
        <Link href="/">
          <a className="w-44 col-span-2 ">
            <Image
              src="/logo.svg"
              alt="Picture of the author"
              width={500}
              height={100}
            />
          </a>
        </Link>
        <li className="text-gray-500 hover:text-gray-600 text-base font-semibold tracking-wider">
          <Link href="/posts">
            <a>All Episodes</a>
          </Link>
        </li>
        <li className="text-gray-500 hover:text-gray-600 text-base font-semibold tracking-wider">
          <Link href="#">
            <a>About</a>
          </Link>
        </li>
      </ul>
      <ul className="flex items-center space-x-6">


        {children}

        {user && <li className="z-30 text-gray-500 hover:text-gray-600 text-base font-semibold tracking-wider">
          <UserOptions />
        </li>}

      </ul>
    </div>
  );
}
