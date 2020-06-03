import React from "react";
import './PatientDetails.css';
import profilePic from "../../Assets/avatar.svg"
import PatientHistory from "../../components/patientHistory/patientHistory";
import Prescription from "../../components/prescription/prescription"
import prescription from "../../components/prescription/prescription";

const PatientDetails = () => {
    return (
        <>
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
            </div>
        </>
    );
}

export default PatientDetails;