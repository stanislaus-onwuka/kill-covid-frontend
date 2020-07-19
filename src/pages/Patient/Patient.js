import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lockr from 'lockr';
import format from 'date-fns/format';

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
import LoadingError from '../../components/LoadingError/LoadingError';
import './Patient.css';


class Patient extends Component{
  constructor(){
    super();
    this.state = {
      page : 'home',
      fetchFail: false
    }
    this.currentPage = Lockr.get('page');
  }

  loadUser = async () => {
    const {
      history,
      setCurrentUser,
      currentUser,
      setUserGuides,
      accessToken
    } = this.props;

    let user = null;
    let remoteGuides = null;

    const url = 'https://fast-hamlet-28566.herokuapp.com/api/getuser';
    const options = {
      method: 'GET',
      headers: {
        'access-token': accessToken
      }
    };

    try {
      let response = await fetch(url, options);

      if (response.status === 404) {
        history.push('/');
        return;
      };
      if (!response.ok) {
        throw new Error('Network response was not ok');
      };

      user = await response.json();
      if (user.age === "") {
        history.push('/Eval');
        return;
      }

      remoteGuides = user.guides;
      //the remarks in the user above have no doctor name, so fetch the remarks with doctor name and append to user
      let remarks = await fetch('https://fast-hamlet-28566.herokuapp.com/api/getremarks', options);
      remarks = await remarks.json();
      user.remarks = remarks;
    }
    catch(error) {
      console.error('There has been a problem fetching user data', error);
      this.setState({ fetchFail: true });
      return;
    }
    finally{
      let localGuides = currentUser === null
        ? null
        : currentUser.guides;
      let updateGuides = false;
      let newGuides = null;

      // replace persisted guides if required
      if (user && !localGuides) {
        updateGuides = true;
        newGuides = remoteGuides.map(item => {
          item.previousTime = format(new Date(), "hh:mm");
          return item;
        });
      }
      else if (user && (localGuides.length !== remoteGuides.length)) {
        updateGuides = true;
        newGuides = remoteGuides.map(remoteGuideItem => {
          // initialize values for new user guides
          let match = localGuides.find(localGuideItem => localGuideItem.name === remoteGuideItem.name);

          if (match === undefined) {
            remoteGuideItem.previousTime = format(new Date(), "hh:mm");
            return remoteGuideItem;
          };
          return match;
        });
      };

      if (
        (currentUser.additionalUserInfo && user) ||
        (currentUser === null && user)
      ) {
        user.guides = newGuides;
        setCurrentUser(user);
      } else if (updateGuides) {
        setUserGuides(newGuides)
      };
    };
  };

  onLinkClick = (page) => {
    this.setState({page});
  }

  setContent(){
    const { currentUser, setCurrentUser, history } = this.props

    switch(this.state.page){
      case 'home':
        return (
          <PatientHome
            firstName={currentUser.first_name}
            guides={currentUser.guides}
            med_state={currentUser.med_state}
            setUserGuides={this.props.setUserGuides}
            setCurrentUser={setCurrentUser}
            history={history}
            changePage={this.onLinkClick}
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

  componentDidMount() {
    this.loadUser();
  }

  render(){
    const { currentUser } = this.props;
    const { fetchFail } = this.state;

    if(this.currentPage){
       this.setState({page: this.currentPage})
       this.currentPage = false
    }else{
      Lockr.set('page',this.state.page)
    }

    return(
        <div className="patient-container">
          { fetchFail && !currentUser.guides
            ? <LoadingError />
            : !currentUser.guides
              ? <h1 className="loading">loading...</h1>
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
  currentUser: state.user.currentUser,
  accessToken: state.user.accessToken
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setUserGuides: guides => dispatch(setUserGuides(guides))
})

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
