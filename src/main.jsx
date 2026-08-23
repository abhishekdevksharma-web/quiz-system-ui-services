import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import StudentState from "./context/studentContext/studentState.jsx";
import AdminState from "./context/adminContext/adminState.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminState>
      <StudentState>
        <App />
      </StudentState>
    </AdminState>
  </BrowserRouter>
);
