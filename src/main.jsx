import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Hoewerkthet from "./components/Hoewerkthet.jsx";
import Login from "./components/Login.jsx";
import Admin from "./components/Admin.jsx";
import Feed from "./components/Feed.jsx";
import Settings from "./components/Settings.jsx";
import Maak from "./components/Maken.jsx";
import { auth } from "./firebase.js";
import Berichten from "./components/Berichten.jsx";

const Root = () => {

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
          <Route path="/feed" element={<Feed />} /> 
          <Route path="/settings" element={<Settings />} />
          <Route path="/Maak" element={<Maak />} />
          <Route path="*" element={<h1>Deze pagina bestaat niet man pa</h1>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
