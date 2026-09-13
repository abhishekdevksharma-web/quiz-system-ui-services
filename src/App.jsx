import { Routes, Route } from "react-router-dom";

import Admin from "./pages/Admin";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import AdminHome from "./components/adminComp/Dashbord_Route";
import QuestionBuilder from "./QuizBuilder/QuizBuilder";
import AdminQuizes from "./components/adminComp/AdminHistory_Route";
import QuizLinkRoute from "./studentComp/QuizLinkRoute";

import CreatorProtectedRoute from "./services/CreatorProtectedRoute";
import StudnetProtectedRoute from "./services/StudnetProtectedRoute";
import Studenthome from "./pages/Stundenthome";
import StartQuizRoute from "./studentComp/Ques-Components/StartQuizRoute";
import QuestionSection from "./studentComp/Ques-Components/QuestionSection";
import NotFound from "./pages/NotFound";
import StudentQuizHistory from "./studentComp/quizHistory/StudentQuizHistoryRoute";
import StudentLayout from "./studentComp/StudentLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/student/:quizId" element={<QuizLinkRoute />} />
      <Route path="/student/start-quiz/:quizId" element={<StartQuizRoute />}>
        <Route index element={<QuestionSection />} />
      </Route>

      <Route element={<StudnetProtectedRoute />}>
        <Route element={<StudentLayout />}>
          <Route path="/student" element={<Studenthome />} />
          <Route path="/student/quizzes" element={<StudentQuizHistory />} />
        </Route>
      </Route>

      <Route path="/" element={<Admin />}>
        <Route element={<CreatorProtectedRoute />}>
          <Route index element={<AdminHome />} />
          <Route path="quizes" element={<AdminQuizes />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
      <Route element={<CreatorProtectedRoute />}>
        <Route path="/create-question" element={<QuestionBuilder />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
