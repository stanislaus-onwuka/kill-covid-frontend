import React from 'react';
import LoginHeader from "./../../components/LoginHeader/LoginHeader";
import InputBox from './../../components/InputBox/InputBox';
import ExtraLogin from './../../components/ExtraLogin/ExtraLogin';
import SignUp from './../../components/SignUp/SignUp';
import './login.css';

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
