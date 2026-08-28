import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import StudentState from "./context/studentContext/studentState.jsx";
import AdminState from "./context/adminContext/adminState.jsx";
import QuizHistoryState from "./context/quizHistoryContext/quizHistoryState.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminState>
      <QuizHistoryState>
        <StudentState>
          <App />
        </StudentState>
      </QuizHistoryState>
    </AdminState>
  </BrowserRouter>,
);
