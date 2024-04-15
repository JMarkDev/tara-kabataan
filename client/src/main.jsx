import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "./hooks/useToast.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Router>
);
