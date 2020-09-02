import React, { useState, useEffect } from 'react';
import { RecaptchaVerifier, auth } from '../../firebase';
import './PhoneLogin.css';


const PhoneLogin = ({ authWithPhone, history, submitText }) => {
    const [phoneAuth, setPhoneAuth] = useState({
        phoneNumber: "",
        verificationCode: "",
    });
    const [authStage, setAuthStage] = useState("sendSms");
    const [authError, setAuthError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPhoneAuth({
            ...phoneAuth,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const resetAuth = event => {
        event.preventDefault();
        window.recaptchaVerifier.reset(window.recaptchaWidgetId);
        
        setPhoneAuth({
            ...phoneAuth,
            verificationCode: ''
        });
        setAuthStage('sendSms');
    };

    const verifySmsCode = (event) => {
        event.preventDefault();

        window.confirmationResult.confirm(phoneAuth.verificationCode)
            .then((result) => {
                authWithPhone(result, history);
            })
            .catch((err) => {
                setPhoneAuth({
                    ...phoneAuth,
                    verificationCode: ''
                });
                setAuthError('Unable to authenticate verification code, please try again');
                setAuthStage('sendSms');
                console.error(err);
            });
    };

    window.onSignInSubmit = (setAuthStage, setAuthError) => {
        auth.signInWithPhoneNumber(phoneAuth.phoneNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setAuthStage('verifyCode');
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
                window.recaptchaVerifier.reset(window.recaptchaWidgetId);
                setAuthError('Failed to send sms verification code, please try again');
                console.error(error);
                console.log('could not auth')
            });
    };

    useEffect(() => {    
        window.recaptchaVerifier = new RecaptchaVerifier('signup-submit', {
            'size': 'invisible',
            'callback': (response) => {
                window.onSignInSubmit(setAuthStage, setAuthError);
            },
        });

        window.recaptchaVerifier.render().then(widgetId => {
            window.recaptchaWidgetId = widgetId;
        });
    }, []);

    return (
        <>
            <form
                onSubmit={handleSubmit}
                onFocus={() => setAuthError(null)}
                className="sign-up-form"
            >
                {
                    <input
                        name="phoneNumber"
                        type="tel"
                        onChange={handleChange}
                        value={phoneAuth.phoneNumber}
                        placeholder="Phone Number"
                    />
                }   
            {authError && <p role="alert" className="alert-error phone-auth-error">{authError}</p>}   
            {
                 <input
                    id='signup-submit'
                    type="submit"
                    value={submitText}
                    className="signup-submit"
                    key="signup-submit"
                    disabled
                />
            }
        </form>
            {authStage === 'verifyCode' &&
                <div
                    className='notification-modal notification-modal_terms'
                >
                    <form onSubmit={verifySmsCode} className='notification-modal_content notification-modal_phone-auth-content'>
                        <p className='notification-modal_title'>Verify phone number</p>
                        <p className='notification-modal_phone-text'>Enter the 6-digit verification sent to {phoneAuth.phoneNumber}:</p>
                        <input
                            name="verificationCode"
                            className='notification-modal_input'
                            onChange={handleChange}
                            value={phoneAuth.verificationCode}
                            type='tel'
                        />
                        <div className='notification-modal_buttons-wrapper'>
                            <button
                                onClick={resetAuth}
                                className='notification-modal_button failure-button'
                            >Cancel</button>
                            <input
                                className='notification-modal_button success-button'
                                type='submit'
                                value='Confirm'
                            />        
                        </div>
                    </form>
                </div>
            }
        </>
    );
};

export default PhoneLogin;