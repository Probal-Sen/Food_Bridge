import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
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
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
          <Route path="/ngo/dashboard" element={<NGODashboard />} />
          <Route path="/donation/new" element={<ListDonation />} />
          <Route path="/donations" element={<ViewDonations />} />
          <Route path="/donation/:id" element={<DonationDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 