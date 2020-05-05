import React from 'react';
import './SignUp.css';
import {Link} from "react-router-dom"

function SignUp() {
    return (
      <div className="login-signup-container">
        <p>Create an account?</p>
        <Link to="/">Sign Up</Link>
      </div>
    );
}

export default SignUp;