import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="mb-4">
            <i className="fas fa-exclamation-circle text-primary" style={{ fontSize: '5rem' }}></i>
          </div>
          <h1 className="display-1 fw-bold">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-5">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary btn-lg px-4">
            <i className="fas fa-home me-2"></i>Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 