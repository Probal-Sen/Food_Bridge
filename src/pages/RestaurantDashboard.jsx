import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { donationService } from '../services/api';

const RestaurantDashboard = () => {
  const location = useLocation();
  const [stats, setStats] = useState({
    totalDonations: 0,
    pendingPickups: 0,
    totalMealsSaved: 0,
    totalKgSaved: 0,
    co2Reduction: 0,
  });

  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load donations and calculate stats
  const loadDonations = async () => {
    try {
      const allDonations = await donationService.getAllDonations();
      const userDonations = allDonations.filter(donation => {
        const user = JSON.parse(localStorage.getItem('user'));
        return donation.restaurant === user.id;
      });

      setRecentDonations(userDonations.map(donation => ({
        id: donation.id,
        foodItems: donation.foodItems,
        quantity: `${donation.quantity} ${donation.quantityUnit}`,
        pickupTime: `${donation.pickupDate} ${donation.pickupStartTime}`,
        ngoName: donation.ngoAssigned || 'Pending',
        status: donation.status || 'Available',
        peopleHelped: donation.estimatedMeals ? parseInt(donation.estimatedMeals) : null
      })));

      // Calculate stats
      setStats({
        totalDonations: userDonations.length,
        pendingPickups: userDonations.filter(d => d.status === 'Available').length,
        totalMealsSaved: userDonations.reduce((acc, curr) => acc + (parseInt(curr.estimatedMeals) || 0), 0),
        totalKgSaved: userDonations.reduce((acc, curr) => {
          if (curr.quantityUnit === 'kg') {
            return acc + (parseFloat(curr.quantity) || 0);
          }
          return acc;
        }, 0),
        co2Reduction: userDonations.reduce((acc, curr) => {
          if (curr.quantityUnit === 'kg') {
            // Rough estimate: 1 kg of food waste = 3.5 kg of CO2
            return acc + ((parseFloat(curr.quantity) || 0) * 3.5);
          }
          return acc;
        }, 0),
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading donations:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  // Show success message if redirected from donation creation
  useEffect(() => {
    if (location.state?.successMessage) {
      // You could add a toast notification here
      loadDonations(); // Reload donations when redirected from successful creation
    }
  }, [location.state]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Food For All has accepted your donation #1.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      message: 'Your donation #2 was successfully delivered to Helping Hands.',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      message: 'Community Shelter has scheduled a pickup for your donation #3.',
      time: '1 day ago',
      read: false
    }
  ]);

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Picked up':
        return 'bg-success';
      case 'Scheduled':
        return 'bg-warning';
      case 'Available':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {location.state?.successMessage && (
        <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
          <i className="fas fa-check-circle me-2"></i>
          {location.state.successMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="fw-bold">Restaurant Dashboard</h2>
          <p className="text-muted">Welcome back, {JSON.parse(localStorage.getItem('user'))?.name || 'Restaurant'}!</p>
        </div>
        <div className="col-md-4 text-md-end">
          <Link to="/donation/new" className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>List New Donation
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row mb-4">
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card border-0 shadow h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Donations</h6>
                  <h2 className="fw-bold">{stats.totalDonations}</h2>
                </div>
                <div className="bg-light-green rounded-circle p-3">
                  <i className="fas fa-gift text-white fa-2x"></i>
                </div>
              </div>
              <div className="progress mt-3" style={{ height: '5px' }}>
                <div className="progress-bar bg-success" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="small mt-2">
                <span className="text-success me-2">
                  <i className="fas fa-arrow-up"></i> 15%
                </span>
                from last month
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card border-0 shadow h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Meals Saved</h6>
                  <h2 className="fw-bold">{stats.totalMealsSaved}</h2>
                </div>
                <div className="bg-primary rounded-circle p-3">
                  <i className="fas fa-utensils text-white fa-2x"></i>
                </div>
              </div>
              <div className="progress mt-3" style={{ height: '5px' }}>
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: '65%' }} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="small mt-2">
                <span className="text-success me-2">
                  <i className="fas fa-arrow-up"></i> 10%
                </span>
                from last month
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card border-0 shadow h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">CO₂ Reduction</h6>
                  <h2 className="fw-bold">{stats.co2Reduction} kg</h2>
                </div>
                <div className="bg-success rounded-circle p-3">
                  <i className="fas fa-leaf text-white fa-2x"></i>
                </div>
              </div>
              <div className="progress mt-3" style={{ height: '5px' }}>
                <div className="progress-bar bg-success" role="progressbar" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="small mt-2">
                <span className="text-success me-2">
                  <i className="fas fa-arrow-up"></i> 18%
                </span>
                from last month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donations and Notifications */}
      <div className="row">
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="card border-0 shadow">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Recent Donations</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Food Items</th>
                      <th>Quantity</th>
                      <th>Pickup Time</th>
                      <th>NGO</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDonations.map(donation => (
                      <tr key={donation.id}>
                        <td>{donation.foodItems}</td>
                        <td>{donation.quantity}</td>
                        <td>{donation.pickupTime}</td>
                        <td>{donation.ngoName}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(donation.status)}`}>
                            {donation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="card-footer bg-white text-center">
              <Link to="/donations" className="text-decoration-none">View All Donations</Link>
            // </div> */}
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Notifications</h5>
              {unreadNotificationsCount > 0 && (
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={markAllNotificationsAsRead}
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <li 
                      key={notification.id} 
                      className={`list-group-item px-4 py-3 ${!notification.read ? 'bg-light' : ''}`}
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className={`rounded-circle bg-${!notification.read ? 'primary' : 'secondary'} text-white p-2`}>
                            <i className="fas fa-bell small"></i>
                          </div>
                        </div>
                        <div className="ms-3">
                          <p className="mb-1">{notification.message}</p>
                          <small className="text-muted">{notification.time}</small>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item px-4 py-3 text-center">
                    No notifications yet
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard; 