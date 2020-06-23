import React from 'react';

import docIcon from './../../assets/svg/doctor.svg';

import './DoctorSignUp.css';

class DoctorSignUp extends React.Component {
  constructor(){
    super()
    this.state = {
      first_name: '',
      last_name: '',
      qualification: '',
      docs: ''
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let body = this.state;

    try{
      let response = await fetch('https://fast-hamlet-28566.herokuapp.com/doctors/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
      })
  
      let result = await response.json();
  
      console.log(result)
    }catch(err){
      console.log(err)
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const {name,value} = event.target;
    this.setState({[name]:value})
  }

  render(){
    return (
      <div className='doc-sign-up-container'>
        <h1 className="title">Doctors Sign Up</h1>
              <img alt="doc-icon" className="doc-icon" src={docIcon}/>
              <form onSubmit={this.handleSubmit} className='doc-sign-in'>
                  <input placeholder="First Name" onChange={this.handleChange} type="text" name="first_name" value={this.state.first_name} />
                  <input placeholder="Last Name" onChange={this.handleChange} type="text" name="last_name" value={this.state.last_name}  />
                  <input placeholder="Qualifications" onChange={this.handleChange} type="text" name="qualifications" value={this.state.qualification} />
                  <input placeholder="Docs URL" onChange={this.handleChange} type="url" name="docs" value={this.state.docs}/>
                  <button className="doc-login"> Sign Up </button> 
              </form>
      </div>
    );
  }
}

export default DoctorSignUp;