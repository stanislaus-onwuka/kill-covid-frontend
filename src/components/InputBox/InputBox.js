import React from 'react';
import './InputBox.css'

function InputBox() {
  return(
    <div className="login-input-box-container">
      <>
      <input type='text' placeholder="Phone No" />
      <button>Log In</button>
      </>
    </div>
  )
}

export default InputBox;
