import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Pass target location along with redirect state so the login page can redirect back
    return (
      <Navigate
        to="/login"
        state={{ fromProtected: true, from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
