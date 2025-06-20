import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultProfilePic from '../components/DefaultProfilePic';
import VerificationForm from '../components/VerificationForm';
import { profileService } from '../services/api';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // If new user without profile image, set default to null
      if (!parsedUser.profileImage) {
        parsedUser.profileImage = null;
      }
      setUser(parsedUser);
      setEditedUser(parsedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedUser({ ...user });
    }
    setSaveSuccess(false);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file.');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB.');
        return;
      }

      try {
        setLoading(true);
        setError('');
        
        // Convert the file to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const base64String = reader.result;
          
          // Update the user's profile image
          const updatedUser = {
            ...editedUser,
            profileImage: base64String
          };
          
          // Update state immediately for preview
          setEditedUser(updatedUser);
        };
      } catch (err) {
        setError('Failed to upload image. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveProfilePicture = async () => {
    console.log('Remove profile picture clicked');
    if (window.confirm('Are you sure you want to remove your profile picture?')) {
      try {
        console.log('User confirmed removal');
        setLoading(true);
        setError('');
        
        const updatedUser = {
          ...editedUser,
          profileImage: null
        };
        
        console.log('Sending update to backend:', updatedUser);
        
        // Immediately save to backend
        const savedUser = await profileService.updateProfile(updatedUser);
        
        console.log('Backend response:', savedUser);
        
        // Update both states with the saved data
        setEditedUser(savedUser);
        setUser(savedUser);
        
        // Show success message
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 2000);
        
      } catch (err) {
        console.error('Remove profile picture error:', err);
        setError(err.response?.data?.message || 'Failed to remove profile picture. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Use the profile service to update the profile
      const updatedUser = await profileService.updateProfile(editedUser);
      
      // Update the user state
      setUser(updatedUser);
      setEditedUser(updatedUser);
      
      // Show success message
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditing(false);
      }, 2000);
      
    } catch (err) {
      console.error('Save error:', err);
      setError(err.response?.data?.message || 'Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="container py-5">Loading...</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 mb-4 mb-lg-0">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <div className="position-relative mb-3">
                <div className="profile-picture-container">
                  {editedUser?.profileImage ? (
                    <img 
                      src={editedUser.profileImage} 
                      alt={editedUser?.name} 
                      className="profile-picture" 
                      onClick={isEditing ? handleProfilePictureClick : undefined}
                      style={{ cursor: isEditing ? 'pointer' : 'default' }}
                    />
                  ) : (
                    <div onClick={isEditing ? handleProfilePictureClick : undefined} style={{ cursor: isEditing ? 'pointer' : 'default' }}>
                      <DefaultProfilePic 
                        name={editedUser?.name || editedUser?.organizationName} 
                        size={120} 
                        fontSize={40}
                      />
                    </div>
                  )}
                  {isEditing && (
                    <div 
                      className="profile-picture-edit"
                      onClick={handleProfilePictureClick}
                    >
                      <i className="fas fa-camera"></i>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="d-none"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {loading && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <div className="mt-2">
                    <small className="text-muted">
                      Click on the image or camera icon to update your profile picture
                    </small>
                    {editedUser?.profileImage && (
                      <div className="mt-2">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={handleRemoveProfilePicture}
                        >
                          <i className="fas fa-trash me-1"></i>
                          Remove Picture
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <h5 className="fw-bold">{editedUser?.name}</h5>
              <p className="text-muted mb-2">{editedUser?.role === 'restaurant' ? 'Restaurant' : 'NGO'}</p>
              
              <div className="d-flex justify-content-center mt-3">
                {!isEditing ? (
                  <button 
                    className="btn btn-primary"
                    onClick={handleEditToggle}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-secondary"
                      onClick={handleEditToggle}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          <div className="card border-0 shadow mb-4">
            <div className="card-header bg-white border-0">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    Profile Details
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'verification' ? 'active' : ''}`}
                    onClick={() => setActiveTab('verification')}
                  >
                    Verification
                  </button>
                </li>
              </ul>
            </div>

            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {saveSuccess && (
                <div className="alert alert-success" role="alert">
                  Profile updated successfully!
                </div>
              )}

              {activeTab === 'profile' ? (
                <form>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={editedUser?.name || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={editedUser?.email || ''}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={editedUser?.phone || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editedUser?.role === 'restaurant' ? 'Restaurant' : 'NGO'}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={editedUser?.address || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={editedUser?.city || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">ZIP Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="zipCode"
                        value={editedUser?.zipCode || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {editedUser?.role === 'restaurant' && (
                    <>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Restaurant Type</label>
                          <input
                            type="text"
                            className="form-control"
                            name="restaurantType"
                            value={editedUser?.restaurantType || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Operating Hours</label>
                          <input
                            type="text"
                            className="form-control"
                            name="operatingHours"
                            value={editedUser?.operatingHours || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {editedUser?.role === 'ngo' && (
                    <>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">NGO Type</label>
                          <input
                            type="text"
                            className="form-control"
                            name="ngoType"
                            value={editedUser?.ngoType || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Service Area</label>
                          <input
                            type="text"
                            className="form-control"
                            name="serviceArea"
                            value={editedUser?.serviceArea || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Beneficiaries Served</label>
                        <input
                          type="number"
                          className="form-control"
                          name="beneficiariesServed"
                          value={editedUser?.beneficiariesServed || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </>
                  )}
                </form>
              ) : (
                <VerificationForm user={user} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 