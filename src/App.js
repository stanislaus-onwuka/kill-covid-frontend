import React from 'react';
import Login from './Pages/login/login.js';
import './App.css';
import Signup from "./Pages/signup/sign-up.js";
import { Route, Switch } from 'react-router';


function App() {
  return (
    <>
      <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/" component={Signup} />
      </Switch>
    </>
  );
}

export default App;
