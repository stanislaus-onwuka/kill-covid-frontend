import React from 'react';
import './LoginHeader.css';

function LoginHeader({path}) {
  // let display;
  // if(path==='/'){
  //   display =  <>
  //     <h1> Sign Up </h1>
  //     <p>Create an account</p>
  //     </>
    
  // }
  // else if(path==='/Login'){
   
  // }
    return (
      <div className="login-header-container">
        <>
        <h1> Log In </h1>
        <p>Get back into your account</p>
        </>
      </div>
    );
}

export default LoginHeader;
