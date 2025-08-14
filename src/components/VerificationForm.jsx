import React, { useState, useEffect } from 'react';
import { verificationService, API_URL } from '../services/api';

const VerificationForm = ({ user }) => {
  const [verificationNumber, setVerificationNumber] = useState('');
  const [verificationExpiry, setVerificationExpiry] = useState('');
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Base URL for accessing uploaded documents (strip trailing /api from API_URL)
  const FILE_BASE_URL = (API_URL || '').replace(/\/api$/, '');

  useEffect(() => {
    // Fetch current verification status
    const fetchStatus = async () => {
      try {
        const response = await verificationService.getVerificationStatus();
        setStatus(response);
        setVerificationNumber(response.verificationNumber || '');
        setVerificationExpiry(response.verificationExpiry ? new Date(response.verificationExpiry).toISOString().split('T')[0] : '');
      } catch (error) {
        console.error('Error fetching verification status:', error);
        setError('Failed to fetch verification status. Please try again later.');
      }
    };

    fetchStatus();
  }, []);

  const validateForm = () => {
    const errors = [];
    if (!verificationNumber.trim()) {
      errors.push('Verification number is required');
    }
    if (!verificationExpiry) {
      errors.push('Expiry date is required');
    }
    if (!document && !status?.verificationDocument) {
      errors.push('Please upload a verification document');
    }
    if (document && document.size > 5 * 1024 * 1024) {
      errors.push('File size should be less than 5MB');
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      if (document) {
        formData.append('verificationDocument', document);
      }
      formData.append('verificationNumber', verificationNumber);
      formData.append('verificationExpiry', verificationExpiry);

      const response = await verificationService.submitVerification(formData);
      setStatus(response);
      setIsEditing(false);
      alert('Verification documents submitted successfully!');
    } catch (error) {
      console.error('Error submitting verification:', error);
      setError(error.response?.data?.message || 'Error submitting verification documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getVerificationLabel = () => {
    return user.role === 'restaurant' ? 'FSSAI License Number' : 'NGO Registration Number';
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        e.target.value = '';
        return;
      }
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        setError('Only PDF and image files (JPG, PNG) are allowed');
        e.target.value = '';
        return;
      }
      setDocument(file);
      setError('');
    }
  };

  const getStatusBadge = () => {
    const statusMap = {
      pending: { bg: 'bg-warning', text: 'Pending Review' },
      verified: { bg: 'bg-success', text: 'Verified' },
      rejected: { bg: 'bg-danger', text: 'Rejected' }
    };

    const currentStatus = status?.verificationStatus || 'pending';
    return (
      <span className={`badge ${statusMap[currentStatus].bg}`}>
        {statusMap[currentStatus].text}
      </span>
    );
  };

  const handleViewDocument = () => {
    if (status?.verificationDocument) {
      const documentUrl = `${FILE_BASE_URL}/${status.verificationDocument}`;
      console.log('Opening document URL:', documentUrl);
      window.open(documentUrl, '_blank');
    }
  };

  return (
    <div className="card h-100 border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title mb-0">Verification Details</h5>
          {!isEditing && (
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleEditToggle}
              disabled={loading}
            >
              {status?.verificationStatus === 'pending' ? 'Update Details' : 'Submit Documents'}
            </button>
          )}
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">{getVerificationLabel()}</label>
              <input
                type="text"
                className="form-control"
                value={verificationNumber}
                onChange={(e) => setVerificationNumber(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Document Expiry Date</label>
              <input
                type="date"
                className="form-control"
                value={verificationExpiry}
                onChange={(e) => setVerificationExpiry(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Verification Status</label>
            <div className="form-control bg-light">
              {getStatusBadge()}
              {status?.verificationStatus === 'rejected' && (
                <small className="d-block text-danger mt-1">
                  Reason: {status.verificationRejectionReason}
                </small>
              )}
            </div>
          </div>

          {status?.verificationDocument && !isEditing && (
            <div className="mb-3">
              <label className="form-label">Current Document</label>
              <div className="form-control bg-light">
                <button
                  type="button"
                  onClick={handleViewDocument}
                  className="btn btn-link text-primary text-decoration-none p-0"
                >
                  <i className="fas fa-file-alt me-2"></i>
                  View Current Document
                </button>
              </div>
            </div>
          )}

          {isEditing && (
            <div className="mb-3">
              <label className="form-label">
                Upload {user.role === 'restaurant' ? 'FSSAI License' : 'NGO Registration Certificate'}
              </label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept=".pdf,image/*"
              />
              <div className="form-text">
                Maximum file size: 5MB. Accepted formats: PDF, JPG, PNG
              </div>
            </div>
          )}

          {isEditing && (
            <div className="d-flex gap-2 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleEditToggle}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : 'Submit Documents'}
              </button>
            </div>
          )}
        </form>

        {status?.verificationStatus === 'verified' && (
          <div className="alert alert-success mt-3" role="alert">
            <i className="fas fa-check-circle me-2"></i>
            Your {user.role === 'restaurant' ? 'FSSAI License' : 'NGO Registration'} has been verified.
            <br />
            <small>
              Valid until: {new Date(status.verificationExpiry).toLocaleDateString()}
            </small>
          </div>
        )}

        {status?.verificationStatus === 'pending' && (
          <div className="alert alert-warning mt-3" role="alert">
            <i className="fas fa-clock me-2"></i>
            Your verification documents are being reviewed. We'll notify you once the review is complete.
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationForm; 