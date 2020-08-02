import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { updateImageUrl } from "./redux/user/user.actions.js";

import Login from "./pages/login/login";
import Signup from "./pages/signup/sign-up.js";
import Evaluation from "./pages/Evaluation/Evaluation.js";
import Patient from "./pages/Patient/Patient.js";
import DoctorLandingPage from "./pages/DoctorLandingPage/DoctorLandingPage";
import DoctorSignUpPage from "./pages/DoctorSignUp/DoctorSignUp";
import DoctorHome from "./pages/DoctorHome/Doctor-home";
import PatientDetails from "./pages/PatientDetails/PatientDetails";
import AddPrescription from "./pages/AddPrescription/add-prescription";
import LandingScreen from "./components/Landing screen/LandingScreen";
import "./App.css";

const ProtectedRoute = ({
  path,
  setRedirectUrl,
  component: Comp,
  auth,
  accessToken,
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
    // console.log(this.props.updateImageUrl, "updateImageUrl");
    if (typeof Notification === "function") {
      Notification.requestPermission();
    }
    return (
      <div>
        <Switch>
          <Route path="/" exact component={LandingScreen} />
          <Route path="/Login" exact component={Login} />
          <Route path="/doctor/login" exact component={DoctorLandingPage} />
          <Route path="/doctor/signup" exact component={DoctorSignUpPage} />
          <ProtectedRoute
            auth={this.props.isAuthenticated}
            accessToken={this.props.accessToken}
            path="/Eval"
            component={Evaluation}
          />
          <ProtectedRoute
            auth={this.props.isAuthenticated}
            accessToken={this.props.accessToken}
            path="/Patient"
            component={Patient}
          />
          <ProtectedRoute
            auth={this.props.isAuthenticated}
            accessToken={this.props.accessToken}
            path="/Patient-details"
            component={PatientDetails}
          />
          <ProtectedRoute
            auth={this.props.isAuthenticated}
            accessToken={this.props.accessToken}
            path="/doctor/home"
            component={DoctorHome}
          />
          <ProtectedRoute
            auth={this.props.isAuthenticated}
            accessToken={this.props.accessToken}
            path="/add-prescription"
            component={AddPrescription}
          />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateImageUrl: (imageUrl) => dispatch(updateImageUrl(imageUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
