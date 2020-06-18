import React from 'react'
import "./DoctorHomeReports.css"
import arrow from "../../Assets/point-to.svg"
import {Link} from "react-router-dom"

const DoctorHomeReport = (props) => (
    <>
        <div className="placard">
            <img src={props.profileImg} alt="img" />
                <div className="placard-content">
                    <h2>{props.name}</h2>
                    <p>Guaranteed on: <span>{props.grant}</span></p>
                    <p>Last Recorded Symptom: <span>{props.symptom}</span></p>
                </div>
                <Link to="/Patient-details"><img src={arrow} alt="arrowimg" className="arr" /></Link>
        </div>
    </>
);

export default DoctorHomeReport;