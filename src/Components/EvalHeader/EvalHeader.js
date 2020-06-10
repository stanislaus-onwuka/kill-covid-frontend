import React from './node_modules/react';
import evalIcon from '../../Assets/svg/checklist.svg';
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