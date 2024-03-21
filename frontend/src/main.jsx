import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

import "./index.css";

// Set some default axios properties
axios.defaults.baseURL = "http://localhost:3000";

// Extra react imports
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { LoginContext } from "./App.jsx";

// Imports for context and protected routes
import { LoginProvider } from "./components/context/LoginContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <Routes>
          {/* * is a catch all */}
          <Route path="/*" element={<App />} />
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);
