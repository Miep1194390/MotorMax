import React, { useState } from "react";
import firebase from "../firebase";
import Header from "./Header.jsx";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Logged in successfully
      })
      .catch((error) => {
        // Error occurred
      });
  }

  return (
    <div>
      <Header></Header>
    <form onSubmit={handleLogin}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Log in</button>
      </form>
      </div>
  );
}

export default Login;
