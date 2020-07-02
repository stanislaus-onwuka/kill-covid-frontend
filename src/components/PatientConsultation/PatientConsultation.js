import React from 'react';
import nJwt from 'njwt';
import { connect } from 'react-redux';

import formatDateFromNow from '../../utils/formatDate';

import './PatientConsultation.css';
import back from './../../assets/svg/cancel.svg';

class PatientConsultation extends React.Component{
  constructor(){
    super()
    this.state = {
      agreed: false
    }
  }
  

   generateAccessToken = uid => {
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

   handleClick = async e => {
    e.preventDefault();
    document.querySelector('.agreement').classList.remove('display')
    const { userId } = this.props 
    try{
      const url = 'https://fast-hamlet-28566.herokuapp.com/api/contact_emergency';
      const accessToken = this.generateAccessToken(userId);
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

  displayAgreement = e => {
    e.preventDefault();
    document.querySelector('.agreement').classList.add('display')
    document.querySelector('.patient-consultation-container').classList.add('over')
  }

  hideAgreement = e => {
    e.preventDefault();
    document.querySelector('.agreement').classList.remove('display')
    document.querySelector('.patient-consultation-container').classList.remove('over')
  }

  onCheckboxChange = e => {
    const { name,checked } = e.target
    this.setState({[name]: checked})
  }

  render(){
    const {remarks} = this.props
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
          <button onClick={this.displayAgreement} >CONTACT EMERGENCY</button>
        </section>
  
        <section className='agreement'>
          <img onClick={this.hideAgreement} src={back} alt='previous page' />
          <div className='main'>
            <p> On ticking the checkbox below, All your info provided to us will be relayed to the NCDC and you will most likely be 
            picked up from your home to be taken to an isolation center. </p>
            <input name='agreed' value={this.state.agreed} onChange={this.onCheckboxChange} type='checkbox' id='agree' />
            <label htmlFor='agree'> I agree</label>
            {
            this.state.agreed
          ? <button onClick={this.handleClick} > Submit </button>
          : null
          }
          </div>
          
          
        </section>
  
      </div>
    );
  }

  
}

const mapStateToProps = state => ({
  userId: state.user.currentUser.user_id
})

export default connect(mapStateToProps)(PatientConsultation);
