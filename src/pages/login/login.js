import React from 'react';
import LoginHeader from './Components/LoginHeader/LoginHeader';
import InputBox from './Components/InputBox/InputBox';
import ExtraLogin from './Components/ExtraLogin/ExtraLogin';
import SignUp from './Components/SignUp/SignUp';
import './Login.css';

function Login() {
    return (
      <div className="container">
        <LoginHeader />
        <InputBox />
        <ExtraLogin />
        <SignUp />
      </div>
    );
}

export default Login;
