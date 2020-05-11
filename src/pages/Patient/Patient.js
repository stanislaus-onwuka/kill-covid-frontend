import React, { Component } from 'react';
import home from './../../Assets/svg/home.svg';
import activeHome from './../../Assets/svg/active-home.svg';
import activeInfo from './../../Assets/svg/active-info.svg';
import activeMessage from './../../Assets/svg/active-message.svg';
import activeProfile from './../../Assets/svg/active-profile.svg';
import circle from './../../Assets/svg/circle.svg';
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
          <div className="dashboard-control">
            {
              this.state.page==='home'
              ? <>
                <a onClick={()=> this.onLinkClick('home')} href="#"><img src={activeHome} alt='home-icon'></img></a>
                <span><img className="circle" src={circle} alt='circle-icon'></img></span>
              </>
              : <a onClick={()=> this.onLinkClick('home')} href="#"><img src={home} alt='home-icon'></img></a>
            }
          </div>
          <div className="dashboard-control">
            {
              this.state.page==='info'
              ? <>
                <a onClick={()=> this.onLinkClick('info')} href="#"><img src={activeInfo} alt='info-icon'></img></a>
                <span><img className="circle" src={circle} alt='circle-icon'></img></span>
              </>
              : <a onClick={()=> this.onLinkClick('info')} href="#"><img src={info} alt='info-icon'></img></a>
            }
          </div>
          <div className="dashboard-control">
           {
              this.state.page==='message'
              ? <>
                <a onClick={()=> this.onLinkClick('message')} href="#"><img src={activeMessage} alt='mesage-icon'></img></a>
                <span><img className="circle" src={circle} alt='circle-icon'></img></span>
              </>
              : <a onClick={()=> this.onLinkClick('message')} href="#"><img src={message} alt='mesage-icon'></img></a>
            }
            
          </div>
          <div className="dashboard-control">
            {
              this.state.page==='profile'
              ? <>
                <a onClick={()=> this.onLinkClick('profile')} href="#"><img src={activeProfile} alt='profile-icon'></img></a>
                <span><img className="circle" src={circle} alt='circle-icon'></img></span>
              </>
              : <a onClick={()=> this.onLinkClick('profile')} href="#"><img src={profile} alt='profile-icon'></img></a>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Patient;