import { bindActionCreators } from "redux";
import { signInWithGoogle } from "../../firebase";
import asyncAction from "../../utils/asyncAction";
import * as actionTypes from "../actions/types";

export const authWithGoogle = (dispatch) => (props) => {
  dispatch({ type: actionTypes.AUTH_WITH_GOOGLE_REQUESTED });
  signInWithGoogle()
    .then(() => {
      dispatch({ type: actionTypes.AUTH_WITH_GOOGLE_SUCCESSFUL });
    })
    .catch(() => {
      dispatch({ type: actionTypes.AUTH_WITH_GOOGLE_FAILED });
    });
};
