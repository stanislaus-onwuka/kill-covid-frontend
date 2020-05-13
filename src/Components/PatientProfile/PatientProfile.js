import React from 'react';
import userImage from './../../Assets/prof.png';
import ActivitySchedule from './../ActivitySchedule/ActivitySchedule';
import './PatientProfile.css';

const PatientProfile = () => {
  return(
    <div className="patient-profile-container">
      <h1>My Account</h1>
      <div className="patient-info">
        <img src={userImage} alt='patient-image'></img>
        <em>Paul Okoye</em>
      </div>
      <div className="quarantine">
        <div className="objective">
          <span>Quarantine</span>
          <span>Track your stay at home.</span>
        </div>
        <div className="countdown">
          <span>8</span>
          <span>Days</span>
        </div>
      </div>
      <em className="date">Started April 1.</em>
      <button> + Add Symptoms </button>
      <ActivitySchedule />
    </div>
  );
}

export default PatientProfile;