import React from 'react';
import './SplashScreen.css';

class SplashScreen extends React.Component{

    componentDidMount(){
        if(this.props.history.location.pathname==='/'){
           setTimeout(()=>this.props.history.push('/signup'), 2000);
        }else{
            console.log('We move');
        }
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

export default SplashScreen;
