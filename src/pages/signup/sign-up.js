import React from 'react';
import "./sign-up.css";
import twitter from "./../../Assets/svg/twitter.svg";
import facebook from "./../../Assets/svg/facebook.svg";
import google from "./../../Assets/svg/google.svg";
import {Link} from "react-router-dom"

const signup = () => {
    return(
       <>
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
                        <em>Or Sign up with</em>
                        <div className="socials">
                           <img src={twitter} alt="twitter" />
                           <img src={facebook} alt="facebook" />
                           <img src={google} alt="google" />
                        </div>
                        <em>Already have an account?</em>
                         <div className="signup-login-btn">
                            <Link to="/Login">Log In</Link>
                         </div>  
                  </div>   
            </section>                    
       </>
    );
}

export default signup;