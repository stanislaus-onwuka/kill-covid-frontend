import React from 'react';
import './SplashScreen.css';

class SplashScreen extends React.Component{

    render(){
        return(
            <div className="splash-screen">
                <div className="splash-screen_content">
                <img src={require("../../assets/Logo.svg")} alt="Logo"/>
                </div>
            </div>
        )
            
    }
    
}

export default SplashScreen;
