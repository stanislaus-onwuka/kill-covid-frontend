import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { authWithGoogle } from "../../redux/actions/auth";
import { addPhoneNumber } from "../../redux/user/user.actions.js";
import ExtraLogin from '../../components/ExtraLogin/ExtraLogin';

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

  handleSubmit = (event) => {
    event.preventDefault();

    const { history, addPhoneNumber } = this.props;

    addPhoneNumber(this.state.phoneNumber);
    history.push("/Eval");
  }

  render() {
    const { authWithGoogle, history } = this.props;
    const { phoneNumber } = this.state;

    return (
      <div>
        <section className="signup">
          <div className="signup-container">
            <div className="heading">
              <h2>Sign up</h2>
              <em>Create an account</em>
            </div>
            <form onSubmit={this.handleSubmit} className="sign-up-form">
              <input
                name="phoneNumber"
                type="tel"
                onChange={this.handleChange}
                value={phoneNumber}
                placeholder="Phone Number"
              />
              <input
                type="submit"
                value="Sign Up"
                className="signup-submit"
              />
            </form>
            <ExtraLogin
              authWithGoogle={authWithGoogle}
              history={history}
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
    addPhoneNumber: (number) => dispatch(addPhoneNumber(number)),
  };
};

export default connect(null, mapDispatchToProps)(signup);
