import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import Header from "./Header";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";



const Login = () => {
  const [value, setValue] = useState("");

  const handleClick = async () => {
    await signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };


  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  return (
    <div>
      <Header />
      <div className="login-outercontainer">
        <div className="login-innercontainer">
          <h1 className="login-h1">{value}</h1>
          <div className="login-container">
            <div className="login-container_item">
              <a href="#">
                <button className="buttonnostyle" onClick={handleClick}>
                  Doorgaan met Google
                </button>
              </a>
              <a href="#">
                <button className="buttonnostyle" onClick={handleClick}>
                  Doorgaan met Microsoft
                </button>
              </a>
              <a href="#">
                <button className="buttonnostyle" onClick={handleClick}>
                  Doorgaan met Microsoft
                </button>
              </a>
              <a href="#">
                <button className="buttonnostyle" onClick={handleClick}>
                    Doorgaan met Microsoft
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
