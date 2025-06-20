import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mockDonations from '../mock/mockDonations';

const ViewDonations = () => {
  // State for storing donations, filters, and sorting
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors] = useState({});
  const [filters, setFilters] = useState({
    foodType: '',
    distance: '',
    expiryTime: '',
  });
  const [sortBy, setSortBy] = useState('expiry');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to get badge color based on food type
  const getFoodTypeBadgeColor = (foodType) => {
    switch (foodType) {
      case 'Non-Vegetarian Cooked Meals':
        return 'danger';
      case 'Vegetarian Cooked Meals':
        return 'success';
      case 'Grilled / Tandoori':
        return 'warning';
      case 'Fried / Steamed':
        return 'info';
      case 'Bakery Items':
        return 'primary';
      case 'Fresh Produce':
        return 'success';
      case 'Dairy Products':
        return 'light';
      case 'Packaged / Dry Foods':
        return 'secondary';
      case 'Beverages':
        return 'info';
      case 'Mixed Items':
        return 'dark';
      default:
        return 'secondary';
    }
  };

  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    // Use shared mockDonations
    setDonations(mockDonations);
    setFilteredDonations(mockDonations);
    setLoading(false);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...donations];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(donation => 
        donation.restaurantName.toLowerCase().includes(query) ||
        donation.foodItems.toLowerCase().includes(query)
      );
    }
    
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
  }, [donations, filters, sortBy, searchQuery]);

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

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
              value={searchQuery}
              onChange={handleSearch}
            />
            <button 
              className="btn btn-primary" 
              type="button"
              onClick={() => setSearchQuery('')}
              title={searchQuery ? "Clear search" : "Search"}
            >
              <i className={`fas fa-${searchQuery ? 'times' : 'search'} me-1`}></i>
              {searchQuery ? 'Clear' : 'Search'}
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
                    className={`form-select ${errors.foodType ? 'is-invalid' : ''}`}
                    id="foodType" 
                    name="foodType"
                    value={filters.foodType}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="Non-Vegetarian Cooked Meals">Non-Vegetarian Cooked Meals</option>
                    <option value="Vegetarian Cooked Meals">Vegetarian Cooked Meals</option>
                    <option value="Grilled / Tandoori">Grilled / Tandoori</option>
                    <option value="Fried / Steamed">Fried / Steamed</option>
                    <option value="Bakery Items">Bakery Items</option>
                    <option value="Fresh Produce">Fresh Produce</option>
                    <option value="Dairy Products">Dairy Products</option>
                    <option value="Packaged / Dry Foods">Packaged / Dry Foods</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Mixed Items">Mixed Items</option>
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
                      <p className="mb-2">
                        <span className={`badge bg-${getFoodTypeBadgeColor(donation.foodType)} me-2`}>
                          {donation.foodType}
                        </span>
                        {donation.isNew && (
                          <span className="badge bg-danger ms-1">New</span>
                        )}
                      </p>
                      
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
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="fas fa-search fa-3x text-muted"></i>
              </div>
              <h4>No Donations Found</h4>
              <p className="text-muted mb-4">
                {searchQuery 
                  ? `No donations match your search "${searchQuery}"`
                  : filters.foodType || filters.distance || filters.expiryTime
                    ? "No donations match your selected filters"
                    : "No donations are currently available"
                }
              </p>
              {(searchQuery || filters.foodType || filters.distance || filters.expiryTime) && (
                <button 
                  className="btn btn-outline-primary"
                  onClick={resetFilters}
                >
                  <i className="fas fa-redo me-2"></i>
                  Reset All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDonations; 