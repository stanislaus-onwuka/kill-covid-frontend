import React from 'react';
import './PatientConsultation.css';

const PatientConsultation =()=>{
  return(
    <div className="patient-consultation-container">
      <h1>Consultations</h1>
      <em>Recent Doctor's Notes</em>

      <div className='consult-box'>
        <div className='header'>
          <em> Dr. Emmanuel James</em>
          <em> Now </em>
        </div>
        <p>Princess TRICKSTER possesses cryokinetic magic, often using it to play with her younger sister, HERO. </p>
      </div>

      <div className='consult-box'>
        <div className='header'>
          <em> Dr. Emmanuel James</em>
          <em> 2 weeks ago</em>
        </div>
        <p>Princess TRICKSTER possesses cryokinetic magic, often using it to play with her younger sister, HERO. </p>
      </div>

      <div className='consult-box'>
        <div className='header'>
          <em> Dr. Emmanuel James</em>
          <em> 4 weeks ago</em>
        </div>
        <p>Princess TRICKSTER possesses cryokinetic magic, often using it to play with her younger sister, HERO. </p>
      </div>

      <section className='emergency'>
        <em> In the event of unexpected symptoms</em>
        <button>CONTACT EMERGENCY</button>
      </section>

    </div>
  );
}

export default PatientConsultation;