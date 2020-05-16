import React,{ Component } from 'react';
import profilePic from './../../Assets/prof.png';
import temperature from './../../Assets/svg/temperature.svg';
import pressure from './../../Assets/svg/pressure.svg';
import happy from './../../Assets/svg/happy.svg';
import backIcon from './../../Assets/svg/arrow-left.svg';
import graph from './../../Assets/graph.png';
import ActivitySchedule from './../ActivitySchedule/ActivitySchedule';
import './PatientHome.css';


class PatientHome extends Component {
  constructor(){
    super();
    this.state={
      page:'home',
      recordPage:'temp'
    }
  }
  setDisplay(){
    if(this.state.page==='home'){
      return(
        <div className='patient-home-container'>
          <div className="patient-home-profile">
            <em> Welcome Paul,</em>
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
              <div className="patient-home-body-pressure">
              <img src={pressure} alt="temperature-icon"></img>
              <span className='text'>Body Pressure</span>
              <span className='pressure'>80/130mmHg</span>
              </div>
              {/* eslint-disable-next-line */}
              <a onClick={()=>{this.onButtonClick('records')}} href='#'>Update records</a>
              <div className="patient-home-indication-box">
                <img src={happy} alt="happy-face"></img>
                <div className='text'>
                  <em>Okay</em>
                  <p>So far your records indicate you're in a mild condition.<span> Please stay calm and follow your routine.</span> </p>
                </div>
              </div>
            </div>
          </section>
          <ActivitySchedule />
        </div>
      );
    } else if(this.state.page === 'records'){
      return <div className="patient-record-container">
      <img onClick={()=>{this.onButtonClick('home')}} src={backIcon} alt='back-icon'></img>
      <h1>Records</h1>
      <div className='switch-btn'>
        <button onClick={(e)=>{this.onSwitchBtnClick('temp',e)}} className='temp active'>Body Temperature</button>
        <button onClick={(e)=>{this.onSwitchBtnClick('pressure',e)}} className='pressure inactive'>Body Pressure</button>
      </div>
      <div className='current-record'>
      {
        this.state.recordPage ==='temp'
        ?<>
          <em>Today's Temperature </em>
          <em>37.7&deg;</em>
        </>
        : <>
          <em>Today's Pressure</em>
          <em>80/130 mmHg</em>
        </>
      }
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
    this.setState({page},()=>{
      console.log(this.state.page)
    })
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