import React from "react";
import "./add-prescription.css";
import {Link} from "react-router-dom";

const AddPrescription = () =>{
    return(
        <div className="add-prescription-page">
            <h2 className="page-title">Add Prescription</h2>

            <div className="medicine-name-div">
                <h4>Medicine Name</h4>
                <input type="text" className="medicine-name" name="medicine-name"></input>
            </div>
            <div className="dosage-div">
                <div className="dosage">
                    <h5>Dosage</h5>
                    <input type="number" className="dosage-value" name="dosage-value"></input>
                </div>
                <div className="frequency">
                    <h5>Frequency</h5>
                    <input type="number" className="frequency-value" name="frequency-value"></input>
                    <span>/Day</span>
                </div>
            </div>
            <div className="dates">
                <div className="start-date-div">
                    <h5>Start Date</h5>
                    <input type="date" className="start-date-value" name="start-date-value"></input>
                </div>
                <div className="end-date-div">
                    <h5>End Date</h5>
                    <input type="date" className="end-date-value" name="end-date-value"></input>
                </div>
            </div>
            <Link to="/Patient-details" className="btn save-btn" >Save</Link>
        </div>
    )
}

export default AddPrescription;