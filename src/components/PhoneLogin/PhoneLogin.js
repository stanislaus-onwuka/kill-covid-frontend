import React, { useState, useEffect } from 'react';
import { RecaptchaVerifier, auth } from '../../firebase';
import './PhoneLogin.css';


const PhoneLogin = ({ authWithPhone, history, submitText }) => {
    const [phoneAuth, setPhoneAuth] = useState({
        phoneNumber: "",
        verificationCode: "",
        authStage: "sendSms",
        error: null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPhoneAuth({
            ...phoneAuth,
            [name]: value,
            error: null
        });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setPhoneAuth({...phoneAuth, error: null})
 
        if (phoneAuth.authStage === 'verifyCode') {
            window.confirmationResult.confirm(phoneAuth.verificationCode)
                .then((result) => {
                    authWithPhone(result, history);
                })
                .catch((err) => {
                    setPhoneAuth({
                        ...phoneAuth,
                        authStage: 'sendSms',
                        error: 'Unable to authenticate verification code, please try again',
                        verificationCode: ''
                    });
                    console.error(err);
                });
        } else {      
            auth.signInWithPhoneNumber(phoneAuth.phoneNumber, window.recaptchaVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    setPhoneAuth({
                        ...phoneAuth,
                        authStage: 'verifyCode'
                    });
                })
                .catch((error) => {
                    // Error; SMS not sent
                    // ...
                    window.recaptchaVerifier.render().then(widgetId => {
                        window.recaptchaVerifier.reset(widgetId);
                    });
                    setPhoneAuth({
                        ...phoneAuth,
                        error: 'Failed to send sms verification code, please try again'
                    });
                    console.error(error)
                });
        };
    };
    

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier('signup-submit', {
            'size': 'invisible',
            'callback': function(response) {
              // onSignInSubmit();
            //   console.log('verified');
            },
          });
    }, []);

    return (
        <form onSubmit={handleSubmit} className="sign-up-form">
        {
          phoneAuth.authStage === 'verifyCode'
          ? <input
              name="verificationCode"
              type="text"
              onChange={handleChange}
              value={phoneAuth.verificationCode}
              placeholder="Sms verification code"
            />
          : <input
              name="phoneNumber"
              type="tel"
              onChange={handleChange}
              value={phoneAuth.phoneNumber}
              placeholder="Phone Number"
            />
        }   
        {phoneAuth.error && <p role="alert" className="alert-error phone-auth-error">{phoneAuth.error}</p>}   
        {
            phoneAuth.authStage === 'verifyCode'
            ?   <input
                    id='signup-verify'
                    type="submit"
                    value="Verify Code"
                    className="signup-submit"
                    key="signup-verify"
                />
            :   <input
                    id='signup-submit'
                    type="submit"
                    value={submitText}
                    className="signup-submit"
                    key="signup-submit"
                />
        }
      </form>
    );
};

export default PhoneLogin;