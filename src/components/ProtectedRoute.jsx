import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, requiredRole }) => {
  const user = localStorage.getItem('user');
  let userRole = null;

  if (user) {
    try {
      const userData = JSON.parse(user);
      userRole = userData.role;
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to home if user doesn't have the required role
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute; 