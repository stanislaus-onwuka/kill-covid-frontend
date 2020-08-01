import React from "react";
import njwt from "njwt";
import { connect } from "react-redux";
import { setDoctorPatients } from './../../redux/doctor/doctor.actions';

import Report from "../../components/DoctorHomeReports/DoctorHomeReports";
import ProfilePic from "../../assets/svg/avatar.svg";
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
       if(symptoms[symptoms.length-1]){
           symptoms = symptoms[symptoms.length-1]
           if(symptoms.cough) finalSymptoms.push('Cough')
           if(symptoms.fever) finalSymptoms.push('Fever')
           if(symptoms.fatigue) finalSymptoms.push('Fatigue')
           if(symptoms.resp) finalSymptoms.push('Respiratory Problems')
           if(symptoms.other) finalSymptoms.push(`${symptoms.other}`)
           return finalSymptoms.join(', ');
       }
       return null
    }

    getReportComponents = user =>
    (
    <Report name={`${user.first_name} ${user.last_name}`}
    profileImg={ProfilePic}
    symptom={this.setSymptoms(user.symptoms)}
    key={user.id}
    patient={user}
    />
    )

    componentDidMount(){
        return (async () => {
                //Hard Coding currentDoctorID for test purposes

                //DON'T DELETE THE COMMENTS

                // let userID = 'b4dd38a6-153d-4ca9-90b0-0c60914d6a8e'
                const { doctorAccessToken, doctorPatients, setDoctorPatients } = this.props

                try{

                    // The code below is to promote a user so they show on the doctor's page
                    // Just set the user ID above to add another user

                    // let userResponse = await fetch('https://fast-hamlet-28566.herokuapp.com/api/promoteuser',{
                    //   method: 'GET',
                    //   headers: {
                    //     'Content-Type': 'application/json;charset=utf-8',
                    //     'access-token': this.generateAccessToken(userID)
                    //   }
                    // })

                    // let user = await userResponse.json()
                    // console.log(user)

                    let patients;

                    if(doctorPatients){
                        patients = doctorPatients.map(patient => this.getReportComponents(patient));
                        this.setState({patients})
                    }

                    console.log('doc access token', doctorAccessToken);

                    let doctorResponse = await fetch('https://fast-hamlet-28566.herokuapp.com/doctors/getpatients',{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            'doc_csrf_access_token': doctorAccessToken,
                            'Access-Control-Allow-Origin': '*',
                        },
                        credentials: 'include',
                    })

                    let result = await doctorResponse.json();

                    if(result){
                        console.log('get patients result', result);
                        patients = result.map(patient => this.getReportComponents(patient));
                        this.setState({patients})
                        setDoctorPatients(result)
                    }
                  }catch(err){
                    console.log('error on doctor home page:', err)
                  }
            })()
          };

	render() {
  	return (
  		<>
  			<div className='dhomeContainer'>
  				<div className='dhomeHeader'>
  					<div className='dh-container'>
  						<h1>Welcome Dr Emmanuel</h1>
  						<p>
  							We appreciate your efforts in fighting covid-19
  							<br />
  							Please check for recently sent reports
  						</p>
  					</div>
  				</div>
  				<input name='search-home' className='search' />
  				<div className='reports'>{this.state.patients}</div>
  			</div>
  		</>
  	);
  }

}

const mapStateToProps = state => ({
    currentDoctorId: state.doctor.currentDoctorId,
    doctorAccessToken: state.doctor.doctorAccessToken,
    doctorPatients: state.doctor.doctorPatients
})

const mapDispatchToProps = dispatch => ({
    setDoctorPatients: patients => dispatch(setDoctorPatients(patients))
})


export default connect(mapStateToProps,mapDispatchToProps)(doctorHome);
