import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Pass redirect state so the login page knows the user was redirected from a protected route
    return <Navigate to="/login" state={{ fromProtected: true }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
