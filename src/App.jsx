import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Admin from "./pages/Admin";
import Student from "./pages/Student";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import AdminHome from "./components/adminComp/Dashbord_Route";

import QuestionBuilder from "./QuizBuilder/QuizBuilder";
import AdminQuizes from "./components/adminComp/AdminHistory_Route";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/:id" element={<Student />} /> 
        <Route path="/admin/*" element={<Admin />}>
          <Route index element={<AdminHome />} />
          <Route path="quizes" element={<AdminQuizes />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="questionbilder" element={<QuestionBuilder />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
