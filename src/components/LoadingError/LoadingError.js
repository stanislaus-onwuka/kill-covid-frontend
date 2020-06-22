import React from 'react';
import './LoadingError.css';
import error from '../../assets/error.svg';

const LoadingError = () => {
  return (
    <div className="loading-error">
      <img src={error} height="100px" alt="error"/>
      <h2 className="loading-error_message">
        Sorry an error occurred when trying to get user data.
      </h2>
    </div>
  )
};

export default LoadingError;
