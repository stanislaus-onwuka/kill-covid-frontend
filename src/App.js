import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login/login.js';
import Signup from "./pages/signup/sign-up.js";
import Evaluation from './pages/Evaluation/Evaluation.js';
import './App.css';


function App() {
  return (
    <div>
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/Eval" component={Evaluation} />
          <Route path="/" component={Signup} />
      </Switch>
    </div>
      
  );
}

export default App;
