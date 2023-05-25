import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigateTo = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Gebruikersinformatie:", user);
        localStorage.setItem("username", user.displayName);
        localStorage.setItem("email", user.email);
        navigateTo("/feed");
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
      <div className="login-outercontainer">
        <div className="login-innercontainer">
          <h1 className="login-h1">{username}</h1>
          <div className="login-container">
            <div className="login-container_item">
              <div>
                <button className="buttonnostyle" onClick={handleClick}>
                  Doorgaan met Google
                </button>
              </div>
              <div>
              <button className="buttonnostyle" onClick={handleLogout}>
                Uitloggen
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
