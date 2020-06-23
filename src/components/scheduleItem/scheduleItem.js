import React from 'react';
import checked from '../../assets/svg/checked.svg';
import bell from '../../assets/svg/bell.svg';
import './scheduleItem.css';

const scheduleItem = ({ done, info, index, handleClick }) => {
  const icon = done ? checked : bell;
  return (
    <div className="patient-home-activity-schedule">
      <span>{`${9+index}:00`}</span>
      <span>Take 200mg of {info}</span>
      <div><img
        onClick={() => handleClick(index)}
        src={icon}
        alt={icon}
      ></img></div>
    </div>
  )
};

export default scheduleItem;
