import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import PhoneLogin from '../../components/PhoneLogin/PhoneLogin';
import ExtraLogin from '../../components/ExtraLogin/ExtraLogin';
import SignUp from '../../components/SignUp/SignUp';

import { authWithGoogle, authWithFacebook, authWithTwitter, authWithPhone } from "../../redux/actions/auth";
import { connect } from 'react-redux';

import './login.css';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      uid: '1bcb6b20-6fb8-4126-a8df-26d8349fd187',
    };
  }

  render() {
    const {
      currentUser,
      history,
      authWithGoogle,
      authWithFacebook,
      authWithTwitter,
      authWithPhone
    } = this.props;

    if (currentUser?.guides) {
      return <Redirect to='/Patient' />;
    };

    return (
      <div className="container">
        <LoginHeader />
        <PhoneLogin
          history={history}
          authWithPhone={authWithPhone}
          submitText='Log In'
        />
        <ExtraLogin
          authWithGoogle={authWithGoogle}
          authWithFacebook={authWithFacebook}
          authWithTwitter={authWithTwitter}
          history={history}
          authPage={"login"}
        />
        <SignUp />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  authWithGoogle: (history) => dispatch(authWithGoogle(history)),
  authWithFacebook: (history) => dispatch(authWithFacebook(history)),
  authWithTwitter: (history) => dispatch(authWithTwitter(history)),
  authWithPhone: (result, history) => dispatch(authWithPhone(result, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
