import React, { Component } from 'react';
import userImage from './../../Assets/prof.png';
import backIcon from './../../Assets/svg/arrow-left.svg';
import ActivitySchedule from '../ActivitySchedule/ActivitySchedule';
import './PatientProfile.css';

class PatientProfile extends Component {
  constructor(){
    super();
    this.state={
      page:'home'
    }
  }

  onButtonClick(page){
    this.setState({page},()=>{
      console.log(this.state.page)
    });
  }

  setDisplay(){
    if(this.state.page==='home'){
      return(
        <div className="patient-profile-container">
          <h1>My Account</h1>
          <div className="patient-info">
            <img src={userImage} alt='patient'></img>
            <em>Paul Okoye</em>
          </div>
          <div className="quarantine">
            <div className="objective">
              <span>Quarantine</span>
              <span>Track your stay at home.</span>
            </div>
            <div className="countdown">
              <span>8</span>
              <span>Days</span>
            </div>
          </div>
          <em className="date">Started April 1.</em>
          <button onClick={()=>{ this.onButtonClick('symptom')}}> + Add Symptoms </button>
          <ActivitySchedule />
        </div>
      );
    }else{
      return <div className="patient-symptom-container">
      <img onClick={()=>{this.onButtonClick('home')}} src={backIcon} alt='back-icon'></img>
      <h1>Add Symptoms</h1>
      <div className="select-boxes">
  
        <div className='select-box'>
          <label  htmlFor="mild-cough">
            Mild Cough
            <input type="checkbox" id="mild-cough" name="mild-cough" value="mild-cough" />
            <span className="check"></span>
          </label>
        </div>

        <div className="spacing"></div>

        <div className='select-box'>
          <label  htmlFor="dry-cough">
            Dry Cough
            <input type="checkbox" id="dry-cough" name="dry-cough" value="dry-cough" />
            <span className="check"></span>
          </label>
        </div>

        <div className="spacing"></div>

        <div className='select-box'>
          <label  htmlFor="fatigue">
            Fatigue
            <input type="checkbox" id="fatigue" name="fatigue" value="fatigue" />
            <span className="check"></span>
          </label>
        </div>

        <div className="spacing"></div>

        <div className='select-box'>
          <label  htmlFor="fever">
            Fever
            <input type="checkbox" id="fever" name="fever" value="fever" />
            <span className="check"></span>
          </label>
        </div>   

        <div className="spacing"></div>         

        <div className='select-box'>
          <label  htmlFor="sore-throat">
            Sore Throat
            <input type="checkbox" id="sore-throat" name="sore-throat" value="sore-throat" />
            <span className="check"></span>
          </label>
        </div>  

        <div className="spacing"></div>

        <div className='select-box'>
          <label  htmlFor="difficulty-breathing">
            Difficulty Breathing
            <input type="checkbox" id="difficulty-breathing" name="difficulty-breathing" value="difficulty-breathing" />
            <span className="check"></span>
          </label>
        </div>  

        <button onClick={()=>{this.onButtonClick('home')}}> Submit </button>

      </div>
      
    </div>
    }
  }

  render(){
    return(
        this.setDisplay()
    );
  }
  
}

export default PatientProfile;
