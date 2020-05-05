import React from 'react';
import './InputBox.css'

function InputBox() {
  return(
    <div className="login-input-box-container">
      <input type='text' placeholder="UserName" />
      <button> Continue </button>
    </div>
  )
}

export default InputBox;