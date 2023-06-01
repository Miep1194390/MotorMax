import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useSelector } from 'react-redux';
import App from "./App.jsx";
import Hoewerkthet from "./components/Hoewerkthet.jsx";
import Login from "./components/Login.jsx";
import Admin from "./components/Admin.jsx";
import Feed from "./components/Feed.jsx";
import Settings from "./components/Settings.jsx";

const Root = () => {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/hoewerkthet" element={<Hoewerkthet />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
