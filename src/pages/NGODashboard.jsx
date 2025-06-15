import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NGODashboard = () => {
  // Mock data - in a real app, this would come from an API
  const [stats] = useState({
    totalPickups: 36,
    scheduledPickups: 3,
    peopleHelped: 750,
    totalKgCollected: 380,
    restaurantPartners: 12,
  });

  const [nearbyDonations] = useState([
    {
      id: 1,
      restaurantName: 'Green Garden Restaurant',
      foodItems: 'Rice, Curry, Mixed Vegetables',
      quantity: '10 kg',
      distance: '2.5 km',
      expiryTime: '12 hours',
      pickupWindow: '18:00 - 20:00',
      isNew: true
    },
    {
      id: 2,
      restaurantName: 'Sunshine Café',
      foodItems: 'Sandwiches, Pastries, Fruit Salad',
      quantity: '5 kg',
      distance: '3.2 km',
      expiryTime: '16 hours',
      pickupWindow: '19:00 - 21:00',
      isNew: true
    },
    {
      id: 3,
      restaurantName: 'Royal Spice',
      foodItems: 'Bread, Pasta, Salad',
      quantity: '6 kg',
      distance: '4.1 km',
      expiryTime: '24 hours',
      pickupWindow: '20:00 - 22:00',
      isNew: false
    }
  ]);

  const [scheduledPickups] = useState([
    {
      id: 101,
      restaurantName: 'Flavor House',
      foodItems: 'Pizza, Pasta, Salads',
      quantity: '8 kg',
      pickupTime: '2023-06-15 18:30',
      address: '123 Main St, Eco City',
      contact: '+1 (555) 123-4567'
    },
    {
      id: 102,
      restaurantName: 'Fresh Bites',
      foodItems: 'Wraps, Soups, Desserts',
      quantity: '6 kg',
      pickupTime: '2023-06-16 19:00',
      address: '456 Park Ave, Eco City',
      contact: '+1 (555) 987-6543'
    },
    {
      id: 103,
      restaurantName: 'Urban Kitchen',
      foodItems: 'Rice, Curry, Breads',
      quantity: '12 kg',
      pickupTime: '2023-06-17 17:30',
      address: '789 Forest Lane, Eco City',
      contact: '+1 (555) 456-7890'
    }
  ]);

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="fw-bold">NGO Dashboard</h2>
          <p className="text-muted">Welcome back, NGO Name!</p>
        </div>
        <div className="col-md-4 text-md-end">
          <Link to="/donations" className="btn btn-primary">
            <i className="fas fa-search me-2"></i>Browse Available Donations
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
                  <h6 className="text-muted">Total Collections</h6>
                  <h2 className="fw-bold">{stats.totalPickups}</h2>
                </div>
                <div className="bg-primary rounded-circle p-3">
                  <i className="fas fa-truck text-white fa-2x"></i>
                </div>
              </div>
              <div className="progress mt-3" style={{ height: '5px' }}>
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="small mt-2">
                <span className="text-success me-2">
                  <i className="fas fa-arrow-up"></i> 12%
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
                  <h6 className="text-muted">People Helped</h6>
                  <h2 className="fw-bold">{stats.peopleHelped}</h2>
                </div>
                <div className="bg-success rounded-circle p-3">
                  <i className="fas fa-users text-white fa-2x"></i>
                </div>
              </div>
              <div className="progress mt-3" style={{ height: '5px' }}>
                <div className="progress-bar bg-success" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
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
        
        <div className="col-md-4">
          <div className="card border-0 shadow h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Restaurant Partners</h6>
                  <h2 className="fw-bold">{stats.restaurantPartners}</h2>
                </div>
                <div className="bg-light-green rounded-circle p-3">
                  <i className="fas fa-store text-white fa-2x"></i>
                </div>
              </div>
              <div className="progress mt-3" style={{ height: '5px' }}>
                <div className="progress-bar bg-light-green" role="progressbar" style={{ width: '60%' }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="small mt-2">
                <span className="text-success me-2">
                  <i className="fas fa-arrow-up"></i> 8%
                </span>
                from last month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Donations Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Nearby Donations</h5>
            </div>
            <div className="card-body">
              {nearbyDonations.length > 0 ? (
                <div className="row">
                  {nearbyDonations.map(donation => (
                    <div key={donation.id} className="col-md-6 col-xl-4 mb-4">
                      <div className="card border-0 shadow-sm h-100 position-relative">
                        {donation.isNew && (
                          <div className="position-absolute top-0 end-0 mt-2 me-2">
                            <span className="badge bg-danger">New</span>
                          </div>
                        )}
                        <div className="card-body">
                          <h5 className="card-title">{donation.restaurantName}</h5>
                          <p className="card-text">
                            <strong>Food Items:</strong> {donation.foodItems}
                          </p>
                          <div className="d-flex justify-content-between mb-2">
                            <span><i className="fas fa-weight me-1"></i> {donation.quantity}</span>
                            <span><i className="fas fa-map-marker-alt me-1"></i> {donation.distance}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <span><i className="fas fa-clock me-1"></i> Expires in: {donation.expiryTime}</span>
                            <span><i className="fas fa-hourglass-half me-1"></i> {donation.pickupWindow}</span>
                          </div>
                          <div className="d-grid">
                            <button className="btn btn-primary">Request Pickup</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">
                  No nearby donations available at the moment. Check back later!
                </div>
              )}
            </div>
            <div className="card-footer bg-white text-center">
              <Link to="/donations" className="text-decoration-none">View All Available Donations</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Pickups Section */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Scheduled Pickups</h5>
            </div>
            <div className="card-body">
              {scheduledPickups.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Restaurant</th>
                        <th>Food Items</th>
                        <th>Quantity</th>
                        <th>Pickup Time</th>
                        <th>Address</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduledPickups.map(pickup => (
                        <tr key={pickup.id}>
                          <td>
                            <strong>{pickup.restaurantName}</strong>
                            <div className="small text-muted">{pickup.contact}</div>
                          </td>
                          <td>{pickup.foodItems}</td>
                          <td>{pickup.quantity}</td>
                          <td>{pickup.pickupTime}</td>
                          <td>{pickup.address}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">
                              <i className="fas fa-map-marked-alt"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-success me-2">
                              <i className="fas fa-check"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="fas fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info">
                  No scheduled pickups. Browse available donations to schedule pickups.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard; 