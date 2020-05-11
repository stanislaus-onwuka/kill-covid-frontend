import React, { Component } from 'react';
import home from './../../Assets/svg/home.svg';
import info from './../../Assets/svg/info.svg';
import message from './../../Assets/svg/message.svg';
import profile from './../../Assets/svg/profile.svg';
import './Patient.css';

class Patient extends Component{
  constructor(){
    super();
    this.state = {
      page : 'home'
    }
  }

  onLinkClick(page){
    this.setState({page},()=>{
      console.log(this.state)
    });
  }

  render(){
    return(
      <div className="patient-container">

        <div className="dashboard">
          <a onClick={()=> this.onLinkClick('home')} href="#"><img src={home} alt='home-icon'></img></a>
          <a onClick={()=> this.onLinkClick('info')} href="#"><img src={info} alt='info-icon'></img></a>
          <a onClick={()=> this.onLinkClick('message')} href="#"><img src={message} alt='mesage-icon'></img></a>
          <a onClick={()=> this.onLinkClick('profile')} href="#"><img src={profile} alt='profile-icon'></img></a>
        </div>
      </div>
    );
  }
}

export default Patient;