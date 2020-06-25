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
        let timeLapse = item.time_lapse.split('=');
        if (timeLapse[0] === 'days') {
          // schedule items with a timelapse of a day automatically reset every day
          return item;
        };

        if (this.state.guides[index].done !== item.done) {
          // update state if localGuides is different from current state
          updateState = true;
        };

        let currentTime = this.getCurrentHoursAndMinutes();
        let nextHour = item.nextTime[0];
        let nextMinute = item.nextTime[1];

        if (currentTime[0] < nextHour) {
          return item;
        };
        if (currentTime[0] === nextHour && currentTime[1] < nextMinute) {
          return item;
        };

        if (item.done === true) {
          // avoid updating state unnecessarily
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

    this.interval = setInterval(checkActivities, (60 * 1000));
  };

  getCurrentHoursAndMinutes = () => {
    let time = new Date();
    let result = [time.getUTCHours(), time.getUTCMinutes()];
    return result;
  };

  handleClick = (index) => {
    let newGuides = [...this.state.guides];
    let timeLapse = newGuides[index].time_lapse.split('=');

    let time = this.getCurrentHoursAndMinutes();
    let hour = time[0];
    let minute = time[1];
    let nextTime = null;

    if (timeLapse[0] === 'hours') {
      nextTime = [(hour + Number(timeLapse[1])), minute];
    }
    else if (timeLapse[0] === 'minutes') {
      nextTime = [hour, (minute + Number(timeLapse[1]))];
    };

    newGuides[index] = {
      ...newGuides[index],
      done: !newGuides[index].done,
      previousTime: ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2),
      nextTime: nextTime
    };

    localStorage.setItem('guides', JSON.stringify(newGuides));
    console.log(newGuides[index].previousTime);
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
