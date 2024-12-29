import React from 'react'; // Make sure React is imported
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = false; // Replace with actual authentication check logic

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children; // Render children (e.g., Dashboard) if authenticated
};

export default ProtectedRoute;
