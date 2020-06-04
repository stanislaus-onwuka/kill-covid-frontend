import React from "react";
import './PatientDetails.css';
import profilePic from "../../Assets/avatar.svg";
import PatientHistory from "../../components/patientHistory/patientHistory";
import Prescription from "../../components/prescription/prescription";
import {Link} from "react-router-dom";


const PatientDetails = () => {
    return (
        <div className="PatientDetails">
            <div className="Pcontainer">

                <div className="Pbanner">
                    <h2>Patient's Details</h2>
                    <img src={profilePic} alt="img"/>
                    <h3>Paul Okoye</h3>
                </div>

                <div className="Pswitch">
                    <div className="Pprog">
                        <h4>PROGRESS</h4>
                    </div>
                    <div className="Pinfo">
                        <h4>INFORMATION</h4>
                    </div>
                </div>

                <div className="progress-div">
                    <div className="history">
                        <div className="head-container">
                            <h4>HISTORY</h4>
                        </div>
                        <PatientHistory symptom="Dry Cough" date= "28/05/12" />
                        <PatientHistory symptom="Mild Cough" date= "24/07/22" />
                    </div>

                    <div className="prescriptions">
                        <div className="head-container">
                            <h4>PRESCRIPTIONS</h4>
                        </div>
                        <div className="drugs">
                            <div className="head-container2">
                                <h4>DRUGS</h4>
                                <h4>DOSAGE</h4>
                            </div>
                            <Prescription />
                            <Prescription />
                        </div>
                    </div>

                    <div className="body-temp">
                        <div className="head-container">
                            <h4>BODY TEMPERATURE</h4>
                        </div>
                    </div>
                </div>
                <div className="information-div">
                    <div className="patient-info patient-name">
                        <h3 className="title">Name: </h3>
                    </div>
                    <div className="patient-info patient-gender">
                        <h3 className="title">Gender: </h3>
                    </div>
                    <div className="patient-info patient-home-address">
                        <h3 className="title">Home Address: </h3>
                    </div>
                    <div className="patient-info patient-phone-number">
                        <h3 className="title">Phone Number: </h3>
                    </div>
                    <div className="patient-info patient-email">
                        <h3 className="title">Email: </h3>
                    </div>
                    <div className="patient-info patient-age">
                        <h3 className="title">Age: </h3>
                    </div>
                </div>
            </div>
            <Link to="/add-prescription" className="add-prescription-link">
                <img src={require("./plus.svg")} alt="add prescription button"/>
            </Link>
        </div>
    );
}

export default PatientDetails;