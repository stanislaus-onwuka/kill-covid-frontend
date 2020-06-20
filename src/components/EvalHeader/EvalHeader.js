import React from 'react';
import evalIcon from '../../assets/svg/checklist.svg';
import './EvalHeader.css';

function EvalHeader(){
  return(
    <div className="evalheader-container">
      <img className="evalIcon" src={evalIcon} alt='twitter-logo'></img>
      <h1 className="evalHeader"> Evaluation </h1>
    </div>
  )
}

export default EvalHeader;
