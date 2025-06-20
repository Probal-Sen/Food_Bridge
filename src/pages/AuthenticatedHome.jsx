import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefaultProfilePic from '../components/DefaultProfilePic';

const AuthenticatedHome = () => {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    activeDonations: 0,
    completedDonations: 0,
    availableDonations: 0,
    claimedDonations: 0
  });

  useEffect(() => {
    // Load user data
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
        
        // Fetch user-specific stats
        fetchUserStats(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const fetchUserStats = async (user) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container px-4">
          <div className="row gx-5 justify-content-center">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center mb-4">
                <div className="position-relative me-3">
                  {userData?.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt={userData?.name || 'Profile'}
                      className="rounded-circle border border-2 border-white"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  ) : (
                    <DefaultProfilePic 
                      name={userData?.name || userData?.organizationName} 
                      size={80} 
                      fontSize={32}
                      bgColor="white"
                      textColor="#0d6efd"
                    />
                  )}
                </div>
                <div className="text-center">
                  <h1 className="display-5 fw-bold mb-2">
                    Welcome, {userData?.name || userData?.organizationName}!
                  </h1>
                  <p className="lead mb-4">
                    {userData?.role === 'restaurant' ? 'Thank you for helping reduce food waste' : 'Together we can make a difference'}
                  </p>
                  <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                    {userData?.role === 'restaurant' ? (
                      <Link to="/donation/new" className="btn btn-lg btn-light px-4 me-sm-3">
                        <i className="fas fa-plus me-2"></i>Create Donation
                      </Link>
                    ) : (
                      <Link to="/donations" className="btn btn-lg btn-light px-4 me-sm-3">
                        <i className="fas fa-search me-2"></i>Browse Donations
                      </Link>
                    )}
                    <Link to={userData?.role === 'restaurant' ? '/restaurant/dashboard' : '/ngo/dashboard'} 
                          className="btn btn-lg btn-outline-light px-4">
                      <i className="fas fa-th-large me-2"></i>Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <div className="container px-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4">
                  <h3 className="card-title h4 mb-4">Your Activity</h3>
                  <div className="text-center py-4">
                    <div className="row">
                      {userData?.role === 'restaurant' ? (
                        <>
                          <div className="col-6 border-end">
                            <h4 className="display-5 fw-bold text-primary">{stats.activeDonations}</h4>
                            <p className="text-muted mb-0">Active Donations</p>
                          </div>
                          <div className="col-6">
                            <h4 className="display-5 fw-bold text-success">{stats.completedDonations}</h4>
                            <p className="text-muted mb-0">Completed Donations</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-6 border-end">
                            <h4 className="display-5 fw-bold text-primary">{stats.availableDonations}</h4>
                            <p className="text-muted mb-0">Available Donations</p>
                          </div>
                          <div className="col-6">
                            <h4 className="display-5 fw-bold text-success">{stats.claimedDonations}</h4>
                            <p className="text-muted mb-0">Claimed Donations</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4">
                  <h3 className="card-title h4 mb-4">Quick Links</h3>
                  <div className="d-grid gap-3">
                    <Link to="/profile" className="btn btn-outline-primary">
                      <i className="fas fa-user me-2"></i>Update Profile
                    </Link>
                    {userData?.role === 'restaurant' ? (
                      <Link to="/restaurant/dashboard" className="btn btn-outline-primary">
                        <i className="fas fa-history me-2"></i>View Donation History
                      </Link>
                    ) : (
                      <Link to="/ngo/dashboard" className="btn btn-outline-primary">
                        <i className="fas fa-history me-2"></i>View Claimed Donations
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-5 bg-light">
        <div className="container px-4">
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <div className="my-5">
                <h2 className="fw-bold mb-3">Community Impact</h2>
                <p className="lead mb-4">
                  Together we can make a difference in reducing food waste and
                  fighting hunger in our communities.
                </p>
                <div className="row mb-4">
                  <div className="col-md-4 text-center">
                    <div className="display-4 fw-bold text-primary">2500+</div>
                    <p className="text-muted">Meals Saved</p>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="display-4 fw-bold text-primary">50+</div>
                    <p className="text-muted">Restaurant Partners</p>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="display-4 fw-bold text-primary">30+</div>
                    <p className="text-muted">NGO Partners</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <img className="img-fluid rounded-3 my-5" src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="People volunteering at a food bank" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="py-5">
        <div className="container px-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h2 className="fw-bold">Recent Activity</h2>
                <p className="lead">Track your impact in the community</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                  {/* Activity Timeline */}
                  <div className="position-relative">
                    {/* Timeline line */}
                    <div className="position-absolute top-0 bottom-0 start 50"
                         style={{
                           width: '2px',
                           backgroundColor: '#e9ecef',
                           left: '24px',
                           zIndex: 1
                         }}></div>

                    {/* Activity Items */}
                    {stats.activeDonations + stats.completedDonations + stats.availableDonations + stats.claimedDonations > 0 ? (
                      <>
                        {/* Sample Activities - These should be replaced with real data */}
                        <div className="d-flex p-4 position-relative">
                          <div className="position-relative" style={{ zIndex: 2 }}>
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                                 style={{ width: '50px', height: '50px' }}>
                              <i className="fas fa-hand-holding-heart text-white fs-4"></i>
                            </div>
                          </div>
                          <div className="ms-4">
                            <div className="d-flex align-items-center mb-2">
                              <h5 className="mb-0 fw-bold">New Donation Created</h5>
                              <span className="badge bg-success ms-2">Active</span>
                            </div>
                            <p className="text-muted mb-2">50 meals available for collection</p>
                            <small className="text-muted">2 hours ago</small>
                          </div>
                        </div>

                        <div className="d-flex p-4 position-relative">
                          <div className="position-relative" style={{ zIndex: 2 }}>
                            <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" 
                                 style={{ width: '50px', height: '50px' }}>
                              <i className="fas fa-check text-white fs-4"></i>
                            </div>
                          </div>
                          <div className="ms-4">
                            <div className="d-flex align-items-center mb-2">
                              <h5 className="mb-0 fw-bold">Donation Completed</h5>
                              <span className="badge bg-primary ms-2">Success</span>
                            </div>
                            <p className="text-muted mb-2">30 meals successfully delivered</p>
                            <small className="text-muted">Yesterday</small>
                          </div>
                        </div>

                        <div className="d-flex p-4 position-relative">
                          <div className="position-relative" style={{ zIndex: 2 }}>
                            <div className="bg-info rounded-circle d-flex align-items-center justify-content-center" 
                                 style={{ width: '50px', height: '50px' }}>
                              <i className="fas fa-sync text-white fs-4"></i>
                            </div>
                          </div>
                          <div className="ms-4">
                            <div className="d-flex align-items-center mb-2">
                              <h5 className="mb-0 fw-bold">Profile Updated</h5>
                              <span className="badge bg-info ms-2">Info</span>
                            </div>
                            <p className="text-muted mb-2">Contact information updated</p>
                            <small className="text-muted">2 days ago</small>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-5">
                        <div className="mb-4">
                          <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                               style={{ width: '80px', height: '80px' }}>
                            <i className="fas fa-chart-line text-primary fs-2"></i>
                          </div>
                          <h4 className="fw-bold text-muted">No Activity Yet</h4>
                          <p className="text-muted mb-4">Start making a difference in your community today!</p>
                          {userData?.role === 'restaurant' ? (
                            <Link to="/donation/new" className="btn btn-primary">
                              <i className="fas fa-plus me-2"></i>Create Your First Donation
                            </Link>
                          ) : (
                            <Link to="/donations" className="btn btn-primary">
                              <i className="fas fa-search me-2"></i>Browse Available Donations
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* View All Link */}
                  {stats.activeDonations + stats.completedDonations + stats.availableDonations + stats.claimedDonations > 0 && (
                    <div className="p-4 border-top">
                      <Link 
                        to={userData?.role === 'restaurant' ? '/restaurant/dashboard' : '/ngo/dashboard'} 
                        className="btn btn-light w-100"
                      >
                        View All Activity
                        <i className="fas fa-arrow-right ms-2"></i>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthenticatedHome; 