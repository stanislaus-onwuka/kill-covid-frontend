import React from 'react';
import profilePic from './../../Assets/prof.png';
import temperature from './../../Assets/svg/temperature.svg';
import pressure from './../../Assets/svg/pressure.svg';
import happy from './../../Assets/svg/happy.svg';
import ActivitySchedule from './../ActivitySchedule/ActivitySchedule';
import './PatientHome.css'

const PatientHome = () => {
  return(
    <div className='patient-home-container'>
      <div className="patient-home-profile">
        <em> Welcome Paul,</em>
        <img src={profilePic} alt="patient-image"></img>
      </div>
      <section className="patient-home-records-container">
        <em>Here is our most recent record of you.</em>
        <div className="patient-home-records">
          <div className="patient-home-body-temp">
          <img src={temperature} alt="temperature-icon"></img>
          <span className='text'>Body Temperature</span>
          <span className='temp'>37.7&deg;</span>
          </div>
          <div className="patient-home-body-pressure">
          <img src={pressure} alt="temperature-icon"></img>
          <span className='text'>Body Pressure</span>
          <span className='pressure'>80/130mmHg</span>
          </div>
          <a href="#">Update records</a>
          <div className="patient-home-indication-box">
            <img src={happy} alt="happy-face"></img>
            <div className='text'>
              <em>Okay</em>
              <p>So far your records indicate you're in a mild condition.<span> Please stay calm and follow your routine.</span> </p>
            </div>
          </div>
        </div>
      </section>
      <ActivitySchedule />
    </div>
  );
}

export default PatientHome;