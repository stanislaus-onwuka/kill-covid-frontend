import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lockr from 'lockr';

import { setCurrentUser, setUserGuides } from './../../redux/user/user.actions';
import home from '../../assets/svg/home.svg';
import activeHome from '../../assets/svg/active-home.svg';
import activeInfo from '../../assets/svg/active-info.svg';
import activeMessage from '../../assets/svg/active-message.svg';
import activeProfile from '../../assets/svg/active-profile.svg';
import circle from '../../assets/svg/circle.svg';
import info from '../../assets/svg/info.svg';
import message from '../../assets/svg/message.svg';
import profile from '../../assets/svg/profile.svg';
import PatientHome from '../../components/PatientHome/PatientHome';
import PatientInfo from '../../components/PatientInfo/PatientInfo';
import PatientProfile from '../../components/PatientProfile/PatientProfile';
import PatientConsultation from '../../components/PatientConsultation/PatientConsultation';
import './Patient.css';


class Patient extends Component{
  constructor(){
    super();
    this.state = {
      page : 'home',
    }
    this.currentPage = Lockr.get('page');
  }

  onLinkClick(page){
    this.setState({page});
  }
  setContent(){
    const { currentUser } = this.props
    switch(this.state.page){
      case 'home':
        return (
          <PatientHome
            firstName={currentUser.first_name}
            guides={currentUser.guides}
            med_state={currentUser.med_state}
            setUserGuides={this.props.setUserGuides}
          />
        )
      case 'info':
        return <PatientInfo />
      case 'profile':
        return (
          <PatientProfile
              firstName={currentUser.first_name}
              lastName={currentUser.last_name}
              guides={currentUser.guides}
              setUserGuides={this.props.setUserGuides}
          />
        )
      case 'consultation':
        return <PatientConsultation remarks={currentUser.remarks} />
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
    if(this.currentPage){
       this.setState({page: this.currentPage})
       this.currentPage = false
    }else{
      Lockr.set('page',this.state.page)
    }

    return(
        <div className="patient-container">
          { <>
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
            </>
          }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setUserGuides: guides => dispatch(setUserGuides(guides))
})

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
