import React, { Component } from 'react';
import home from '../../Assets/svg/home.svg';
import activeHome from '../../Assets/svg/active-home.svg';
import activeInfo from '../../Assets/svg/active-info.svg';
import activeMessage from '../../Assets/svg/active-message.svg';
import activeProfile from '../../Assets/svg/active-profile.svg';
import circle from '../../Assets/svg/circle.svg';
import info from '../../Assets/svg/info.svg';
import message from '../../Assets/svg/message.svg';
import profile from '../../Assets/svg/profile.svg';
import PatientHome from '../../components/PatientHome/PatientHome';
import PatientInfo from '../../components/PatientInfo/PatientInfo';
import PatientProfile from '../../components/PatientProfile/PatientProfile';
import PatientConsultation from '../../components/PatientConsultation/PatientConsultation';
import './Patient.css';


class Patient extends Component{
  constructor(){
    super();
    this.state = {
      page : 'home'
    }
  }

  onLinkClick(page){
    this.setState({page});
  }
  setContent(){
    switch(this.state.page){
      case 'home':
        return <PatientHome />
      case 'info':
        return <PatientInfo />
      case 'profile':
        return <PatientProfile />
      case 'consultation':
        return <PatientConsultation />
      default:
        return <>
          I have not been set yet
        </>
    }
  }
  setDashboard(pageName,activeIcon,inactiveIcon){
    if(this.state.page===pageName){
      return <>
        {/* eslint-disable-next-line */}
        <a onClick={()=> this.onLinkClick(pageName)} href="#"><img src={activeIcon} alt='home-icon'></img></a>
        <span><img className="circle" src={circle} alt='circle-icon'></img></span>
      </>
    }
    else{
     return <>
     {/* eslint-disable-next-line */}
     <a onClick={()=> this.onLinkClick(pageName)} href="#"><img src={inactiveIcon} alt='home-icon'></img></a>
     </>
    }
  }

  render(){
    return(
      <div className="patient-container">
        {this.setContent()}
        <div className="spacing"></div>
        <div className="dashboard">
          <div className="dashboard-control">
            { this.setDashboard('home',activeHome,home) }
          </div>
          <div className="dashboard-control">
            { this.setDashboard('info',activeInfo,info) }
          </div>
          <div className="dashboard-control">
            { this.setDashboard('consultation',activeMessage,message) }
          </div>
          <div className="dashboard-control">
            { this.setDashboard('profile',activeProfile,profile) }
          </div>
        </div>
      </div>
    );
  }
}

export default Patient;