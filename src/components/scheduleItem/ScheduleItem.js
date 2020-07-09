import React from 'react';
import checked from '../../assets/svg/checked.svg';
import bell from '../../assets/svg/bell.svg';
import './scheduleItem.css';

const ScheduleItem = ({ done, name, index, handleClick, time }) => {
  const icon = done ? checked : bell;
  return (
    <div className="patient-home-activity-schedule">
      <span>{time}</span>
      <span>Take 200mg of {name}</span>
      <div><img
        onClick={() => handleClick(index)}
        src={icon}
        alt={icon}
      ></img></div>
    </div>
  )
};

export default ScheduleItem;
