import React from 'react';

const LoadingSpinner = ({ isSubmitting ,className}) => {
  return (
    isSubmitting ? (
      <div className={`loading-overlay ${className ? className : ''}`}>
        <div className="spinner-container">
          <div className="spinner-border custom-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
          </div>

        </div>
        {/* <span className="text-white">Loading...</span> */}
      </div>
    ) : null
  );

};

export default LoadingSpinner;
