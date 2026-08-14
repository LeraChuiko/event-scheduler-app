import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // TODO (Anton): Replace with real token validation from localStorage
  const isAuthenticated = true;
  // Extract authentication status from AuthContext
  //const { isAuthenticated } = useAuth();

  // If user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child route component (e.g., CreateEventPage)
  return <Outlet />;
};

export default ProtectedRoute;
