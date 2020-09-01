import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  authWithGoogle,
  authWithFacebook,
  authWithTwitter,
  authWithPhone
} from "../../redux/actions/auth";
import ExtraLogin from '../../components/ExtraLogin/ExtraLogin';
import PhoneLogin from '../../components/PhoneLogin/PhoneLogin';

import "./sign-up.css";

class signup extends React.Component {
  constructor() {
    super();
    this.state = {
      signUpMethod: "Google-Account",
    };
  }


  render() {
    const { authWithGoogle, authWithFacebook, authWithTwitter, history, authWithPhone } = this.props;
  
    return (
      <div>
        <section className="signup">
          <div className="signup-container">
            <div className="heading">
              <h2>Sign up</h2>
              <em>Create an account</em>
            </div>
            <PhoneLogin
              history={history}
              authWithPhone={authWithPhone}
              submitText='Sign Up'
            />
            <ExtraLogin
              authWithGoogle={authWithGoogle}
              authWithFacebook={authWithFacebook}
              authWithTwitter={authWithTwitter}
              history={history}
              authPage="signup"
            />
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
    authWithGoogle: (history) => dispatch(authWithGoogle(history)),
    authWithFacebook : (history) => dispatch(authWithFacebook(history)),
    authWithTwitter : (history) => dispatch(authWithTwitter(history)),
    authWithPhone: (result, history) => dispatch(authWithPhone(result, history))
  };
};

export default connect(null, mapDispatchToProps)(signup);
