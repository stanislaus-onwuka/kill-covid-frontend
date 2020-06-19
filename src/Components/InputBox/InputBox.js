import React from 'react';
import { Link } from 'react-router-dom';
import './InputBox.css'

function InputBox({path}) {
  // let display;
  // if(path==='/'){
  //   display =  <>
  //     <input type='text' placeholder="Phone Number" />
  //     <input type='text' placeholder="Create a username" />
  //     <Link to="/Eval">Sign Up</Link>
  //     </>  
  // }
  // else if(path==='/Login'){
  //  display = 
  // }
  return(
    <div className="login-input-box-container">
      <>
      <input type='text' placeholder="Username / Phone No" />
      <Link to="/Eval">Log In</Link>
      </>
    </div>
  )
}

export default InputBox;