import React from 'react';
import checked from './../../assets/svg/checked.svg';
import bell from './../../assets/svg/bell.svg';
import './ActivitySchedule.css';

class ActivitySchedule extends React.Component{
  constructor(){
    super();
    this.state= {
      item1: true,
      item2: true,
      item3: true,
      item4: false,
      item5: false,
    }
  }

  handleClick = (event) => {
    const item = event.target.alt
    this.setState(prevState => ({
      [item]: !prevState[[item]]
    }));
  }

  render(){
    const {item1, item2, item3, item4, item5} = this.state;
    return(
      <section className="patient-home-activity">
      <em>Activity Schedule</em>
      <div className="patient-home-activity-schedule-container">
        <em>WAT</em>
        <div className="patient-home-activity-schedule">
          <span>7:00</span>
          <span>Take 200mg of Paracetamol</span>
          <div ><img 
          onClick={this.handleClick}
          src={
            item1
            ? checked
            : bell
          } 
          alt="item1"></img></div>
        </div>
        <div className="patient-home-activity-schedule">
          <span>8:00</span>
          <span>Take 200mg of Paracetamol</span>
          <div><img 
          onClick={this.handleClick}
          src={
            item2
            ? checked
            : bell
          } 
          alt="item2"></img></div>
        </div>
        <div className="patient-home-activity-schedule">
          <span>9:00</span>
          <span>Take 200mg of Paracetamol</span>
          <div><img  
          onClick={this.handleClick}
          src={
            item3
            ? checked
            : bell
          } 
          alt="item3"></img></div>
        </div>
        <div className="patient-home-activity-schedule">
          <span>10:00</span>
          <span>Take 200mg of Paracetamol</span>
          <div><img  
          onClick={this.handleClick}
          src={
            item4
            ? checked
            : bell
          } 
          alt="item4"></img></div>
        </div>
        <div className="patient-home-activity-schedule">
          <span>11:00</span>
          <span>Take 200mg of Paracetamol</span>
          <div><img  
          onClick={this.handleClick}
          src={
            item5
            ? checked
            : bell
          } 
          alt="item5"></img></div>
        </div>
      </div>
    </section>
    );
  }
}

export default ActivitySchedule;
