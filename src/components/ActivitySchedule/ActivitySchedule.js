import React from 'react';
import ScheduleItem from './../scheduleItem/scheduleItem';
import './ActivitySchedule.css';

class ActivitySchedule extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      guides: this.props.guides
    }
  }

  handleClick = (index) => {
    let newGuides = [...this.state.guides];
    newGuides[index] = {...newGuides[index], done: !newGuides[index].done };
    this.setState({ guides: newGuides });
  };

  render(){
    return(
      <section className="patient-home-activity">
      <em>Activity Schedule</em>
      <div className="patient-home-activity-schedule-container">
        <em>WAT</em>
        {
          this.state.guides.map((item, index) => (
            <ScheduleItem {...item}
              key={index}
              index={index}
              handleClick={this.handleClick}
            />
          ))
        }
      </div>
    </section>
    );
  }
}

export default ActivitySchedule;
