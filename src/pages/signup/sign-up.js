import React from 'react';
import {Link} from "react-router-dom"

import twitter from "../../assets/svg/twitter.svg";
import facebook from "../../assets/svg/facebook.svg";
import google from "../../assets/svg/google.svg";

import "./sign-up.css";

class signup extends React.Component {
   constructor(){
      super();
      this.state = {
         phoneNumber: '',
         username: '',
         signUpMethod: 'PhoneNumber'
      }
   }

   handleChange = event => {
      const { name, value } = event.target;
      this.setState({[name]: value});
   }

   render(){
      const { phoneNumber, username } = this.state
      return(
         <div>
            <section className="signup">
               <div className="signup-container">
                  <div className="heading">
                     <h2>Sign up</h2>
                     <em>Create an account</em>
                  </div>
                  <form className='sign-up-form'>
                     <input name="phone" type="tel" onChange={this.handleChange} value={phoneNumber} placeholder="Phone Number"/>
                     <input name="username" type="text" onChange={this.handleChange} value={username} placeholder="Create a username"/>
                     <input type="submit" value="Sign Up" className="signup-submit"/>
                  </form>
                  <em className="socials-text">Or Sign up with</em>
                  <div className="socials">
                     {/* eslint-disable-next-line */}
                     <a href="#" className="twitter-logo"><img src={twitter} alt='twitter-logo'></img></a>
                     {/* eslint-disable-next-line */}
                     <a href="#" className="facebook-logo"><img src={facebook} alt='facebook-logo'></img></a>
                     {/* eslint-disable-next-line */}
                     <a href="#" className="google-logo"><img src={google} alt='google-logo'></img></a>
                  </div>
                  <em className="socials-text">Already have an account?</em>
                  <div className="signup-login-btn">
                     <Link className="btn" to="/Login">Log In</Link>
                  </div>
               </div>   
            </section>                  
         </div>
      );
   }
}

export default signup;