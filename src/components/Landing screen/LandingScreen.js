import React from 'react';
import './LandingScreen.css';

class LandingScreen extends React.Component{

    componentDidMount(){
        setTimeout(()=>this.props.history.push('/signup'), 2000);
    }

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

export default LandingScreen;
