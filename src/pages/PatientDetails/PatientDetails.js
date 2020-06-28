import React, { Component } from "react";
import './PatientDetails.css';
import profilePic from "../../assets/prof.png";
import editIcon from './../../assets/svg/edit.svg';
import docGraph from './../../assets/doc-graph.png';
import PatientHistory from "../../components/patientHistory/patientHistory";
import Prescription from "../../components/prescription/prescription";
import {Link} from "react-router-dom";


class PatientDetails extends Component{
    constructor(){
        super();
        //The patient object is for testing purposes
        this.state={
            page:'progress',
            patient:{
                address: "1, Boca Street",
                age: 25,
                country: "Argentina",
                days_left: 0,
                email: "bruce@batman.com",
                first_name: "Bruce",
                guides: [{
                    done: false,
                    info: "Acetaminophen (Tylenol)",
                    name: "Pain Medication",
                    time_lapse: "hours=4"
                }, 
                {
                    done: false,
                    info: "Acetaminophen (Tylenol)",
                    name: "Pain Medication",
                    time_lapse: "hours=4"
                }, 
                {
                    done: false,
                    info: "Acetaminophen (Tylenol)",
                    name: "Pain Medication",
                    time_lapse: "hours=4"
                } 
                ],
                id: 99,
                last_name: "Wayne",
                remarks: [],
                sign_up_date: "2020-06-27T04:55:53.466096",
                state: "Boca",
                symptoms: [{
                    cough: true,
                    date_added: "2020-06-27T04:55:54.010533",
                    fatigue: true,
                    fever: false,
                    id: 18,
                    other: "",
                    resp: false,
                    specifics: {      
                        cough_degree: "5",
                        fatigue_degree: "6",
                        fever_degree: "",
                        id: 18,
                        other_degree: "",
                        symptom_id: 18
                    },
                    user_id: 99
                }],
                tel: "08045231990",
                user_id: "13c442d5-a926-45e4-bb4a-f219a8e913ce"
            }
        };
        
    }

    setPage(event,page){
        this.setState({page});
        document.querySelector('.active').classList.remove('active');
        console.log(event.target)
        event.target.classList.add('active')
    }

    setDisplay(){
        let {page} = this.state
        let patient = this.props.location.patient;
        
        if(page==='progress'){
            return <div className="progress-div">
                    <div className="history">
                        <div className="head-container">
                            <h4>HISTORY</h4>
                        </div>
                        { this.setHistory(patient.symptoms[0]) }
                    </div>
                    <div className="prescriptions">
                        <div className="head-container">
                            <h4>PRESCRIPTIONS</h4>
                            <Link to="/add-prescription"><img src={editIcon} alt='edit icon' /></Link>
                            
                        </div>
                        <div className="drugs">
                            <div className="head-container2">
                                <h4>DRUGS</h4>
                                <h4>DOSAGE</h4>
                            </div>
                            {
                                patient.guides.map((guide,index) => ( <Prescription key={index} name={guide.info} time={guide.time_lapse}/> ))
                            }
                            
                        </div>
                    </div>
                    <div className="body-temp">
                        <div className="head-container">
                            <h4>BODY TEMPERATURE</h4>
                        </div>
                        <img src={docGraph} alt='graph' />
                    </div>
                    <div className='blood-pressure'>
                        <header className='header'>
                            <h4>BLOOD PRESSURE</h4>
                        </header>
                        <div className='slot'>
                            <span>150/190<em> mm/Hg</em></span>
                            <span>High</span>
                            <span>28/03/2020</span>
                        </div>
                        <div className='slot'>
                            <span>150/190<em> mm/Hg</em></span>
                            <span>Normal</span>
                            <span>25/03/2020</span>
                        </div>
                    </div>
                    <div className='notes'>
                        <div className='patient'>
                            <h4>PATIENT'S NOTE</h4>
                            <p>
                                <span>Hey Doc,</span>
                                <span>I don't understand why I don't feel much better after 20 days in quarantine.</span>
                                <span>I developed dry cough yesterday morning.</span>
                            </p>
                        </div>
                        <div className='doctor'>
                            <h4>DOCTOR'S NOTE</h4>
                            <textarea rows='10'/>
                            <button>Send</button>
                        </div>
                    </div>
                    <button>Flag As Emergency</button>
                </div>    
        }
        if(page==='info'){
            return <div className="information-div">
            <div className="patient-info patient-name">
                <h3 className="title">Name: {patient.first_name} {patient.last_name}</h3>
            </div>
            <div className="patient-info patient-gender">
                <h3 className="title">Gender: </h3>
            </div>
            <div className="patient-info patient-home-address">
                <h3 className="title">Home Address: {patient.address}</h3>
            </div>
            <div className="patient-info patient-phone-number">
                <h3 className="title">Phone Number: {patient.tel}</h3>
            </div>
            <div className="patient-info patient-email">
                <h3 className="title">Email: {patient.email}</h3>
            </div>
            <div className="patient-info patient-age">
                <h3 className="title">Age: {patient.age}</h3>
            </div>
        </div>
        }
    }

    setHistory = symptom => {
        let finalArray = []
        let date = new Date(symptom.date_added)
        date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        if(symptom.cough){
            finalArray.push(<PatientHistory symptom="Cough" degree={symptom.specifics.cough_degree} key={1} date={date} />)
        }
        if(symptom.fatigue){
            finalArray.push(<PatientHistory symptom="Fatigue" degree={symptom.specifics.fatigue_degree} key={2} date={date} />)
        }
        if(symptom.fever){
            finalArray.push(<PatientHistory symptom="Fever" degree={symptom.specifics.fever_degree} key={3} date={date} />)
        }
        if(symptom.other){
            finalArray.push(<PatientHistory symptom={symptom.other} key={4} degree={symptom.specifics.other_degree} date={date} />)
        }
        if(symptom.resp){
            finalArray.push(<PatientHistory symptom="Respiratory Problem" key={5} date={date} />)
        }
        return finalArray
    }

    render(){
        let patient = this.props.location.patient;
        return (
            <div className="PatientDetails">
                <div className="Pcontainer">
                    <header className='patient-details-header'>
                        <div className="Pbanner">
                            <h2>Patient's Details</h2>
                            <img src={profilePic} alt="img"/>
                            <h3>{ `${patient.first_name} 
                                  ${patient.last_name}`
                                }
                            </h3>
                        </div>

                        <div className="Pswitch">
                            <h4 onClick={e=>this.setPage(e,'progress')} className="Pprog active">PROGRESS</h4>
                            <h4 onClick={e=>this.setPage(e,'info')} className="Pinfo">INFORMATION</h4>
                        </div>
                    </header>
                    
                    <div className="Pdisplay">
                        {this.setDisplay()}
                    </div>

                    </div>
            
        </div>
        );
    }

}
export default PatientDetails;