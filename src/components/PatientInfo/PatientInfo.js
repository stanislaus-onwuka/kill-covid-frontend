import React from 'react';
import  virus from './../../assets/svg/virus.svg';
import  symptom from './../../assets/svg/symptom1.svg';
import  shield from './../../assets/svg/shield.svg';
import './PatientInfo.css';

const PatientInfo = () =>{
  return(
      <div className="patient-info-container">
        <h1>Information</h1>
        <input type="text" placeholder="What do you want to know about COVID-19?" />
        <div className="info-tab">
          <div className="img-div img-virus">
            <img src={virus} alt="virus-icon"></img>
          </div>
          <div className='text'>
            <h2>How it spreads</h2>
            <p>Learn how COVID-19 spreads</p>
          </div>
        </div>
        <div className="info-tab">
          <div className="img-div img-symptom">
            <img src={symptom} alt="symptom-icon"></img>
          </div>
          <div className='text'>
            <h2>Symptoms</h2>
            <p>Learn the symptoms of COVID-19</p>
          </div>
        </div>
        <div className="info-tab">
          <div className="img-div img-prevention">
            <img src={shield} alt="shield-icon"></img>
          </div>
          <div className='text'>
            <h2>Prevention</h2>
            <p>Learn prevention of COVID-19</p>
            </div>
        </div>
      </div>
  );
}

export default PatientInfo;
