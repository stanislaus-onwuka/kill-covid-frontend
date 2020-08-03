import React, { Component } from "react";
import nJwt from 'njwt';

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
        addPrescriptionError: false,
        addPrescriptionSuccess: false
      };
    };

    generateAccessToken = uid => {
      let claims = {
       "sub": "1234567890",
       "iat": 1592737638,
       "exp": 1592741238,
       "uid": uid
      };
      let jwt = nJwt.create(claims, "secret", "HS256");
      let token = jwt.compact();
      return token;
    };

    onInputChange = (stateKey, event) => {
      if (this.state.addPrescriptionError) {
        this.setState({ addPrescriptionError: false })
      };

      this.setState({ [stateKey]: event.target.value });
    };

    handlePrescriptionAdd = () => {
      if (this.state.addPrescriptionError) {
        this.setState({ addPrescriptionError: false })
      };

      const timegap = this.state.frequency === '1'
      ? "days=1"
      : "hours=" + Math.round(24 / this.state.frequency);
      const prescriptionInfo = {
        user_id: this.props.location.user_id,
        name: this.state.medicineName,
        info: [
          [
            this.state.dosage,
            this.state.startDate,
            this.state.endDate
          ],
          timegap
        ]
      };

      const url = 'https://fast-hamlet-28566.herokuapp.com/doctors/add_prescription';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'doc_csrf_access_token': this.props.location.doctorAccessToken,
          'Access-Control-Allow-Origin': "*",
        },
        credentials: "include",
        body: JSON.stringify(prescriptionInfo)
      };

      fetch(url, requestOptions)
        .then(response => {
          if (!response.ok) {
            console.log(response)
            throw new Error('Network response was not ok');
          };

          this.setState({ addPrescriptionSuccess: true });

          // wait a bit before redirecting the doctor
          setTimeout(() => {
            this.props.history.push('/Patient-details')
          }, 1000);
        })
        .catch(error => {
          console.error('There has been a problem fetching user data', error);
          this.setState({ addPrescriptionError: true });
          return;
        });
    };

    render() {

      return(
          <div className="add-prescription-page">
              <h2 className="page-title">Add Prescription</h2>

              {
                this.state.addPrescriptionError &&
                <p className="add-perscription_msg add-perscription_error">
                  Sorry, we encountered an error while trying to submit the new prescription.
                  Please try again later.
                </p>
              }

              {
                this.state.addPrescriptionSuccess &&
                <p className="add-perscription_msg add-perscription_success">
                  Prescription added successfully
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
              <div onClick={this.handlePrescriptionAdd} className="btn save-btn" >Save</div>
          </div>
      )
    }
}

export default AddPrescription;
