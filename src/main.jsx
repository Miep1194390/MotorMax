import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Hoewerkthet from "./components/Hoewerkthet.jsx";
import Login from "./components/Login.jsx";
import Admin from "./components/Admin.jsx";
import Feed from "./components/Feed.jsx";
import Settings from "./components/Settings.jsx";
import { auth } from "./firebase.js";

const Root = () => {
  const isAuthenticated = false;

  // Check if the user is logged in
  const user = auth.currentUser;
  const allowAccess = user !== null;

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/hoewerkthet" element={<Hoewerkthet />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/settings"
            element={
              allowAccess ? (
                <Settings />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/feed"
            element={
              allowAccess ? (
                <Settings />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
