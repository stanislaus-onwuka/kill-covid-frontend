import React from 'react';
import twitterIcon from "./../../assets/svg/twitter.svg";
import facebookIcon from "./../../assets/svg/facebook.svg";
import googleIcon from "./../../assets/svg/google.svg";
import './ExtraLogin.css';

function ExtraLogin({ authWithGoogle, history, authPage, authWithFacebook, authWithTwitter }) {
  return (
      <div className="extra-login-container">
        <p>{`Or ${authPage} with`}</p>
        <div className="login-links-container">
          <button
            onClick={() => authWithTwitter(history)}
            className="twitter-logo logo"
          >
            <img src={twitterIcon} alt='twitter-logo'></img>
          </button>
          <button
            onClick={() => authWithFacebook(history)}
            className="facebook-logo logo"
          >
            <img src={facebookIcon} alt='facebook-logo'></img>
          </button>
          <button
            onClick={() => authWithGoogle(history)}
            className="google-logo logo"
          >
            <img src={googleIcon} alt='google-logo'></img>
          </button>
        </div>
      </div>
    );
}

export default ExtraLogin;
