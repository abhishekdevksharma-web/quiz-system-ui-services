import React, { useEffect, useState } from "react";
import AdminContext from "./adminContext";

function AdminState(props) {
  const [adminAllQuizFetched, setAdminAllQuizFetched] = useState(false);
  const [userDetails, setuserDetails] = useState({
    name: "user",
    email: "user@mail.com",
    totalQuizes: 0,
    currentActiveQuiz: 0,
    activeQuizList: [],
  });

  const [question, setQuestion] = useState({ questions: [] });

  //quiz history storing state
  const [adminQuizHistory, setadminQuizHistory] = useState([]);
  const [adminRecentQuizHistory, setadminRecentQuizHistory] = useState([]);

  const [quizMeta, setQuizMeta] = useState({
    title: "",
    subject: "",
    difficulty: "Medium",

    timing: {
      type: "Duration",
      durationMinutes: 30,
      startTime: "",
      endTime: "",
    },

    totalQuestions: 0,
    status: "Closed",
    attempts: 0,
  });

  // Admin State for Mode OF color
  const [colorMode, setcolorMode] = useState(true);

  //admin auth
  const [adminAuthenticate, setadminAuthenticate] = useState(false);

  async function fetchUserAllQuizes() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/fetchallquiz`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();

      setadminQuizHistory(data);
      setAdminAllQuizFetched(true);

      return data;
    } catch (error) {
      console.log(error);
    }
    return adminQuizHistory;
  }

  async function fetchRecentQuizes(IsUserAuthenticate) {
    if (!IsUserAuthenticate) {
      return;
    } else {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/dashbord`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        setadminRecentQuizHistory(data);
      } catch (error) {
        console.log(error);
      }

      // setadminQuizHistory(temp);
      // setAdminAllQuizFetched(true);
      // return adminQuizHistory;
    }
  }

  async function Dashboard() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/dashbord`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function createQuestion(Question, UserQuizMeta) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/createquiz`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...UserQuizMeta,
          questions: Question,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function createUser(UserData) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/createuser`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserData),
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogin(data) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateStatus(query) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/updatequizstatus`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query),
        },
      );
      const parseRes = await response.json();

      return parseRes;
    } catch (error) {
      console.log(error);
    }
  } 

  async function FetchQuizStudentResults(data) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/quiz-responce-results`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const parseRes = await res.json();
      return parseRes;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AdminContext.Provider
      value={{
        question,
        setQuestion,
        fetchRecentQuizes,
        adminQuizHistory,
        setadminQuizHistory,
        colorMode,
        setcolorMode,
        createQuestion,
        createUser,
        adminAuthenticate,
        setadminAuthenticate,
        handleLogin,
        userDetails,
        setuserDetails,
        fetchUserAllQuizes,
        quizMeta,
        setQuizMeta, 
        adminRecentQuizHistory,
        setadminRecentQuizHistory,
        Dashboard,
        handleUpdateStatus,
        FetchQuizStudentResults,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}

export default AdminState;
