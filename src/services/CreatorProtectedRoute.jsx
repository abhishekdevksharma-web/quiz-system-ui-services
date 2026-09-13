import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AdminContext from "../context/adminContext/adminContext";
import { handVerifyTokenApi } from "./auth.service";

function CreatorProtectedRoute() {
  const {
    isAuthenticate,
    setIsAuthenticate,
    setuserDetails,
    setIsCheckingToken,
  } = useContext(AdminContext);

  useEffect(() => {
    async function verifyToken() {
      try {
        const auth = await handVerifyTokenApi();

        setIsAuthenticate(auth.success);

        if (auth.success) {
          setuserDetails({
            name: auth.user.name,
            email: auth.user.email,
          });
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
