import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import "../DoctorLandingPage/DoctorLandingPage.css";

const DoctorLandingPage = () => {
    const history = useHistory();

    const handleSignInSubmit = event => {
      event.preventDefault();
      return history.push("/doctor/home");
    };

    return(
        <div className="doc-landing-page">
            <h1 className="title">Doctors Sign in</h1>
            <img alt="doc-icon" className="doc-icon" src={require("../../Assets/svg/doctor.svg")}/>
            <form onSubmit={handleSignInSubmit}>
                <input placeholder="Doctor ID" type="text" name="doctor-id" className="doctor-id"/>
                <input placeholder="Password" type="password" name="doc-password" className="doc-password"/>
                <input value="Sign in" className="doc-login" type="submit"/>
            </form>
            <Link to="/Login" className="patient-login-btn">Patient Login</Link>
        </div>
    )
}

export default DoctorLandingPage;
