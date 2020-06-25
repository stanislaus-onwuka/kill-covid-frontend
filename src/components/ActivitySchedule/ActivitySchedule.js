import React from 'react';
import ScheduleItem from './../scheduleItem/ScheduleItem';
import './ActivitySchedule.css';

class ActivitySchedule extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      guides: this.props.guides,
    };
    this.interval = null;
  }

  componentDidMount() {
    const checkActivities = () => {
      let newLocalGuides = JSON.parse(localStorage.getItem('guides'));
      let updateLocalStorage = false;
      let updateState = false;

      newLocalGuides = newLocalGuides.map((item, index) => {
        if (this.state.guides[index].done !== item.done) {
          // update state if guides on localStorage is different from current state
          updateState = true;
        };

        let time = this.getCurrentTime();
        let currentTime = '' + time.year + time.month + time.day + time.hour + time.minute;
        if (Number(currentTime) < Number(item.nextTime)) {
          return item;
        };

        if (item.done === true) { // avoid updating localStorage guides unnecessarily
          item.done = false;
          updateLocalStorage = true;
        };
        return item;
      });

      if (updateLocalStorage) {
        localStorage.setItem('guides', JSON.stringify(newLocalGuides));
        this.setState({ guides: newLocalGuides });
      };
      if (updateState && !updateLocalStorage) {
        this.setState({ guides: newLocalGuides });
      };
    };

    this.interval = setInterval(checkActivities, 1000);
  };

  getCurrentTime = () => {
    let time = new Date();
    let result = {
      year: time.getFullYear(),
      month: time.getMonth(),
      day: time.getDate(),
      hour: time.getHours(),
      minute: time.getMinutes()
    };
    return result;
  };

  handleClick = (index) => {
    let newGuides = [...this.state.guides];
    let timeLapse = newGuides[index].time_lapse.split('=');

    let time = this.getCurrentTime();
    let nextTime = null;

    if (timeLapse[0] === 'days') {
      nextTime = '' + time.year + time.month + (time.day + Number(timeLapse[1])) + time.hour + time.minute;
    }
    else if (timeLapse[0] === 'hours') {
      nextTime = '' + time.year + time.month + time.day + (time.hour + Number(timeLapse[1])) + time.minute;
    }
    else if (timeLapse[0] === 'minutes') {
      nextTime = '' + time.year + time.month + time.day + time.hour + (time.minute + Number(timeLapse[1]));
    };

    newGuides[index] = {
      ...newGuides[index],
      done: !newGuides[index].done,
      previousTime: ('0' + time.hour).slice(-2) + ':' + ('0' + time.minute).slice(-2),
      nextTime: nextTime
    };

    localStorage.setItem('guides', JSON.stringify(newGuides));
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
              time={item.previousTime}
            />
          ))
        }
      </div>
    </section>
    );
  }
}

export default ActivitySchedule;
