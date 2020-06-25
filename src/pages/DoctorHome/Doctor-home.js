import React from 'react';
import njwt from 'njwt';
import { connect } from 'react-redux';

import Report from "../../components/DoctorHomeReports/DoctorHomeReports"
import ProfilePic from "../../assets/svg/avatar.svg"
import "./Doctor-home.css"

const generateAccessToken = uid => {
    let claims = {
     "sub": "1234567890",
     "iat": 1592737638,
     "exp": 1592741238,
     "uid": uid
    };
    let jwt = njwt.create(claims, "secret", "HS256");
    let token = jwt.compact();
    return token;
};

const doctorHome = ({ currentDoctorId }) => {

        (async () => {
            //Hard Coding currentDoctorID for test purposes
            let hardCurrentDoctorId = 'd9783a65-93fe-44d7-84e9-5e122677c23e'
            try{
                let response = await fetch('https://fast-hamlet-28566.herokuapp.com/doctors/getpatients',{
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'doc-access-token': generateAccessToken(hardCurrentDoctorId)
                  }
                })
                let result = await response.json();
                if(result){
                  console.log(result)
                }
              }catch(err){
                console.log(err)
              }
        })();
        return (
            <>
                <div className="dhomeContainer">
                    <div className="dhomeHeader">
                        <div className="dh-container">
                            <h1>Welcome Dr Emmanuel</h1>
                            <p>We appreciate your efforts in fighting covid-19<br/>
                            Please check for recently sent reports
                            </p>
                        </div>
                    </div>
                    <input name="search-home" className="search" />
                    <div className="reports">
                        <Report profileImg={ProfilePic}
                            name="Paul Okoye"
                            grant="10/05/2020"
                            symptom="Dry Cough"
                        />
                        <Report profileImg={ProfilePic}
                            name="Paul Okoye"
                            grant="10/05/2020"
                            symptom="Dry Cough"
                        />
                        <Report profileImg={ProfilePic}
                            name="Paul Okoye"
                            grant="10/05/2020"
                            symptom="Dry Cough"
                        />
                        <Report profileImg={ProfilePic}
                            name="Paul Okoye"
                            grant="10/05/2020"
                            symptom="Dry Cough"
                        />
                    </div>
                </div>
            </>
        )

}

const mapStateToProps = state => ({
    currentDoctorId: state.doctor.currentDoctorId
})

export default connect(mapStateToProps)(doctorHome);