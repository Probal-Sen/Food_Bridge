import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultProfilePic from '../components/DefaultProfilePic';

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
          
          // Save to localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          // Update state
          setEditedUser(updatedUser);
          setUser(updatedUser);
          
          // Dispatch profile update event
          const event = new CustomEvent('profileUpdated', { 
            detail: { user: updatedUser }
          });
          window.dispatchEvent(event);
        };
      } catch (err) {
        setError('Failed to upload image. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Here you would typically make an API call to update the user profile
      // For now, we'll just update local storage
      localStorage.setItem('user', JSON.stringify(editedUser));
      
      // Update the user state
      setUser(editedUser);
      
      // Dispatch a custom event to notify other components
      const event = new CustomEvent('profileUpdated', { 
        detail: { user: editedUser }
      });
      window.dispatchEvent(event);
      
      // Show success message
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditing(false);
      }, 2000);
      
    } catch (err) {
      setError('Failed to save changes. Please try again.');
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
                  </div>
                )}
              </div>
              
              <h5 className="fw-bold">{editedUser?.name}</h5>
              <p className="text-muted mb-0">{editedUser?.organizationName}</p>
              <p className="badge bg-primary mt-2">{editedUser?.role === 'restaurant' ? 'Restaurant' : 'NGO'}</p>
              
              <div className="border-top mt-3 pt-3">
                <p className="small text-muted mb-0">Member since</p>
                <p>{editedUser?.registeredDate || new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="list-group list-group-flush">
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <i className="fas fa-user me-3"></i> Profile Information
              </button>
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <i className="fas fa-lock me-3"></i> Security Settings
              </button>
              {editedUser?.role === 'restaurant' ? (
                <button 
                  className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'donations' ? 'active' : ''}`}
                  onClick={() => setActiveTab('donations')}
                >
                  <i className="fas fa-gift me-3"></i> Donation History
                </button>
              ) : (
                <button 
                  className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'pickups' ? 'active' : ''}`}
                  onClick={() => setActiveTab('pickups')}
                >
                  <i className="fas fa-truck me-3"></i> Pickup History
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          <div className="card border-0 shadow">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">
                {activeTab === 'profile' && 'Profile Information'}
                {activeTab === 'security' && 'Security Settings'}
                {activeTab === 'donations' && 'Donation History'}
                {activeTab === 'pickups' && 'Pickup History'}
              </h5>
              {activeTab === 'profile' && (
                <div>
                  {saveSuccess && (
                    <span className="text-success me-3">
                      <i className="fas fa-check-circle me-1"></i>
                      Changes saved successfully!
                    </span>
                  )}
                  <button 
                    className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
                    onClick={isEditing ? handleSave : handleEditToggle}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                      <i className={`fas ${isEditing ? 'fa-save' : 'fa-edit'} me-2`}></i>
                    )}
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>
              )}
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
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
                    <label className="form-label">Organization Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="organizationName"
                      value={editedUser?.organizationName || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={editedUser?.email || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={editedUser?.phone || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="3"
                    value={editedUser?.address || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-control"
                    name="bio"
                    rows="4"
                    value={editedUser?.bio || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Tell us about your organization..."
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 