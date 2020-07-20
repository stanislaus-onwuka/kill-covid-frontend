import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/signup/sign-up.js";
import Evaluation from "./pages/Evaluation/Evaluation.js";
import Patient from "./pages/Patient/Patient.js";
import DoctorLandingPage from "./pages/DoctorLandingPage/DoctorLandingPage";
import DoctorSignUpPage from "./pages/DoctorSignUp/DoctorSignUp";
import DoctorHome from "./pages/DoctorHome/Doctor-home";
import PatientDetails from "./pages/PatientDetails/PatientDetails";
import AddPrescription from "./pages/AddPrescription/add-prescription";
import "./App.css";


const ProtectedRoute = ({
  path,
  setRedirectUrl,
  component: Comp,
  auth,
  exact,
  to,
  children,
  ...props
}) => {
  if (auth) {
    return (
      <Route
        component={(otherProps) => <Comp {...props} {...otherProps} />}
        path={path}
        exact={!!exact}
      >
        {children}
      </Route>
    );
  }
  if (setRedirectUrl) setRedirectUrl(window.location.pathname);
  return <Redirect to={to || "/"} />;
};


class App extends React.Component {
  render() {
    Notification.requestPermission()
    return (
      <div>
        <Switch>
          <Route path="/Login" component={Login} />
          <ProtectedRoute
            auth={this.props.user}
            path="/Eval"
            component={Evaluation}
          />
          <ProtectedRoute
            auth={this.props.user}
            path="/Patient"
            component={Patient}
          />
          <ProtectedRoute
            auth={this.props.user}
            path="/Patient-details"
            component={PatientDetails}
          />
          <ProtectedRoute
            auth={this.props.user}
            path="/doctor/login"
            component={DoctorLandingPage}
          />
          <ProtectedRoute
            auth={this.props.user}
            path="/doctor/signup"
            component={DoctorSignUpPage}
          />
          <ProtectedRoute
            auth={this.props.user}
            path="/doctor/home"
            component={DoctorHome}
          />
          <ProtectedRoute
            auth={this.props.user}
            path="/add-prescription"
            component={AddPrescription}
          />
          <Route path="/" component={Signup} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(App);
