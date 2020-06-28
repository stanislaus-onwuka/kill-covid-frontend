import React from 'react'
import "./DoctorHomeReports.css"
import arrow from "../../assets/svg/point-to.svg"
import {Link} from "react-router-dom"

const DoctorHomeReport = ({ profileImg,name,symptom,patient }) => (
    <>
        <div className="placard">
            <img src={profileImg} alt="img" />
            <div className="placard-content">
                <h2>{name}</h2>
                {/* <p>Quarantined on: <span>{props.grant}</span></p> */}
                <p>Last Recorded Symptoms: <span>{symptom}</span></p>
            </div>
            <Link className="arr-link" 
            to={{
            pathname: '/patient-details',
            patient
            }}
            ><img src={arrow} alt="arrowimg" className="arr" /></Link>
        </div>
    </>
);

export default DoctorHomeReport;

