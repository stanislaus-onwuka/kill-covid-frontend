import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from "./pages/login/login";
import Signup from "./pages/signup/sign-up.js";
import Evaluation from './pages/Evaluation/Evaluation.js';
import Patient from './pages/Patient/Patient.js';
import DoctorHome from "./pages/DoctorHome/Doctor-home";
import PatientDetails from "./pages/PatientDetails/PatientDetails"
import AddPrescription from "./pages/AddPrescription/add-prescription";
import './App.css';


function App() {
  return (
    <div>
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/Eval" component={Evaluation} />
          <Route path="/Patient" component={Patient} />
          <Route path="/Patient-details" component={PatientDetails} />
          <Route path="/Doctor-Home" component={DoctorHome} />
          <Route path="/add-prescription" component={AddPrescription}/>
          <Route path="/" component={Signup}/>
          
        </Switch>
    </div>
  );
}

export default App;
