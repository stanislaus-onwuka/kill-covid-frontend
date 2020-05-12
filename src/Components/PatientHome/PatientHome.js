import React from 'react';
import profilePic from './../../Assets/prof.png';
import temperature from './../../Assets/svg/temperature.svg';
import pressure from './../../Assets/svg/pressure.svg';
import checked from './../../Assets/svg/checked.svg';
import bell from './../../Assets/svg/bell.svg';
import happy from './../../Assets/svg/happy.svg';
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
      <section className="patient-home-activity">
        <em>Activity Schedule</em>
        <div className="patient-home-acivity-schedule-container">
          <em>WAT</em>
          <div className="patient-home-acivity-schedule">
            <span>7:00</span>
            <span>Take 200mg of Paracetamol</span>
            <img src={checked} alt="checked-icon"></img>
          </div>
          <div className="patient-home-acivity-schedule">
            <span>8:00</span>
            <span>Take 200mg of Paracetamol</span>
            <img src={checked} alt="checked-icon"></img>
          </div>
          <div className="patient-home-acivity-schedule">
            <span>9:00</span>
            <span>Take 200mg of Paracetamol</span>
            <img src={checked} alt="checked-icon"></img>
          </div>
          <div className="patient-home-acivity-schedule">
            <span>10:00</span>
            <span>Take 200mg of Paracetamol</span>
            <img src={bell} alt="checked-icon"></img>
          </div>
          <div className="patient-home-acivity-schedule">
            <span>11:00</span>
            <span>Take 200mg of Paracetamol</span>
            <img src={bell} alt="checked-icon"></img>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PatientHome;