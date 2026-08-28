import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AdminContext from "../../../context/adminContext/adminContext";

function ProtectedRoute() {
  const { isAuthenticate } = useContext(AdminContext);

  if (!isAuthenticate) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
