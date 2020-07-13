import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import InputBox from '../../components/InputBox/InputBox';
import ExtraLogin from '../../components/ExtraLogin/ExtraLogin';
import SignUp from '../../components/SignUp/SignUp';

import { connect } from 'react-redux';
import { setCurrentUser, setUserGuides } from './../../redux/user/user.actions';

import format from 'date-fns/format';
import nJwt from 'njwt';

import './login.css';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      uid: '1bcb6b20-6fb8-4126-a8df-26d8349fd187',
      loginSuccess: false,
      loginFail: false
    }
  }

  generateAccessToken = uid => {
    // monkey patch for generation of access token
    let claims = {
     "sub": "1234567890",
     "iat": 1592737638,
     "exp": 1592741238,
     "uid": uid
    };
    let jwt = nJwt.create(claims, "secret", "HS256");
    let token = jwt.compact();
    return token;
  };

  loadUser = async () => {
    const { setCurrentUser, currentUser, setUserGuides } = this.props;

    let user = null;
    let remoteGuides = null;

    const url = 'https://fast-hamlet-28566.herokuapp.com/api/getuser';
    const options = {
      method: 'GET',
      headers: {
        'access-token': this.generateAccessToken(this.state.uid)
      }
    };

    try {
      let response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      };

      this.setState({ loginSuccess: true });
      user = await response.json();
      console.log(user)
      remoteGuides = user.guides;
      //the remarks in the user above have no doctor name, so fetch the remarks with doctor name and append to user
      let remarks = await fetch('https://fast-hamlet-28566.herokuapp.com/api/getremarks', options);
      remarks = await remarks.json();
      user.remarks = remarks;
    }
    catch(error) {
      console.error('There has been a problem fetching user data', error);
      this.setState({ loginFail: true });
      return;
    }
    finally{
      let localGuides = currentUser === null
        ? null
        : currentUser.guides;

      let updateGuides = false;
      let newGuides = null;

      // replace persisted guides if required
      if (user && !localGuides) {
        updateGuides = true;
        newGuides = remoteGuides.map(item => {
          item.previousTime = format(new Date(), "hh:mm");
          return item;
        });
      }
      else if (user && (localGuides.length !== remoteGuides.length)) {
        updateGuides = true;
        newGuides = remoteGuides.map(remoteGuideItem => {
          // initialize values for new user guides
          let match = localGuides.find(localGuideItem => localGuideItem.name === remoteGuideItem.name);

          if (match === undefined) {
            remoteGuideItem.previousTime = format(new Date(), "hh:mm");
            return remoteGuideItem;
          };
          return match;
        });
      };

      if (currentUser === null && user) {
        user.guides = newGuides;
        setCurrentUser(user);
      } else if (updateGuides) {
        setUserGuides(newGuides)
      };

    };
  };

  render() {
    const { currentUser } = this.props;

    if (currentUser) {
      return <Redirect to='/Patient' />;
    };

    return (
      <div className="container">
        { this.state.loginSuccess && currentUser === null
          ? <h1 className="loading">loading...</h1>
          : <>
              <LoginHeader />
              <InputBox
                handleSubmit={this.loadUser}
                loginFail={this.state.loginFail}
              />
              <ExtraLogin />
              <SignUp />
            </>
        }
      </div>
    );
  };
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setUserGuides: guides => dispatch(setUserGuides(guides))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
