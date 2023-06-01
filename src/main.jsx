import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import App from "./App.jsx";
import Hoewerkthet from "./components/Hoewerkthet.jsx";
import Login from "./components/Login.jsx";
import Admin from "./components/Admin.jsx";
import Feed from "./components/Feed.jsx";
import Settings from "./components/Settings.jsx";
import PrivateRoute from "../src/components/PrivateRoute.jsx";

const Root = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/hoewerkthet" element={<Hoewerkthet />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <PrivateRoute
            path="/settings"
            element={<Settings />}
            isAuthenticated={isAuthenticated}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
