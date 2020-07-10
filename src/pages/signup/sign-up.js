import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { authWithGoogle } from "../../redux/actions/auth";
import twitter from "../../assets/svg/twitter.svg";
import facebook from "../../assets/svg/facebook.svg";
import google from "../../assets/svg/google.svg";

import "./sign-up.css";

class signup extends React.Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: "",
      signUpMethod: "Google-Account",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { phoneNumber } = this.state;

    return (
      <div>
        <section className="signup">
          <div className="signup-container">
            <div className="heading">
              <h2>Sign up</h2>
              <em>Create an account</em>
            </div>
            <form className="sign-up-form">
              <input
                name="phoneNumber"
                type="tel"
                onChange={this.handleChange}
                value={phoneNumber}
                placeholder="Phone Number"
              />
              <input
                onClick={() => this.props.history.push("/Eval")}
                type="submit"
                value="Sign Up"
                className="signup-submit"
              />
            </form>
            <em className="socials-text">Or Sign up with</em>
            <div className="socials">
              {/* eslint-disable-next-line */}
              <a href="#" className="twitter-logo">
                <img src={twitter} alt="twitter-logo"></img>
              </a>
              {/* eslint-disable-next-line */}
              <a href="#" className="facebook-logo">
                <img src={facebook} alt="facebook-logo"></img>
              </a>
              {/* eslint-disable-next-line */}
              <button
                onClick={this.props.authWithGoogle}
                className="auth-button"
              >
                <img src={google} alt="google-logo"></img>
              </button>
            </div>
            <em className="socials-text">Already have an account?</em>
            <div className="signup-login-btn">
              <Link className="btn" to="/Login">
                Log In
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authWithGoogle: authWithGoogle(dispatch),
  };
};

export default connect(null, mapDispatchToProps)(signup);
