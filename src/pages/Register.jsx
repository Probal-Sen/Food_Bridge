import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Register = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    role: 'restaurant'
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setFormData(prev => ({
      ...prev,
      role: type
    }));
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    
    if (userType === 'restaurant') {
      if (!formData.restaurantType) newErrors.restaurantType = "Restaurant type is required";
      if (!formData.operatingHours) newErrors.operatingHours = "Operating hours are required";
    } else if (userType === 'ngo') {
      if (!formData.ngoType) newErrors.ngoType = "Organization type is required";
      if (!formData.serviceArea) newErrors.serviceArea = "Service area is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setUserType('');
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;
    setLoading(true);
    try {
      const { confirmPassword, ...registrationData } = formData;
      console.log('Sending registration data:', registrationData);
      
      const response = await authService.register(registrationData);
      console.log('Registration response:', response);
      
      const user = response.user;
      if (user.role === 'restaurant') {
        navigate('/restaurant/dashboard');
      } else if (user.role === 'ngo') {
        navigate('/ngo/dashboard');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ 
        form: err.response?.data?.message || err.message || 'Registration failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Choose user type
  if (step === 1) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-header bg-primary text-white text-center py-3">
                <h3 className="font-weight-light my-2">Create an Account</h3>
              </div>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h4>I want to register as:</h4>
                </div>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div 
                      className="card h-100 border-primary cursor-pointer user-select-none" 
                      onClick={() => handleUserTypeSelect('restaurant')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body text-center p-5">
                        <i className="fas fa-utensils fa-3x mb-3 text-primary"></i>
                        <h5 className="card-title">Restaurant</h5>
                        <p className="card-text small">Register your restaurant to donate excess food</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div 
                      className="card h-100 border-primary cursor-pointer user-select-none" 
                      onClick={() => handleUserTypeSelect('ngo')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body text-center p-5">
                        <i className="fas fa-hands-helping fa-3x mb-3 text-primary"></i>
                        <h5 className="card-title">NGO</h5>
                        <p className="card-text small">Register your NGO to receive food donations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center py-3">
                <div className="small">
                  Already have an account? <Link to="/login" className="text-decoration-none">Sign in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Basic Information
  if (step === 2) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-header bg-primary text-white text-center py-3">
                <h3 className="font-weight-light my-2">
                  {userType === 'restaurant' ? 'Restaurant Registration' : 'NGO Registration'}
                </h3>
                <div className="small text-white">Step 1 of 2: Account Information</div>
              </div>
              <div className="card-body p-4">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      {userType === 'restaurant' ? 'Restaurant Name' : 'Organization Name'}
                    </label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input 
                        type="password" 
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input 
                        type="password" 
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                      />
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-outline-secondary" onClick={handleBack}>
                      Back
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Additional Information
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center py-3">
              <h3 className="font-weight-light my-2">
                {userType === 'restaurant' ? 'Restaurant Registration' : 'NGO Registration'}
              </h3>
              <div className="small text-white">Step 2 of 2: Additional Information</div>
            </div>
            <div className="card-body p-4">
              {errors.form && (
                <div className="alert alert-danger" role="alert">
                  {errors.form}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="zipCode" className="form-label">ZIP Code</label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                      id="zipCode" 
                      name="zipCode" 
                      value={formData.zipCode} 
                      onChange={handleChange} 
                    />
                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    id="city" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange} 
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>
                
                {userType === 'restaurant' && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="restaurantType" className="form-label">Restaurant Type</label>
                      <select 
                        className={`form-select ${errors.restaurantType ? 'is-invalid' : ''}`}
                        id="restaurantType" 
                        name="restaurantType" 
                        value={formData.restaurantType} 
                        onChange={handleChange}
                      >
                        <option value="">-- Select Restaurant Type --</option>
                        <option value="fastFood">Fast Food</option>
                        <option value="casual">Casual Dining</option>
                        <option value="fineDining">Fine Dining</option>
                        <option value="cafe">Café</option>
                        <option value="buffet">Buffet</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.restaurantType && <div className="invalid-feedback">{errors.restaurantType}</div>}
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="operatingHours" className="form-label">Operating Hours</label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.operatingHours ? 'is-invalid' : ''}`}
                        id="operatingHours" 
                        name="operatingHours"
                        placeholder="e.g. Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-11PM" 
                        value={formData.operatingHours} 
                        onChange={handleChange} 
                      />
                      {errors.operatingHours && <div className="invalid-feedback">{errors.operatingHours}</div>}
                    </div>
                  </>
                )}
                
                {userType === 'ngo' && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="ngoType" className="form-label">Organization Type</label>
                      <select 
                        className={`form-select ${errors.ngoType ? 'is-invalid' : ''}`}
                        id="ngoType" 
                        name="ngoType" 
                        value={formData.ngoType} 
                        onChange={handleChange}
                      >
                        <option value="">-- Select Organization Type --</option>
                        <option value="foodBank">Food Bank</option>
                        <option value="shelter">Shelter</option>
                        <option value="communityKitchen">Community Kitchen</option>
                        <option value="religiousOrg">Religious Organization</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.ngoType && <div className="invalid-feedback">{errors.ngoType}</div>}
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="serviceArea" className="form-label">Service Area (km radius)</label>
                      <select 
                        className={`form-select ${errors.serviceArea ? 'is-invalid' : ''}`}
                        id="serviceArea" 
                        name="serviceArea" 
                        value={formData.serviceArea} 
                        onChange={handleChange}
                      >
                        <option value="">-- Select Service Area --</option>
                        <option value="5">Up to 5 km</option>
                        <option value="10">Up to 10 km</option>
                        <option value="15">Up to 15 km</option>
                        <option value="20">Up to 20 km</option>
                        <option value="25">Up to 25 km</option>
                      </select>
                      {errors.serviceArea && <div className="invalid-feedback">{errors.serviceArea}</div>}
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="beneficiariesServed" className="form-label">Number of Beneficiaries Served (Daily)</label>
                      <input 
                        type="number" 
                        className="form-control"
                        id="beneficiariesServed" 
                        name="beneficiariesServed" 
                        value={formData.beneficiariesServed} 
                        onChange={handleChange} 
                      />
                    </div>
                  </>
                )}
                
                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-outline-secondary" onClick={handleBack}>
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registering...
                      </>
                    ) : 'Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 