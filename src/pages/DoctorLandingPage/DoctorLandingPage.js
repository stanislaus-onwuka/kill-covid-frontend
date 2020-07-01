import React from 'react';
import { connect } from 'react-redux';

import { setCurrentDoctor } from './../../redux/doctor/doctor.actions'
import docIcon from './../../assets/svg/doctor.svg';
import "./DoctorLandingPage.css";

class DoctorLandingPage extends React.Component {
    constructor(){
        super()
        this.state = {
            doc_pass: 'Big001'
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        let body = this.state;
        const {history: { push }, setCurrentDoctor } = this.props
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkb2NfaWQiOiI4ODM4YmJjOC1jYThjLTQ4YzctYTZkZi03ZDc3NDY3ZWQ0NWUiLCJleHAiOjE1OTI0MzYwMDJ9.VMTxy1kPmYkV-lyItudkL_5s3RLY_dUaOHq4Kl5-lw0'

    try{
      let response = await fetch('https://fast-hamlet-28566.herokuapp.com/doctors/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'doc-access-token': token
        },
        body: JSON.stringify(body)
      })
  
      let result = await response.json();
      
      if(result.uid){
        setCurrentDoctor(result.uid);
        push('/doctor/home')
      }
    }catch(err){
      console.log(err)
    }
    };

    handleChange = event => {
        event.preventDefault();
        const {name,value} = event.target;
        this.setState({[name]:value})
    }

    render() {   
        return(
            <div className="doc-landing-page">
                <h1 className="title">Doctors Sign In</h1>
                <img alt="doc-icon" className="doc-icon" src={docIcon}/>
                <form className='doc-sign-in' onSubmit={this.handleSubmit}>
                    <input placeholder="Doctor ID" onChange={this.handleChange} type="text" name="doc_pass" value={this.state.doc_pass} />
                    <button className="doc-login"> Sign in </button> 
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
  setCurrentDoctor:  doctor => dispatch(setCurrentDoctor(doctor))
})

export default connect(
  null,
  mapDispatchToProps
  )(DoctorLandingPage);
