import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, requiredRole, userRole }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // If a specific role is required but user doesn't have it,
    // redirect to their appropriate dashboard
    if (userRole === 'restaurant') {
      return <Navigate to="/restaurant/dashboard" replace />;
    } else if (userRole === 'ngo') {
      return <Navigate to="/ngo/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 