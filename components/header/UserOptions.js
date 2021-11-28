import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Context } from "../../contexts/AppContext";
import { getAuth, signOut } from "@firebase/auth";
import app from "../../firebase";
import { destroyCookie, setCookie } from "nookies";
import { axiosPrivate } from "../../services/axios";

export default function UserOptions() {
  const { state } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  const [role, setRole] = useState("user");

  const isAdmin = () => {
    axiosPrivate
      .post("/users/auth")
      .then((res) => {
        const { user } = res.data;
        console.log(user);
        setRole(user.role);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        destroyCookie(null, "token");
        setCookie(null, "token", "", {});
        dispatch({
          type: "LOGOUT",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    isAdmin();
  }, [user]);

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-10 h-10 text-center items-center text-xl capitalize font-medium text-white bg-black rounded-full bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {user ? user.payload.username.charAt(0) : ""}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 px-4 py-2 w-64 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {role !== "user" && (
              <div className="px-1 py-1 ">
                <Link href="/p/write">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "text-gray-900 font-semibold"
                            : "text-gray-600"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <EditActiveIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <EditInactiveIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        <a>Write</a>
                      </button>
                    )}
                  </Menu.Item>
                </Link>
              </div>
            )}
            <div className="px-1 py-1">
              <Menu.Item>
                <Link href="/signin">
                  <a
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900 hover:font-semibold  flex rounded-md items-center w-full px-2 py-2 text-sm"
                  >
                    Sign Out
                  </a>
                </Link>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}
