import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import AuthenticatedHome from './pages/AuthenticatedHome.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RestaurantDashboard from './pages/RestaurantDashboard.jsx';
import NGODashboard from './pages/NGODashboard.jsx';
import ListDonation from './pages/ListDonation.jsx';
import ViewDonations from './pages/ViewDonations.jsx';
import DonationDetail from './pages/DonationDetail.jsx';
import Profile from './pages/Profile.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setIsAuthenticated(true);
        setUserRole(userData.role);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

  useEffect(() => {
    checkAuth();

    // Handle login event
    const handleLogin = () => {
      checkAuth();
    };

    // Handle logout event
    const handleLogout = () => {
      setIsAuthenticated(false);
      setUserRole(null);
      navigate('/', { replace: true });
    };

    // Handle storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('userLogin', handleLogin);
    window.addEventListener('userLogout', handleLogout);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('userLogin', handleLogin);
      window.removeEventListener('userLogout', handleLogout);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Home route with conditional rendering */}
          <Route path="/" element={isAuthenticated ? <AuthenticatedHome /> : <Home />} />

          {/* Protected routes */}
          <Route path="/restaurant/dashboard" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="restaurant" userRole={userRole}>
              <RestaurantDashboard />
            </ProtectedRoute>
          } />
          <Route path="/ngo/dashboard" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="ngo" userRole={userRole}>
              <NGODashboard />
            </ProtectedRoute>
          } />
          <Route path="/donation/new" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="restaurant" userRole={userRole}>
              <ListDonation />
            </ProtectedRoute>
          } />
          <Route path="/donations" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="ngo" userRole={userRole}>
              <ViewDonations />
            </ProtectedRoute>
          } />
          <Route path="/donation/:id" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
              <DonationDetail />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
              <Profile />
            </ProtectedRoute>
          } />

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;