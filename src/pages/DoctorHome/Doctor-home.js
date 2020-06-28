import React from 'react';
import njwt from 'njwt';
import { connect } from 'react-redux';

import Report from "../../components/DoctorHomeReports/DoctorHomeReports"
import ProfilePic from "../../assets/svg/avatar.svg"
import "./Doctor-home.css";


class doctorHome extends React.Component {
    constructor(){
        super()
        this.state={
            patients: []
        }
    }

    generateAccessToken = uid => {
        let claims = {
         "sub": "1234567890",
         "iat": 1592737638,
         "exp": 1592741238,
         "uid": uid
        };
        let jwt = njwt.create(claims, "secret", "HS256");
        let token = jwt.compact();
        return token;
    };

    setSymptoms = symptoms => {
       let finalSymptoms = []
       if(symptoms[0]){
           symptoms = symptoms[0]
           if(symptoms.cough) finalSymptoms.push('Cough')
           if(symptoms.fever) finalSymptoms.push('Fever')
           if(symptoms.fatigue) finalSymptoms.push('Fatigue')
           if(symptoms.resp) finalSymptoms.push('Respiratory Problems')
           if(symptoms.other) finalSymptoms.push(`${symptoms.other}`)
           return finalSymptoms.join(', ');
       }
       return null
    }
        
    componentDidMount(){
        (async () => {
                //Hard Coding currentDoctorID for test purposes
               
                //DON'T DELETE THE COMMENTS

                // let userID = 'c6f92663-c8c5-42b1-81af-0ce17ecbf84d'
                let hardCurrentDoctorId = 'd9783a65-93fe-44d7-84e9-5e122677c23e'
                // const { currentDoctorId } = this.props
                
                try{
    
                    //The code below is to promote a user so they show on the doctor's page
                    //Just set the user ID above to add another user
    
                    // let userResponse = await fetch('https://fast-hamlet-28566.herokuapp.com/api/promoteuser',{
                    //   method: 'GET',
                    //   headers: {
                    //     'Content-Type': 'application/json;charset=utf-8',
                    //     'access-token': this.generateAccessToken(userID)
                    //   }
                    // })
                    
                    // let user = await userResponse.json()
                    // console.log(user)
    
                    let doctorResponse = await fetch('https://fast-hamlet-28566.herokuapp.com/doctors/getpatients',{
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'doc-access-token': this.generateAccessToken(hardCurrentDoctorId)
                      }
                    })
                    let result = await doctorResponse.json();
                    if(result){
                        console.log(result)
                      let patients = result.map(user=>
                        (<Report 
                        name={`${user.first_name} ${user.last_name}`} 
                        profileImg={ProfilePic}
                        symptom={this.setSymptoms(user.symptoms)}
                        key={user.id}
                        patient={user}    
                        />));

                        this.setState({patients})
                    }
                  }catch(err){
                    console.log(err)
                  }
            })();
    }   

    render(){
        return (
            <>
                <div className="dhomeContainer">
                    <div className="dhomeHeader">
                        <div className="dh-container">
                            <h1>Welcome Dr Emmanuel</h1>
                            <p>We appreciate your efforts in fighting covid-19<br/>
                            Please check for recently sent reports
                            </p>
                        </div>
                    </div>
                    <input name="search-home" className="search" />
                    <div className="reports">
                        {
                            this.state.patients
                        }
                    </div>
                </div>
                </>
        )
    }

}

const mapStateToProps = state => ({
    currentDoctorId: state.doctor.currentDoctorId
})


export default connect(mapStateToProps)(doctorHome);