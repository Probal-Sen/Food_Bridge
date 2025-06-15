import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewDonations = () => {
  // State for storing donations, filters, and sorting
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    foodType: '',
    distance: '',
    expiryTime: '',
  });
  const [sortBy, setSortBy] = useState('expiry');

  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockDonations = [
        {
          id: 1,
          restaurantName: 'Green Garden Restaurant',
          restaurantId: 101,
          foodItems: 'Rice, Curry, Mixed Vegetables',
          foodType: 'Cooked Meals',
          quantity: '10 kg',
          distance: 2.5,
          expiryTime: 12, // hours
          pickupWindow: '18:00 - 20:00',
          address: '123 Main St, Eco City',
          postedTime: '2 hours ago',
          specialInstructions: 'Contains allergens: nuts, dairy',
          isNew: true
        },
        {
          id: 2,
          restaurantName: 'Sunshine Café',
          restaurantId: 102,
          foodItems: 'Sandwiches, Pastries, Fruit Salad',
          foodType: 'Bakery Items',
          quantity: '5 kg',
          distance: 3.2,
          expiryTime: 16, // hours
          pickupWindow: '19:00 - 21:00',
          address: '456 Park Ave, Eco City',
          postedTime: '3 hours ago',
          specialInstructions: '',
          isNew: true
        },
        {
          id: 3,
          restaurantName: 'Royal Spice',
          restaurantId: 103,
          foodItems: 'Bread, Pasta, Salad',
          foodType: 'Mixed Items',
          quantity: '6 kg',
          distance: 4.1,
          expiryTime: 24, // hours
          pickupWindow: '20:00 - 22:00',
          address: '789 Oak St, Eco City',
          postedTime: '5 hours ago',
          specialInstructions: 'Refrigeration required',
          isNew: false
        },
        {
          id: 4,
          restaurantName: 'Urban Kitchen',
          restaurantId: 104,
          foodItems: 'Pizza, Garlic Bread, Salads',
          foodType: 'Cooked Meals',
          quantity: '8 kg',
          distance: 1.8,
          expiryTime: 6, // hours
          pickupWindow: '17:00 - 19:00',
          address: '321 Elm St, Eco City',
          postedTime: '1 hour ago',
          specialInstructions: '',
          isNew: true
        },
        {
          id: 5,
          restaurantName: 'Fresh Bites',
          restaurantId: 105,
          foodItems: 'Wraps, Soups, Desserts',
          foodType: 'Mixed Items',
          quantity: '7 kg',
          distance: 5.5,
          expiryTime: 18, // hours
          pickupWindow: '18:30 - 20:30',
          address: '567 Maple Ave, Eco City',
          postedTime: '4 hours ago',
          specialInstructions: 'Contains allergens: gluten, dairy',
          isNew: false
        },
        {
          id: 6,
          restaurantName: 'Sea Breeze Restaurant',
          restaurantId: 106,
          foodItems: 'Fish, Rice, Vegetables',
          foodType: 'Cooked Meals',
          quantity: '9 kg',
          distance: 6.2,
          expiryTime: 8, // hours
          pickupWindow: '19:30 - 21:30',
          address: '890 Pine Rd, Eco City',
          postedTime: '2 hours ago',
          specialInstructions: 'Contains seafood',
          isNew: false
        }
      ];

      setDonations(mockDonations);
      setFilteredDonations(mockDonations);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...donations];
    
    // Apply filters
    if (filters.foodType) {
      result = result.filter(donation => donation.foodType === filters.foodType);
    }
    
    if (filters.distance) {
      const maxDistance = parseInt(filters.distance);
      result = result.filter(donation => donation.distance <= maxDistance);
    }
    
    if (filters.expiryTime) {
      const maxExpiry = parseInt(filters.expiryTime);
      result = result.filter(donation => donation.expiryTime <= maxExpiry);
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'distance':
        result.sort((a, b) => a.distance - b.distance);
        break;
      case 'expiry':
        result.sort((a, b) => a.expiryTime - b.expiryTime);
        break;
      case 'quantity':
        result.sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity));
        break;
      default:
        break;
    }
    
    setFilteredDonations(result);
  }, [donations, filters, sortBy]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle sort changes
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      foodType: '',
      distance: '',
      expiryTime: '',
    });
    setSortBy('expiry');
  };

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-7">
          <h2 className="fw-bold">Available Donations</h2>
          <p className="text-muted">Browse food donations available for pickup in your area</p>
        </div>
        <div className="col-md-5">
          <div className="input-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by restaurant or food item..." 
              aria-label="Search donations"
            />
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search me-1"></i> Search
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="card border-0 shadow">
            <div className="card-header bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Filters</h5>
                <button 
                  className="btn btn-sm btn-link text-decoration-none" 
                  onClick={resetFilters}
                >
                  Reset All
                </button>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="foodType" className="form-label">Food Type</label>
                  <select 
                    className="form-select" 
                    id="foodType" 
                    name="foodType"
                    value={filters.foodType}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="Cooked Meals">Cooked Meals</option>
                    <option value="Bakery Items">Bakery Items</option>
                    <option value="Mixed Items">Mixed Items</option>
                    <option value="Raw Ingredients">Raw Ingredients</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="distance" className="form-label">Max Distance</label>
                  <select 
                    className="form-select" 
                    id="distance" 
                    name="distance"
                    value={filters.distance}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any Distance</option>
                    <option value="3">Within 3 km</option>
                    <option value="5">Within 5 km</option>
                    <option value="10">Within 10 km</option>
                    <option value="20">Within 20 km</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="expiryTime" className="form-label">Expiry Time</label>
                  <select 
                    className="form-select" 
                    id="expiryTime" 
                    name="expiryTime"
                    value={filters.expiryTime}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any Time</option>
                    <option value="6">Within 6 hours</option>
                    <option value="12">Within 12 hours</option>
                    <option value="24">Within 24 hours</option>
                    <option value="48">Within 48 hours</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="sortBy" className="form-label">Sort By</label>
                  <select 
                    className="form-select" 
                    id="sortBy"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="expiry">Expiry Time (Soonest)</option>
                    <option value="distance">Distance (Nearest)</option>
                    <option value="quantity">Quantity (Highest)</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Donations Grid */}
        <div className="col-lg-9">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading available donations...</p>
            </div>
          ) : filteredDonations.length > 0 ? (
            <div className="row">
              {filteredDonations.map(donation => (
                <div key={donation.id} className="col-md-6 col-xl-4 mb-4">
                  <div className="card border-0 shadow-sm h-100 position-relative">
                    {donation.isNew && (
                      <div className="position-absolute top-0 end-0 mt-2 me-2">
                        <span className="badge bg-danger">New</span>
                      </div>
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{donation.restaurantName}</h5>
                      <p className="card-text mb-2">
                        <strong>Food Items:</strong> {donation.foodItems}
                      </p>
                      <p className="mb-2"><small>Type: {donation.foodType}</small></p>
                      
                      <div className="d-flex justify-content-between mb-2">
                        <span><i className="fas fa-weight me-1"></i> {donation.quantity}</span>
                        <span><i className="fas fa-map-marker-alt me-1"></i> {donation.distance} km</span>
                      </div>
                      
                      <div className="d-flex justify-content-between mb-3">
                        <span className={`text-${donation.expiryTime < 6 ? 'danger' : donation.expiryTime < 12 ? 'warning' : 'success'}`}>
                          <i className="fas fa-clock me-1"></i> 
                          Expires in {donation.expiryTime} hours
                        </span>
                      </div>
                      
                      <p className="mb-2"><small><i className="fas fa-hourglass-half me-1"></i> Pickup: {donation.pickupWindow}</small></p>
                      {donation.specialInstructions && (
                        <p className="small text-muted mb-3">
                          <i className="fas fa-info-circle me-1"></i> {donation.specialInstructions}
                        </p>
                      )}
                      
                      <div className="d-grid gap-2">
                        <Link to={`/donation/${donation.id}`} className="btn btn-outline-primary">View Details</Link>
                        <button className="btn btn-primary">Request Pickup</button>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent text-muted small">
                      <i className="fas fa-clock me-1"></i> Posted {donation.postedTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i> No donations match your current filters. Try adjusting your filters or check back later!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDonations; 