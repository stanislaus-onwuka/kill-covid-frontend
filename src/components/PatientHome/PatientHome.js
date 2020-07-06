import React,{ Component } from 'react';
import profilePic from './../../assets/prof.png';
import temperature from './../../assets/svg/temperature.svg';
import happy from './../../assets/svg/happy.svg';
import alert from './../../assets/svg/alert.svg';
import backIcon from './../../assets/svg/arrow-left.svg';
import graph from './../../assets/graph.png';
import ActivitySchedule from '../ActivitySchedule/ActivitySchedule';
import './PatientHome.css';


class PatientHome extends Component {
  constructor(props){
    super(props);
    this.state={
      page:'home'
    }
  }

  setDisplay(){
    const { med_state } = this.props
    if(this.state.page==='home'){
      return(
        <>
          <div className='patient-home-container'>
          <div className="patient-home-profile">
            <em> Welcome {this.props.firstName},</em>
            <div>
              <img src={profilePic} alt="patient"></img>
            </div>
          </div>
          <section className="patient-home-records-container">
            <em>Here is our most recent record of you.</em>
            <div className="patient-home-records">
              <div className="patient-home-body-temp">
              <img src={temperature} alt="temperature-icon"></img>
              <span className='text'>Body Temperature</span>
              <span className='temp'>37.7&deg;</span>
              </div>
              {
                med_state === 'Mild'
              ? <div className="patient-home-indication-box">
                  <img src={happy} alt="happy-face"></img>
                  <div className='text'>
                    <em>Okay</em>
                    <p>So far your records indicate you're in a mild condition.<span> Please stay calm and follow your routine.</span> </p>
                  </div>
                </div>
              : <div className="patient-home-indication-box critical">
                  <img src={alert} alt="happy-face"></img>
                  <div className='text'>
                    <em>Critical</em>
                    <p>The state of things are getting too bad.<span> The doctor advises you to use the emergency button.</span> </p>
                  </div>
                </div>
              }
            </div>
          </section>
          <ActivitySchedule guides={this.props.guides} setUserGuides={this.props.setUserGuides}/>
        </div>
        </>
      );
    } else if(this.state.page === 'records'){
      return <div className="patient-record-container">
      <img onClick={()=>{this.onButtonClick('home')}} src={backIcon} alt='back-icon'></img>
      <h1>Records</h1>

      <div className='current-record'>
          <em>Today's Temperature </em>
          <em>37.7&deg;</em>
      </div>
      <div className='graph-container'>
        <img className='graph' src={graph} alt='graph'></img>
        <ul className='days'>
          <li>01/04</li>
          <li>02/04</li>
          <li>03/04</li>
          <li>04/04</li>
          <li>05/04</li>
        </ul>
      </div>
  </div>
    }
  }

  onButtonClick(page){
    this.setState({page})
  }

  onSwitchBtnClick(recordPage,event){
    event.preventDefault();
    this.setState({recordPage});
        document.querySelector('.active').classList.add('inactive');
        document.querySelector('.active').classList.remove('active');
				event.target.classList.add('active');
  }


  render(){
    return this.setDisplay();
  }
}

export default PatientHome;
