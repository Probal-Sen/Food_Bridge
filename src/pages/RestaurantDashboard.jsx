import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RestaurantDashboard = () => {
  // Mock data - in a real app, this would come from an API
  const [stats] = useState({
    totalDonations: 24,
    pendingPickups: 2,
    totalMealsSaved: 350,
    totalKgSaved: 175,
    co2Reduction: 612, // in kg
  });

  const [recentDonations] = useState([
    {
      id: 1,
      foodItems: 'Mixed vegetables, Pasta, Bread',
      quantity: '5 kg',
      pickupTime: '2023-06-15 18:00',
      ngoName: 'Food For All',
      status: 'Picked up',
      peopleHelped: 15
    },
    {
      id: 2,
      foodItems: 'Rice, Curry, Salad',
      quantity: '7 kg',
      pickupTime: '2023-06-14 19:30',
      ngoName: 'Helping Hands',
      status: 'Picked up',
      peopleHelped: 20
    },
    {
      id: 3,
      foodItems: 'Sandwiches, Pastries, Fruit',
      quantity: '3 kg',
      pickupTime: '2023-06-18 16:00',
      ngoName: 'Community Shelter',
      status: 'Scheduled',
      peopleHelped: null
    },
    {
      id: 4,
      foodItems: 'Soup, Bread, Desserts',
      quantity: '4 kg',
      pickupTime: '2023-06-19 17:30',
      ngoName: 'Pending',
      status: 'Available',
      peopleHelped: null
    }
  ]);

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

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="fw-bold">Restaurant Dashboard</h2>
          <p className="text-muted">Welcome back, Restaurant Name!</p>
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
            <div className="card-footer bg-white text-center">
              <Link to="/donations" className="text-decoration-none">View All Donations</Link>
            </div>
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