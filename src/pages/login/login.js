import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import InputBox from '../../components/InputBox/InputBox';
import ExtraLogin from '../../components/ExtraLogin/ExtraLogin';
import SignUp from '../../components/SignUp/SignUp';

import { authWithGoogle } from "../../redux/actions/auth";
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
    const { currentUser, history, authWithGoogle } = this.props;

    if (currentUser?.guides) {
      return <Redirect to='/Patient' />;
    };

    return (
      <div className="container">
        <LoginHeader />
        <InputBox />
        <ExtraLogin
          authWithGoogle={authWithGoogle}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
