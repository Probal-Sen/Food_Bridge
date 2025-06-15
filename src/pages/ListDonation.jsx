import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { donationService } from '../services/api';

const ListDonation = () => {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const [formData, setFormData] = useState({
    foodType: '',
    foodItems: '',
    quantity: '',
    quantityUnit: 'kg',
    estimatedMeals: '',
    pickupDate: '',
    pickupStartTime: '',
    pickupEndTime: '',
    allergenInfo: '',
    dietaryInfo: '',
    additionalInfo: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.foodType) newErrors.foodType = "Food type is required";
    if (!formData.foodItems) newErrors.foodItems = "Food items description is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!formData.pickupStartTime) newErrors.pickupStartTime = "Pickup start time is required";
    if (!formData.pickupEndTime) newErrors.pickupEndTime = "Pickup end time is required";
    
    // Check if pickup end time is after start time
    if (formData.pickupStartTime && formData.pickupEndTime && 
        formData.pickupStartTime >= formData.pickupEndTime) {
      newErrors.pickupEndTime = "End time must be after start time";
    }
    
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setPreviewMode(true);
      window.scrollTo(0, 0);
    }
  };

  const handleEdit = () => {
    setPreviewMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.role !== 'restaurant') {
        throw new Error('Only restaurants can create donations');
      }

      // Format pickup date and times
      const pickupDate = new Date(formData.pickupDate);
      const startTime = new Date(`${formData.pickupDate} ${formData.pickupStartTime}`);
      const endTime = new Date(`${formData.pickupDate} ${formData.pickupEndTime}`);

      // Validate dates
      if (pickupDate < new Date()) {
        throw new Error('Pickup date cannot be in the past');
      }
      if (startTime >= endTime) {
        throw new Error('Pickup end time must be after start time');
      }

      await donationService.createDonation({
        ...formData,
        pickupDate: pickupDate.toISOString(),
        pickupStartTime: formData.pickupStartTime,
        pickupEndTime: formData.pickupEndTime,
        restaurant: user.id,
      });

      navigate('/restaurant/dashboard', {
        state: { successMessage: 'Your donation has been listed successfully!' }
      });
    } catch (err) {
      console.error('Error creating donation:', err);
      setErrors({ 
        submit: err.response?.data?.message || err.message || 'Failed to list donation. Please try again.' 
      });
      setLoading(false);
      setPreviewMode(false);
      // Scroll to error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Food type options
  const foodTypes = [
    { value: 'cooked', label: 'Cooked Food' },
    { value: 'fresh', label: 'Fresh Produce' },
    { value: 'bakery', label: 'Bakery Items' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'canned', label: 'Canned/Packaged Food' },
    { value: 'mixed', label: 'Mixed/Assorted Items' }
  ];

  // Dietary info options
  const dietaryOptions = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'gluten_free', label: 'Gluten-Free' }
  ];

  if (previewMode) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow">
          <div className="card-header bg-primary text-white py-3">
            <h3 className="mb-0">Review Your Donation</h3>
          </div>
          <div className="card-body p-4">
            <div className="alert alert-info mb-4">
              <i className="fas fa-info-circle me-2"></i>
              Please review your donation details before submitting.
            </div>
            
            <div className="row mb-4">
              <div className="col-md-6">
                <h5 className="border-bottom pb-2 mb-3">Food Information</h5>
                <p><strong>Food Type:</strong> {foodTypes.find(type => type.value === formData.foodType)?.label}</p>
                <p><strong>Food Items:</strong> {formData.foodItems}</p>
                <p><strong>Quantity:</strong> {formData.quantity} {formData.quantityUnit}</p>
                <p><strong>Estimated Meals:</strong> {formData.estimatedMeals || 'Not specified'}</p>
                <p><strong>Dietary Information:</strong> {formData.dietaryInfo || 'Not specified'}</p>
                <p><strong>Allergen Information:</strong> {formData.allergenInfo || 'Not specified'}</p>
              </div>
              
              <div className="col-md-6">
                <h5 className="border-bottom pb-2 mb-3">Pickup Information</h5>
                <p><strong>Pickup Date:</strong> {formatDate(formData.pickupDate)}</p>
                <p><strong>Pickup Window:</strong> {formData.pickupStartTime} - {formData.pickupEndTime}</p>
                <p><strong>Additional Information:</strong> {formData.additionalInfo || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="d-flex justify-content-between">
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={handleEdit}
              >
                <i className="fas fa-edit me-2"></i>Edit
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check me-2"></i>Submit Donation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow">
            <div className="card-header bg-primary text-white py-3">
              <h3 className="mb-0">List a New Food Donation</h3>
            </div>
            <div className="card-body p-4">
              {errors.submit && (
                <div className="alert alert-danger" role="alert">
                  {errors.submit}
                </div>
              )}
              
              <form onSubmit={handleReview}>
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="border-bottom pb-2 mb-3">Food Information</h5>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="foodType" className="form-label">Food Type <span className="text-danger">*</span></label>
                    <select 
                      className={`form-select ${errors.foodType ? 'is-invalid' : ''}`}
                      id="foodType" 
                      name="foodType" 
                      value={formData.foodType} 
                      onChange={handleChange}
                    >
                      <option value="">-- Select Food Type --</option>
                      {foodTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    {errors.foodType && <div className="invalid-feedback">{errors.foodType}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="dietaryInfo" className="form-label">Dietary Information</label>
                    <select 
                      className="form-select" 
                      id="dietaryInfo" 
                      name="dietaryInfo" 
                      value={formData.dietaryInfo} 
                      onChange={handleChange}
                    >
                      <option value="">-- Select Dietary Information --</option>
                      {dietaryOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-12 mb-3">
                    <label htmlFor="foodItems" className="form-label">Food Items Description <span className="text-danger">*</span></label>
                    <textarea 
                      className={`form-control ${errors.foodItems ? 'is-invalid' : ''}`}
                      id="foodItems" 
                      name="foodItems" 
                      placeholder="E.g., 'Rice, Mixed Vegetables, Chicken Curry'" 
                      rows="2"
                      value={formData.foodItems} 
                      onChange={handleChange}
                    ></textarea>
                    {errors.foodItems && <div className="invalid-feedback">{errors.foodItems}</div>}
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <input 
                        type="number" 
                        className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                        id="quantity" 
                        name="quantity" 
                        min="1"
                        value={formData.quantity} 
                        onChange={handleChange}
                      />
                      <select 
                        className="form-select" 
                        id="quantityUnit"
                        name="quantityUnit"
                        value={formData.quantityUnit}
                        onChange={handleChange}
                        style={{ maxWidth: '80px' }}
                      >
                        <option value="kg">kg</option>
                        <option value="lb">lb</option>
                        <option value="items">items</option>
                      </select>
                      {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                    </div>
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="estimatedMeals" className="form-label">Estimated Meals</label>
                    <input 
                      type="number" 
                      className="form-control"
                      id="estimatedMeals" 
                      name="estimatedMeals" 
                      min="1"
                      placeholder="Optional"
                      value={formData.estimatedMeals} 
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="allergenInfo" className="form-label">Allergen Information</label>
                    <input 
                      type="text" 
                      className="form-control"
                      id="allergenInfo" 
                      name="allergenInfo" 
                      placeholder="E.g., 'Contains nuts, dairy'"
                      value={formData.allergenInfo} 
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="border-bottom pb-2 mb-3">Pickup Information</h5>
                  </div>
                  

                  <div className="col-md-4 mb-3">
                    <label htmlFor="pickupDate" className="form-label">Pickup Date <span className="text-danger">*</span></label>
                    <input 
                      type="date" 
                      value={formData.pickupDate}
                      className={`form-control ${errors.pickupDate ? 'is-invalid' : ''}`}
                      id="pickupDate" 
                      name="pickupDate" 
                      min={new Date().toISOString().split('T')[0]}
                      
                      onChange={handleChange}
                    />
                    {errors.pickupDate && <div className="invalid-feedback">{errors.pickupDate}</div>}
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="pickupStartTime" className="form-label">Pickup Start Time <span className="text-danger">*</span></label>
                    <input 
                      type="time" 
                      className={`form-control ${errors.pickupStartTime ? 'is-invalid' : ''}`}
                      id="pickupStartTime" 
                      name="pickupStartTime" 
                      value={formData.pickupStartTime} 
                      onChange={handleChange}
                    />
                    {errors.pickupStartTime && <div className="invalid-feedback">{errors.pickupStartTime}</div>}
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="pickupEndTime" className="form-label">Pickup End Time <span className="text-danger">*</span></label>
                    <input 
                      type="time" 
                      className={`form-control ${errors.pickupEndTime ? 'is-invalid' : ''}`}
                      id="pickupEndTime" 
                      name="pickupEndTime" 
                      value={formData.pickupEndTime} 
                      onChange={handleChange}
                    />
                    {errors.pickupEndTime && <div className="invalid-feedback">{errors.pickupEndTime}</div>}
                  </div>
                  
                  <div className="col-12 mb-3">
                    <label htmlFor="additionalInfo" className="form-label">Additional Information</label>
                    <textarea 
                      className="form-control"
                      id="additionalInfo" 
                      name="additionalInfo" 
                      placeholder="Any additional details for pickup or handling" 
                      rows="3"
                      value={formData.additionalInfo} 
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                
                <div className="row mb-4">
                  <div className="col-12">
                    <div className={`form-check ${errors.agreeToTerms ? 'is-invalid' : ''}`}>
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="agreeToTerms" 
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="agreeToTerms">
                        I confirm that this food is safe for consumption, properly stored, and complies with food safety guidelines. <span className="text-danger">*</span>
                      </label>
                      {errors.agreeToTerms && <div className="invalid-feedback">{errors.agreeToTerms}</div>}
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-12 text-end">
                    <button type="button" className="btn btn-outline-secondary me-3" onClick={() => navigate('/restaurant/dashboard')}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Preview Donation
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDonation; 