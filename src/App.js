import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/login/login.js';
import Signup from "./Pages/signup/sign-up.js";
import Evaluation from './Pages/Evaluation/Evaluation.js';
import DoctorHome from "./Pages/Doctor Home/Doctor-home"
import './App.css';


function App() {
  return (
    <div>
        <Switch>
            <Route path="/Login" component={Login} />
            <Route path="/Eval" component={Evaluation} />
            <Route path="/DoctorHome" component={DoctorHome} />
            <Route path="/" component={Signup} />
        </Switch>
    </div>
  );
}

export default App;
