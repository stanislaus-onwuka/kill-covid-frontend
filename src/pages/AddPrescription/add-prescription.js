import React, { Component } from "react";

import firstAid from './../../assets/svg/first-aid.svg';
import calendar from './../../assets/svg/calendar.svg';

import "./add-prescription.css";


class AddPrescription extends Component {
    constructor(props) {
      super(props);
      this.state = {
        medicineName: '',
        dosage: '',
        frequency: '',
        startDate: '',
        endDate: '',
        requestError: false
      };
    }

    onInputChange = (stateKey, event) => {
      if (this.state.error) {
        this.setState({ error: false })
      };

      this.setState({ [stateKey]: event.target.value });
    };

    handlePrescriptionSave = () => {
      if (this.state.error) {
        this.setState({ error: false })
      };

      const timegap = "hours=" + Math.round(24 / this.state.frequency);
      const prescriptionInfo = JSON.stringify({
        name: this.state.medicineName,
        info: [
          [
            this.state.dosage,
            this.state.startDate,
            this.state.endDate
          ],
          timegap
        ]
      });

      const url = '';
      const requestOptions = {
        body: {
          prescriptionInfo
        }
      };

      fetch(url, requestOptions)
        .then(response => {
          if (true) {
          // if (!response.ok) {
            throw new Error('Network response was not ok');
          };

          // this.props.history.push('/Patient-details');
        })
        .catch(error => {
          console.error('There has been a problem fetching user data', error);
          this.setState({ error: true });
          return;
        });
    };

    render() {

      return(
          <div className="add-prescription-page">
              <h2 className="page-title">Add Prescription</h2>

              {
                this.state.error &&
                <p className="prescription-error">
                  Sorry, we encountered an error while trying to submit the new prescription.
                  Please try again later.
                </p>
              }

              <div className="medicine-name-div">
                  <label htmlFor='name'>Medicine Name</label>
                  <img src={firstAid} alt='medicine' />
                  <input
                    onChange={(event) => this.onInputChange('medicineName', event)}
                    value={this.state.medicineName}
                    type="text"
                    id='medicine-name'
                    className="medicine-name"
                    name="medicine-name">
                  </input>

              </div>

              <div className="dosage-div">
                  <div className="dosage">
                      <label htmlFor='dosage'>Dosage</label>
                      <input
                        onChange={(event) => this.onInputChange('dosage', event)}
                        value={this.state.dosage}
                        min="0"
                        type="number"
                        id='dosage'
                        name="dosage-value">
                      </input>
                  </div>
                  <div className="frequency">
                      <label htmlFor='frequency'>Frequency</label>
                      <div className='input'>
                          <input
                            onChange={(event) => this.onInputChange('frequency', event)}
                            value={this.state.frequency}
                            min="0"
                            type="number"
                            id='frequency'
                            name="frequency-value">
                          </input>
                          <span>/Day</span>
                      </div>
                  </div>
              </div>
              <div className="dates">
                  <div className="date-div">
                      <label htmlFor='startDate'>Start Date(optional)</label>
                      <img src={calendar} alt='calendar' />
                      <input
                        onChange={(event) => this.onInputChange('startDate', event)}
                        value={this.state.startDate}
                        type="date"
                        id='startDate'
                        name="start-date-value">
                      </input>
                  </div>
                  <div className="date-div">
                      <label htmlFor='endDate'>End Date(optional)</label>
                      <img src={calendar} alt='calendar' />
                      <input
                        onChange={(event) => this.onInputChange('endDate', event)}
                        value={this.state.endDate}
                        type="date"
                        id='endDate'
                        name="end-date-value">
                      </input>
                  </div>
              </div>
              <div onClick={this.handlePrescriptionSave} className="btn save-btn" >Save</div>
          </div>
      )
    }
}

export default AddPrescription;
