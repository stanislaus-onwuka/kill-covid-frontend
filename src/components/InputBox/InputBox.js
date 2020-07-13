import React from 'react';
import './InputBox.css'

function InputBox({ loginFail, handleSubmit }) {
  return(
    <div className="login-input-box-container">
      <>
      <input type='text' placeholder="Phone No" />
      { loginFail && <p className="login-fail">Login failed</p> }
      <button onClick={handleSubmit}>Log In</button>
      </>
    </div>
  )
}

export default InputBox;
