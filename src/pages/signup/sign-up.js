import React from 'react';
import "./sign-up.css";
import twitter from "./../../Assets/svg/twitter.svg";
import facebook from "./../../Assets/svg/facebook.svg";
import google from "./../../Assets/svg/google.svg";
import {Link} from "react-router-dom"

const signup = () => {
    return(
       <div>
            <section className="signup">
                  <div className="signup-container">
                        <div className="heading">
                           <h1>Sign up</h1>
                           <em>Create an account</em>
                        </div>
                        <form>
                           <input name="phone" placeholder="Phone Number"/>
                           <input name="username" placeholder="Create a username"/>
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

export default signup;