import React from 'react'
import "./DoctorHomeReports.css"
import arrow from "../../Assets/point-to.svg"

const DoctorHomeReport = (props) => (
    <>
        <div className="placard">
            <img src={props.profileImg} alt="img" />
                <div className="placard-content">
                    <h2>{props.name}</h2>
                    <em>Guaranteed on: <span>{props.grant}</span></em><br/>
                    <em>Last Recorded Symptom: {props.symptom}</em>
                </div>
            <img src={arrow} alt="arrowimg" className="arr" />
        </div>
    </>
);

export default DoctorHomeReport;