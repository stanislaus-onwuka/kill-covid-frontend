import React from 'react';
import checked from './../../Assets/svg/checked.svg';
import bell from './../../Assets/svg/bell.svg';
import './ActivitySchedule.css';

const ActivitySchedule = () => {
  return(
    <section className="patient-home-activity">
    <em>Activity Schedule</em>
    <div className="patient-home-activity-schedule-container">
      <em>WAT</em>
      <div className="patient-home-activity-schedule">
        <span>7:00</span>
        <span>Take 200mg of Paracetamol</span>
        <img src={checked} alt="checked-icon"></img>
      </div>
      <div className="patient-home-activity-schedule">
        <span>8:00</span>
        <span>Take 200mg of Paracetamol</span>
        <img src={checked} alt="checked-icon"></img>
      </div>
      <div className="patient-home-activity-schedule">
        <span>9:00</span>
        <span>Take 200mg of Paracetamol</span>
        <img src={checked} alt="checked-icon"></img>
      </div>
      <div className="patient-home-activity-schedule">
        <span>10:00</span>
        <span>Take 200mg of Paracetamol</span>
        <img src={bell} alt="checked-icon"></img>
      </div>
      <div className="patient-home-activity-schedule">
        <span>11:00</span>
        <span>Take 200mg of Paracetamol</span>
        <img src={bell} alt="checked-icon"></img>
      </div>
    </div>
  </section>
  );
}

export default ActivitySchedule;