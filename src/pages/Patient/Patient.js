import React, { Component } from 'react';
import { connect } from 'react-redux';
import nJwt from 'njwt';

import { setCurrentUser } from './../../redux/user/user.actions';
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
      page : 'home',
      uid: '13c442d5-a926-45e4-bb4a-f219a8e913ce'
    }
  }

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // monkey patch for generation of access token
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

    const getUserData = async () => {

      let localGuides = JSON.parse(localStorage.getItem('guides'));
      let localGuideVersion = JSON.parse(localStorage.getItem('version'));

      let today = new Date();
      let currentDate = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();

      let user = null;
      let guides = null;

      const url = 'https://fast-hamlet-28566.herokuapp.com/api/getuser';
      const accessToken = generateAccessToken(this.state.uid);
      const options = {
        method: 'GET',
        headers: {
          'access-token': accessToken
        }
      };

      try {
        let response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        };
        user = await response.json();
      }
      catch(error) {
        console.error('There has been a problem fetching user data', error);
        this.setState({ user: 'error' });
        return;
      };

      if (localGuides === null || localGuideVersion !== 1) {
        guides = user.guides.map(item => {
          item.day = currentDate;
          item.previousTime = ('0' + today.getHours()).slice(-2) + ':' + ('0' + today.getMinutes()).slice(-2);
          item.nextTime = null;
          return item;
        });

        user.guides = guides;
        localStorage.setItem('guides', JSON.stringify(guides));
        localStorage.setItem('version', JSON.stringify(1)); // allows conditional updating of guides on user's local Storage
        setCurrentUser(user);
        return;
      }
      else {
        guides = JSON.parse(localStorage.getItem('guides'));
        user.guides = guides;
        setCurrentUser(user);
      };
    };

    getUserData();
  };

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
    const { currentUser } = this.props
    return(
        <div className="patient-container">
          {currentUser === null
            ? <h1 className="patient_loading-title">loading...</h1>
            : currentUser === 'error' // handle possible error when fetching user data
              ? <LoadingError />
              : <>
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Patient);
