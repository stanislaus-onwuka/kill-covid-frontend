import React from 'react';
import './PatientConsultation.css';
import formatDateFromNow from '../../utils/formatDate';

const PatientConsultation =({remarks})=>{
  return(
    <div className="patient-consultation-container">
      <h1>Consultations</h1>
      <em>Recent Doctor's Notes</em>
      {!remarks.length && 
        <div className='consult-box'>
          <p>No Remarks yet</p>
        </div>
      }
      {remarks.map(remark => {
        let formattedDate = formatDateFromNow(remark.date_created);
        console.log(formattedDate)
        formattedDate = +formattedDate.split(' ')[0] === 1 ? formattedDate : formattedDate + 's';
        return (
         <div key={remark.id} className='consult-box'>
          <div className='header'>
            <em> {remark.first_name + ' ' + remark.last_name} </em>
            <em> {formattedDate} ago</em>
          </div>
          <p>{remark.content}</p>
        </div> 
        )
      })}
      <section className='emergency'>
        <em> In the event of unexpected symptoms</em>
        <button>CONTACT EMERGENCY</button>
      </section>

    </div>
  );
}

export default PatientConsultation;
