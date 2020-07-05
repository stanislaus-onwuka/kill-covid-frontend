/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import "./doctorComments.css";
import DoctorComment from "../../components/doctorComment/doctorComment";
import nJwt from 'njwt';



const DoctorComments = (props) => {

    const generateAccessToken = (uid) => {
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

    const { currentDoctorId } = props

    console.log(currentDoctorId)
    
    fetch('https://fast-hamlet-28566.herokuapp.com/doctors/fetchcomments', {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'doc-access-token' : generateAccessToken(currentDoctorId)
            }
        })
        .then(res => console.log(res.json()))
    
    return(
        <>
            <div className="comment-section">
                <h4>Doctor's Comments</h4>
                    <DoctorComment />
                    <DoctorComment />
                <a href="/">View More</a>
            </div>
        </>
    );
}

export default DoctorComments;