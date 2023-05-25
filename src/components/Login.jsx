import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import Header from "./Header";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Login = () => {
  const [username, setUsername] = useState("");

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Gebruikersinformatie:", user);
        setUsername(user.displayName);
        localStorage.setItem("email", user.email);
      })
      .catch((error) => {
        console.error("Fout bij aanmelden:", error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUsername("");
        localStorage.removeItem("email");
      })
      .catch((error) => {
        console.error("Fout bij uitloggen:", error);
      });
  };

  useEffect(() => {
    setUsername(localStorage.getItem("email"));
  }, []);

  return (
    <div>
      <Header />
      <div className="login-outercontainer">
        <div className="login-innercontainer">
          <h1 className="login-h1">{username}</h1>
          <div className="login-container">
            <div className="login-container_item">
              <a href="#">
                <button className="buttonnostyle" onClick={handleClick}>
                  Doorgaan met Google
                </button>
              </a>
              <a href="">
              <button className="buttonnostyle" onClick={handleLogout}>
                Uitloggen
              </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
