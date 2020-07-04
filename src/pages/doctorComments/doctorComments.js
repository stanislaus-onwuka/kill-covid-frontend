/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import "./doctorComments.css"
import DoctorComment from "../../components/doctorComment/doctorComment"


const DoctorComments = () => {
    return(
        <>
            <div className="comment-section">
                <h2>Doctor's Comments</h2>
                    <DoctorComment />
                    <DoctorComment />
                    <DoctorComment />
                    <DoctorComment />
            </div>
        </>
    );
}

export default DoctorComments;