import React, { useContext, useEffect } from "react";
import { Context } from "../contexts/AppContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";
import { axiosPrivate } from "../services/axios";
import { setCookie, destroyCookie } from "nookies";

const FirebaseAuthState = ({ children }) => {
  const { dispatch } = useContext(Context);

  const authState = () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, async (user) => {

      if (user) {
        const { token } = await user.getIdTokenResult();
        destroyCookie(null, 'token')
        setCookie(null, 'token', token, {})
        axiosPrivate
          .post("/users/auth")
          .then((res) => {
            dispatch({
              type: "LOGIN",
              payload: res.data.user,
            });
          })
          .catch((err) => {
            console.log(err);
          });


      } else {
        // User is signed out
        destroyCookie(null, 'token')
        setCookie(null, 'token', '', {})
        dispatch({
          type: "LOGOUT",
        });
      }
    });
  };

  useEffect(() => {
    authState();
  }, []);

  return <div>{children}</div>;
};

export default FirebaseAuthState;
