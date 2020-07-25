import React from 'react';
import './LoadingError.css';
import error from '../../assets/svg/error.svg';

const LoadingError = ({ onRetry }) => {
  
  return (
    <div className="loading-error">
      <img src={error} height="100px" alt="error"/>
      <h2 className="loading-error_message">
        Sorry an error occurred while loading user data.
      </h2>
      { onRetry && 
        <button
          className="button-retry"
          onClick={onRetry}
        >
          Retry
        </button>
      }
    </div>
  )
};

export default LoadingError;
