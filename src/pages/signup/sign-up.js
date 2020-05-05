import React from 'react';
import "./sign-up.css";
import twitter from "../../assets/twitter-brands.svg";
import facebook from "../../assets/facebook-brands.svg";
import google from "../../assets/google-brands.svg";


const signup = () => {
    return(
       <>
            <section className="signup">
                  <div className="signup-container">
                        <div className="heading">
                           <h2>Sign up</h2>
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
                         <div style={{
                            marginTop: "30px"
                         }}>
                            <a href="/">Log In</a>
                         </div>  
                  </div>   
            </section>                    
       </>
    );
}

export default signup;