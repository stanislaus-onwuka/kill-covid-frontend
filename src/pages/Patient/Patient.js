import React, { Component } from 'react';
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
import LoadingError from '../../components/LoadingError/LoadingError';
import './Patient.css';


class Patient extends Component{
  constructor(){
    super();
    this.state = {
      user: null,
      page : 'home',
      accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTkyNTY2ODc3LCJleHAiOjE1OTI1OTE4ODQsInVpZCI6IjQzZTcwYmQ3LTg1ZTEtNGRmYi1hNjMzLWExMzVhNDJmYTYxZCIsImp0aSI6Ijg2NjJkYmRmLTI3Y2MtNDMxMy04MGZhLTc2NmI3OGMyN2E4YSJ9.JuWEDh9fk-cMW6EGW8qUNYaE1-B4ncDNK7fFFim5rF8'
    }
  }

  componentDidMount() {
    const url = 'https://fast-hamlet-28566.herokuapp.com/api/getuser';
    fetch(url, {
      method: 'GET',
      headers: {
        'access-token': this.state.accessToken
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => this.setState({ user: data }))
      .catch(error => {
        this.setState({ user: 'error' })
        console.error('There has been a problem fetching user data', error)
      });
  };

  onLinkClick(page){
    this.setState({page});
  }
  setContent(){
    switch(this.state.page){
      case 'home':
        return (
          <PatientHome
            firstName={this.state.user.first_name}
          />
        )
      case 'info':
        return <PatientInfo />
      case 'profile':
        return (
          <PatientProfile
              firstName={this.state.user.first_name}
              lastName={this.state.user.last_name}
          />
        )
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
          {this.state.user === null
            ? <h1 className="patient_loading-title">getting user data...</h1>
            : this.state.user === 'error' // handle possible error when fetching user data
              ? <LoadingError />
              : <Fragment>
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
                </Fragment>
          }
        </div>
    );
  }
}

export default Patient;
