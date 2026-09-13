import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { handVerifyTokenApi } from "./auth.service";
import StudentContext from "../context/studentContext/studentContext";

function CreatorProtectedRoute() {
  const { studentIsAuth, setStudentIsAuth, userMeta, setUserMeta } =
    useContext(StudentContext);

  useEffect(() => {
    async function verifyToken() {
      try {
        const auth = await handVerifyTokenApi();

        setStudentIsAuth(auth.success);

        if (auth.success) {
          setUserMeta((prev) => ({
            ...prev,
            student: {
              ...prev.student,
              name: auth.user.name,
              email: auth.user.email,
            },
          }));
        }
      } catch (error) {
        // setIsAuthenticate(false);
      }
    }

    verifyToken();
  }, []);

  //   if (!isAuthenticate) {
  //     return <Navigate to="/login" replace />;
  //   }

  return <Outlet />;
}

export default CreatorProtectedRoute;
