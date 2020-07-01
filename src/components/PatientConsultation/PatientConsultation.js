import React from 'react';
import nJwt from 'njwt';
import { connect } from 'react-redux';

import formatDateFromNow from '../../utils/formatDate';

import './PatientConsultation.css';




const PatientConsultation =(props)=>{
  const {remarks,userId} = props

  const generateAccessToken = uid => {
    let claims = {
     "sub": "1234567890",
     "iat": 1592737638,
     "exp": 1592741238,
     "uid": uid
    };
    let jwt = nJwt.create(claims, "secret", "HS256");
    let token = jwt.compact();
    return token;
  };

  

  const handleClick = async e => {
    e.preventDefault();

    try{
      const url = 'https://fast-hamlet-28566.herokuapp.com/api/contact_emergency';
      const accessToken = generateAccessToken(userId);
      const options = {
        method: 'GET',
        headers: {
          'access-token': accessToken
        }
      };
      let response = await fetch(url,options);
      console.log(response)
      let result = await response.json();
      console.log(result)
    }catch(err){
      console.log(err)
    }
    
  }

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
            <em> Doctor's name </em>
            <em> {formattedDate} ago</em>
          </div>
          <p>{remark.content}</p>
        </div> 
        )
      })}
      <section className='emergency'>
        <em> In the event of unexpected symptoms</em>
        <button onClick={handleClick}>CONTACT EMERGENCY</button>
      </section>

    </div>
  );
}

const mapStateToProps = state => ({
  userId: state.user.currentUser.user_id
})

export default connect(mapStateToProps)(PatientConsultation);
