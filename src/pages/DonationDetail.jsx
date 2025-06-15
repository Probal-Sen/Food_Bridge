import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const DonationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState(null);
  const [pickupTime, setPickupTime] = useState('');
  const [notes, setNotes] = useState('');
  
  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API fetch with timeout
    setTimeout(() => {
      // Mock donation details
      const mockDonation = {
        id: parseInt(id),
        restaurantName: 'Green Garden Restaurant',
        restaurantId: 101,
        foodItems: 'Rice, Curry, Mixed Vegetables',
        foodType: 'Cooked Meals',
        quantity: '10 kg',
        servings: 20,
        distance: 2.5,
        expiryTime: 12, // hours
        pickupWindow: '18:00 - 20:00',
        address: '123 Main St, Eco City',
        postedTime: '2 hours ago',
        specialInstructions: 'Contains allergens: nuts, dairy',
        contactPerson: 'Food Bridge',
        contactPhone: '+91 (123) 456-7890',
        isNew: true,
        description: 'We have excess food from a catering event. Food was prepared fresh this morning and properly stored. Includes rice, mixed vegetables curry, and some side dishes. All items are vegetarian. Food needs to be picked up by this evening.',
        availablePickupTimes: [
          '17:00 - 18:00',
          '18:00 - 19:00',
          '19:00 - 20:00',
        ],
        images: [
          'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ]
      };
      
      setDonation(mockDonation);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleRequestPickup = (e) => {
    e.preventDefault();
    
    // Simulate API call to request pickup
    setRequestStatus('loading');
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setRequestStatus('success');
    }, 1500);
  };

  const getExpiryStatus = (hours) => {
    if (hours < 6) return { class: 'danger', text: 'Expires soon' };
    if (hours < 12) return { class: 'warning', text: 'Expiring today' };
    return { class: 'success', text: 'Fresh' };
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading donation details...</p>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Donation Not Found</h4>
          <p>The donation you're looking for doesn't exist or has been removed.</p>
          <hr />
          <Link to="/donations" className="btn btn-primary">Browse All Donations</Link>
        </div>
      </div>
    );
  }

  const expiryStatus = getExpiryStatus(donation.expiryTime);

  return (
    <div className="container py-5">
      <button 
        className="btn btn-outline-secondary mb-4" 
        onClick={handleBackClick}
      >
        <i className="fas fa-arrow-left me-2"></i> Back to Donations
      </button>
      
      <div className="row">
        {/* Donation Details */}
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h2 className="card-title fw-bold">{donation.foodItems}</h2>
                  <p className="text-muted">
                    <i className="fas fa-store me-2"></i>
                    {donation.restaurantName}
                  </p>
                </div>
                <span className={`badge bg-${expiryStatus.class} p-2`}>
                  <i className="fas fa-clock me-1"></i> {expiryStatus.text}
                </span>
              </div>
              
              <div className="row mb-4">
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      <i className="fas fa-utensils me-2 text-primary"></i>
                      <strong>Food Type:</strong> {donation.foodType}
                    </li>
                    <li className="list-group-item px-0">
                      <i className="fas fa-weight me-2 text-primary"></i>
                      <strong>Quantity:</strong> {donation.quantity}
                    </li>
                    <li className="list-group-item px-0">
                      <i className="fas fa-users me-2 text-primary"></i>
                      <strong>Estimated Servings:</strong> {donation.servings}
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      <i className="fas fa-hourglass-half me-2 text-primary"></i>
                      <strong>Pickup Window:</strong> {donation.pickupWindow}
                    </li>
                    <li className="list-group-item px-0">
                      <i className="fas fa-clock me-2 text-primary"></i>
                      <strong>Expires in:</strong> {donation.expiryTime} hours
                    </li>
                    <li className="list-group-item px-0">
                      <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                      <strong>Distance:</strong> {donation.distance} km
                    </li>
                  </ul>
                </div>
              </div>
              
              <h5 className="card-subtitle mb-3 fw-bold">Description</h5>
              <p className="card-text mb-4">{donation.description}</p>
              
              {donation.specialInstructions && (
                <div className="alert alert-info mb-4">
                  <i className="fas fa-info-circle me-2"></i>
                  <strong>Special Instructions:</strong> {donation.specialInstructions}
                </div>
              )}
              
              <h5 className="card-subtitle mb-3 fw-bold">Images</h5>
              <div className="row mb-4">
                {donation.images.map((img, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <img 
                      src={img} 
                      alt={`Food donation ${index + 1}`} 
                      className="img-fluid rounded shadow-sm" 
                    />
                  </div>
                ))}
              </div>
              
              <h5 className="card-subtitle mb-3 fw-bold">Pickup Location</h5>
              <div className="card mb-4 bg-light">
                <div className="card-body">
                  <p className="mb-1">
                    <strong>{donation.restaurantName}</strong>
                  </p>
                  <p className="mb-3">{donation.address}</p>

                  {/* Placeholder for map - in a real app, this would be an embedded map */}
                  <div className="bg-secondary text-white text-center py-5 rounded">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29324.00303568972!2d87.84315600000001!3d23.261261299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1749912432109!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map Location"
                      ></iframe>
                    </div>
                </div>
              </div>
              
              <h5 className="card-subtitle mb-3 fw-bold">Contact Information</h5>
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary text-white rounded-circle p-3 me-3">
                  <i className="fas fa-user fa-2x"></i>
                </div>
                <div>
                  <h6 className="mb-1">{donation.contactPerson}</h6>
                  <p className="mb-0">{donation.contactPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pickup Request Form */}
        <div className="col-lg-4">
          <div className="card border-0 shadow sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-primary text-white py-3">
              <h5 className="mb-0 fw-bold">Request Pickup</h5>
            </div>
            <div className="card-body">
              {requestStatus === 'success' ? (
                <div className="text-center py-4">
                  <div className="bg-success text-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-check fa-3x"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Pickup Requested Successfully!</h5>
                  <p className="mb-4">Your request has been sent to the restaurant. They will contact you shortly to confirm the pickup details.</p>
                  <Link to="/ngo/dashboard" className="btn btn-primary">
                    Go to Dashboard
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleRequestPickup}>
                  <div className="mb-3">
                    <label htmlFor="pickupTime" className="form-label">Preferred Pickup Time</label>
                    <select 
                      className="form-select" 
                      id="pickupTime" 
                      value={pickupTime} 
                      onChange={(e) => setPickupTime(e.target.value)}
                      required
                    >
                      <option value="">Select a time slot</option>
                      {donation.availablePickupTimes.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="notes" className="form-label">Additional Notes</label>
                    <textarea 
                      className="form-control" 
                      id="notes" 
                      rows="3" 
                      placeholder="Any special requests or information the restaurant should know"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg" 
                      disabled={requestStatus === 'loading' || !pickupTime}
                    >
                      {requestStatus === 'loading' ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        'Request Pickup'
                      )}
                    </button>
                  </div>
                  
                  <div className="text-center mt-4">
                    <p className="small text-muted mb-0">
                      By requesting a pickup, you agree to collect the food within the specified time frame.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetail; 