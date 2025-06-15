import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        try {
          const parsedUser = JSON.parse(user);
          setIsLoggedIn(true);
          setUserType(parsedUser.role);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsLoggedIn(false);
          setUserType('');
        }
      } else {
        setIsLoggedIn(false);
        setUserType('');
      }
    };

    checkAuth();
    window.addEventListener('storage', (e) => {
      if (e.key === 'user') {
        checkAuth();
      }
    });

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  if (isLoggedIn) {
    const dashboardPath = userType === 'restaurant' ? '/restaurant/dashboard' : '/ngo/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default ProtectedRoute; 