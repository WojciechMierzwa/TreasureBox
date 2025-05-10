import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ allowedRoles, children }) {
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!role) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/Dashboard" replace />;
  }

  return children;
}
