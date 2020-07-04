import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from "./pages/login/login";
import Signup from "./pages/signup/sign-up.js";
import Evaluation from './pages/Evaluation/Evaluation.js';
import Patient from './pages/Patient/Patient.js';
import DoctorLandingPage from "./pages/DoctorLandingPage/DoctorLandingPage";
import DoctorSignUpPage from './pages/DoctorSignUp/DoctorSignUp';
import DoctorHome from "./pages/DoctorHome/Doctor-home";
import PatientDetails from "./pages/PatientDetails/PatientDetails"
import AddPrescription from "./pages/AddPrescription/add-prescription";
import DoctorComments from "./pages/doctorComments/doctorComments"
import './App.css';


function App() {
  return (
    <div>
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/Eval" component={Evaluation} />
          <Route path="/Patient" component={Patient} />
          <Route path="/Patient-details" component={PatientDetails} />
          <Route path="/doctor/login" component={DoctorLandingPage}/>
          <Route path="/doctor/signup" component={DoctorSignUpPage}/>
          <Route path="/doctor/home" component={DoctorHome} />
          <Route path="/add-prescription" component={AddPrescription}/>
          <Route path="/" component={Signup}/>
          <Route path="/doctor/comments" component={DoctorComments} />
        </Switch>
    </div>
  );
}

export default App;
