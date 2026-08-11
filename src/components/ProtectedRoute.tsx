import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // TODO (Anton): Replace with real token validation from localStorage
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
