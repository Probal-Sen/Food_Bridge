import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DefaultProfilePic from './DefaultProfilePic';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userData, setUserData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const checkUserData = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
        setUserData(parsedUser);
        setUserType(parsedUser.role);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsLoggedIn(false);
        setUserType('');
        setUserData(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserType('');
      setUserData(null);
    }
  };

  useEffect(() => {
    checkUserData();
    
    // Listen for profile updates
    const handleProfileUpdate = (event) => {
      const { user } = event.detail;
      setUserData(user);
      setUserType(user.role);
    };

    // Listen for login event
    const handleLogin = (event) => {
      const { user } = event.detail;
      setIsLoggedIn(true);
      setUserData(user);
      setUserType(user.role);
    };

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        checkUserData();
      }
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    window.addEventListener('userLogin', handleLogin);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
      window.removeEventListener('userLogin', handleLogin);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserType('');
    setUserData(null);
    // Dispatch logout event
    window.dispatchEvent(new CustomEvent('userLogout'));
    navigate('/');
  };

  const getDashboardLink = () => {
    return userType === 'restaurant' ? '/restaurant/dashboard' : '/ngo/dashboard';
  };

  const handleDashboardClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  };

  // Function to collapse navbar
  const collapseNavbar = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarToggler && navbarCollapse) {
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    }
  };

  // Handle click outside navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.navbar');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Check if click is outside navbar
        if (!navbar.contains(event.target)) {
          collapseNavbar();
        }
      }
    };

    // Add click event listener to document
    document.addEventListener('click', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'bg-white shadow-sm' : 'navbar-transparent'}`}
         style={{ transition: 'all 0.3s ease-in-out' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={collapseNavbar}>
          <i className="fas fa-text-primary"></i>
          <span style={{ fontSize: '1.3rem' }}>FoodBridge</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars text-dark"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={collapseNavbar}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={collapseNavbar}>About</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to={getDashboardLink()}
                  onClick={(e) => {
                    handleDashboardClick(e);
                    collapseNavbar();
                  }}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isLoggedIn && userType === 'restaurant' && (
              <li className="nav-item">
                <Link className="nav-link" to="/donation/new" onClick={collapseNavbar}>Donate Food</Link>
              </li>
            )}
            {isLoggedIn && userType === 'ngo' && (
              <li className="nav-item">
                <Link className="nav-link" to="/donations" onClick={collapseNavbar}>Available Donations</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={collapseNavbar}>Contact</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2" onClick={collapseNavbar}>Login</Link>
                <Link to="/register" className="btn btn-primary" onClick={collapseNavbar}>Register</Link>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <button
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="position-relative">
                      {userData?.profileImage ? (
                        <img
                          src={userData.profileImage}
                          alt={userData?.name || 'Profile'}
                          className="rounded-circle border border-2 border-primary"
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <DefaultProfilePic 
                          name={userData?.name || userData?.organizationName} 
                          size={40} 
                          fontSize={16}
                        />
                      )}
                      <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-light rounded-circle">
                        <span className="visually-hidden">Online</span>
                      </span>
                    </div>
                    <span className="ms-2 fw-medium" style={{ color: isScrolled ? 'var(--dark-gray)' : 'var(--dark-gray)' }}>
                      {userData?.name || userData?.organizationName || 'User'}
                    </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li className="px-3 py-2 text-muted small">
                      Signed in as <br />
                      <span className="fw-bold">{userData?.email}</span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item" to="/profile" onClick={collapseNavbar}>
                        <i className="fas fa-user me-2 text-primary"></i>Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={getDashboardLink()} onClick={collapseNavbar}>
                        <i className="fas fa-tachometer-alt me-2 text-primary"></i>Dashboard
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button onClick={() => {
                        handleLogout();
                        collapseNavbar();
                      }} className="dropdown-item text-danger">
                        <i className="fas fa-sign-out-alt me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 