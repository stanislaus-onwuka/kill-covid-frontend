import React from "react";

import firstAid from './../../assets/svg/first-aid.svg';
import calendar from './../../assets/svg/calendar.svg';

import "./add-prescription.css";
import {Link} from "react-router-dom";

const AddPrescription = () =>{
    return(
        <div className="add-prescription-page">
            <h2 className="page-title">Add Prescription</h2>

            <div className="medicine-name-div">
                <label htmlFor='name'>Medicine Name</label>
                <img src={firstAid} alt='medicine' />
                <input type="text" id='medicine-name' className="medicine-name" name="medicine-name"></input>
            </div>
            
            <div className="dosage-div">
                <div className="dosage">
                    <label htmlFor='dosage'>Dosage</label>
                    <input type="number" id='dosage' name="dosage-value"></input>
                </div>
                <div className="frequency">
                    <label htmlFor='frequency'>Frequency</label>
                    <div className='input'>
                        <input type="number" id='frequency' name="frequency-value"></input>
                        <span>/Day</span>
                    </div>
                </div>
            </div>
            <div className="dates">
                <div className="date-div">
                    <label htmlFor='startDate'>Start Date</label>
                    <img src={calendar} alt='calendar' />
                    <input type="date" id='startDate' name="start-date-value"></input>
                </div>
                <div className="date-div">
                    <label htmlFor='endDate'>End Date</label>
                    <img src={calendar} alt='calendar' />
                    <input type="date" id='endDate' name="end-date-value"></input>
                </div>
            </div>
            <Link to="/Patient-details" className="btn save-btn" >Save</Link>
        </div>
    )
}

export default AddPrescription;